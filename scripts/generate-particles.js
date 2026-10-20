const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const inputPath = path.join(__dirname, '../public/images/portrait.jpg');
  const binOut = path.join(__dirname, '../public/particles-data.bin');
  const jsonOut = path.join(__dirname, '../public/particles-data.json');

  // Optimal resolution for crisp facial details: eyes, stubble, lips, curls
  const width = 460;
  const height = 368;
  const aspect = width / height;

  const { data, info } = await sharp(inputPath)
    .resize(width, height, { fit: 'fill' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const positions = [];
  const colors = [];
  const sizes = [];
  const alphas = [];
  const types = [];
  const randoms = [];

  // Face landmarks in normalized coordinates (0 to 1) for portrait.jpg:
  // Face center: x = 0.44, y = 0.39
  // Head oval bounds: rx = 0.22, ry = 0.27
  const faceCenterX = 0.44;
  const faceCenterY = 0.39;
  const headRx = 0.22;
  const headRy = 0.27;

  let whiteCount = 0;
  let amberRimCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

      // Pure background cutoff
      if (lum < 0.052) continue;

      const nx = x / width;
      const ny = y / height;

      // Distance from face center (normalized)
      const dx = (nx - faceCenterX) / headRx;
      const dy = (ny - faceCenterY) / headRy;
      const distHeadSq = dx * dx + dy * dy;
      const isHead = distHeadSq < 1.0;

      // In low-contrast dark kurta sections outside head, prune slightly for balanced density
      if (!isHead && lum < 0.13) {
        if (Math.random() > 0.45) continue;
      }

      // World scale
      const worldScale = 3.65;
      const px = (nx - 0.5) * worldScale;
      // Invert Y for 3D coordinate system; lift face so eyes, nose and mouth sit completely clear above text
      const py = -(ny - 0.5) * (worldScale / aspect) + 0.62;

      // 3D anatomical relief
      let pz = 0;
      if (isHead) {
        // Dome curvature
        const dome = Math.sqrt(Math.max(0.0, 1.0 - distHeadSq)) * 0.65;
        // Facial relief: highlighted features pop forward
        const relief = Math.pow(lum, 1.25) * 0.38;
        pz = dome + relief;
      } else {
        // Torso/shoulders curve backward
        const torsoDist = Math.abs(nx - 0.5) / 0.52;
        const torsoDome = Math.sqrt(Math.max(0.0, 1.0 - Math.min(1.0, torsoDist * torsoDist))) * 0.38;
        pz = torsoDome - (ny - 0.55) * 0.45 + lum * 0.18 - 0.25;
      }

      // Natural amber/golden rim detection from portrait lighting
      // Amber glow exists in the hair highlights and right rim of neck/shoulder
      const isWarm = r > 70 && (r > b * 1.35) && (r > g * 1.06);
      const isHairOrRim = (ny < 0.42 || (nx > 0.50 && ny < 0.72));
      const isAmberRim = isWarm && isHairOrRim;

      let cr, cg, cb, pSize, pAlpha, pType;

      if (isAmberRim) {
        amberRimCount++;
        pType = 1.0; // Amber rim particle
        // Rich warm amber/gold tone
        cr = Math.min(1.0, (r / 255.0) * 1.30 + 0.12);
        cg = Math.min(1.0, (g / 255.0) * 1.08 + 0.04);
        cb = Math.min(1.0, (b / 255.0) * 0.75);
        pSize = 0.020 + 0.018 * lum;
        pAlpha = Math.min(1.0, 0.45 + lum * 0.65);
      } else {
        whiteCount++;
        pType = 0.0; // Silver/white face & body particle
        // Rich tonal contrast from photo:
        // Highlights are pure crisp white/platinum; midtones are silver; deep shadows are dark charcoal stardust
        const lumCurve = Math.pow(lum, 1.15);
        const v = 0.48 + 0.52 * lumCurve;
        cr = v * 0.95;
        cg = v * 0.96;
        cb = v * 1.0;
        pSize = 0.016 + 0.022 * lumCurve;
        pAlpha = Math.min(0.96, 0.20 + lumCurve * 0.80);
      }

      // Micro jitter for organic stardust dispersal
      const jitter = 0.009;
      positions.push(
        px + (Math.random() - 0.5) * jitter,
        py + (Math.random() - 0.5) * jitter,
        pz + (Math.random() - 0.5) * jitter * 2.0
      );

      colors.push(cr, cg, cb);
      sizes.push(pSize);
      alphas.push(pAlpha);
      types.push(pType);
      randoms.push(Math.random(), Math.random(), Math.random());
    }
  }

  // Floating embers (subtle, delicate drifting specks)
  const emberCount = 85;
  for (let i = 0; i < emberCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.45 + Math.random() * 1.9;
    const px = (faceCenterX - 0.5) * 3.65 + Math.cos(angle) * radius;
    const py = -(faceCenterY - 0.5) * (3.65 / aspect) + 0.62 + Math.sin(angle) * (radius * 0.85);
    const pz = (Math.random() - 0.5) * 1.3;

    positions.push(px, py, pz);
    colors.push(1.0, 0.62 + 0.18 * Math.random(), 0.24);
    sizes.push(0.024 + 0.018 * Math.random());
    alphas.push(0.30 + 0.40 * Math.random());
    types.push(2.0); // Floater ember
    randoms.push(Math.random(), Math.random(), Math.random());
  }

  const totalCount = positions.length / 3;
  console.log(`Generated ${totalCount} particles:`);
  console.log(` - Silver/white face & body: ${whiteCount}`);
  console.log(` - Amber rim & hair: ${amberRimCount}`);
  console.log(` - Ambient floating embers: ${emberCount}`);

  // Pack into compact Float32Array binary buffer:
  const totalFloats = 1 + totalCount * 3 + totalCount * 3 + totalCount + totalCount + totalCount + totalCount * 3;
  const buffer = new Float32Array(totalFloats);
  buffer[0] = totalCount;
  let offset = 1;

  buffer.set(positions, offset);
  offset += positions.length;

  buffer.set(colors, offset);
  offset += colors.length;

  buffer.set(sizes, offset);
  offset += sizes.length;

  buffer.set(alphas, offset);
  offset += alphas.length;

  buffer.set(types, offset);
  offset += types.length;

  buffer.set(randoms, offset);

  fs.writeFileSync(binOut, Buffer.from(buffer.buffer));
  console.log(`Wrote binary dataset to ${binOut} (${(fs.statSync(binOut).size / 1024).toFixed(1)} KB)`);

  const jsonData = {
    count: totalCount,
    positions,
    colors,
    sizes,
    alphas,
    types,
    randoms,
  };
  fs.writeFileSync(jsonOut, JSON.stringify(jsonData));
  console.log(`Wrote JSON dataset to ${jsonOut} (${(fs.statSync(jsonOut).size / 1024).toFixed(1)} KB)`);
}

generate().catch(console.error);
