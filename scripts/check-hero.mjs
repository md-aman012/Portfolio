import { createRequire } from "module";
const require = createRequire(
  "file:///C:/Users/mdama/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/"
);
const { chromium } = require("playwright");

const URL = "http://localhost:3000";
const WIDTHS = [360, 768, 1440];

const browser = await chromium.launch({ channel: "chrome" });
const errors = [];

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

  await page.goto(URL, { waitUntil: "networkidle" });

  // --- Heading geometry ---
  const info = await page.evaluate(() => {
    const h1 = document.querySelector("h1.hero-heading");
    if (!h1) return { missing: true };
    const rects = [...h1.querySelectorAll("[data-letter]")].map((s) => {
      const r = s.getBoundingClientRect();
      return { ch: s.textContent, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) };
    });
    const style = getComputedStyle(h1);
    return {
      text: h1.innerText.replace(/\s+/g, " ").trim(),
      fontSize: style.fontSize,
      fontFamily: style.fontFamily.split(",")[0],
      lineCount: new Set(rects.map((r) => r.y)).size,
      rects,
      docScrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    };
  });

  console.log(`\n=== ${width}px ===`);
  console.log("  text:", JSON.stringify(info.text));
  console.log("  font:", info.fontFamily, info.fontSize, "| lines:", info.lineCount);
  console.log("  letters:", info.rects.map((r) => `${r.ch}@${r.x},${r.y}`).join(" "));
  console.log(
    "  horizontal overflow:",
    info.docScrollW > info.clientW ? `YES (${info.docScrollW} > ${info.clientW})` : "none"
  );

  // --- Animation ran once? ---
  await page.waitForTimeout(2600);
  const settled = await page.evaluate(() => {
    const h1 = document.querySelector("h1.hero-heading");
    const letters = [...h1.querySelectorAll("[data-letter]")];
    return {
      opacities: letters.map((s) => getComputedStyle(s).opacity),
      transforms: letters.map((s) => s.style.transform || "(none)"),
      filters: letters.map((s) => s.style.filter || "(none)"),
      willChange: letters.map((s) => s.style.willChange || "(none)"),
    };
  });
  const allOpaque = settled.opacities.every((o) => Number(o) === 1);
  const noTransforms = settled.transforms.every((t) => t === "(none)");
  const noFilters = settled.filters.every((f) => f === "(none)");
  const noWillChange = settled.willChange.every((w) => w === "(none)");
  console.log("  settled → opaque:", allOpaque, "| no inline transform:", noTransforms, "| no inline filter:", noFilters, "| no will-change:", noWillChange);
  if (!allOpaque || !noTransforms) console.log("   ", JSON.stringify(settled));

  // --- Does it replay on scroll? ---
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  const afterScroll = await page.evaluate(() => {
    const letters = [...document.querySelectorAll("h1.hero-heading [data-letter]")];
    return letters.map((s) => ({
      o: getComputedStyle(s).opacity,
      t: s.style.transform || "(none)",
    }));
  });
  const stableAfterScroll = afterScroll.every(
    (l) => Number(l.o) === 1 && l.t === "(none)"
  );
  console.log("  no replay on scroll:", stableAfterScroll);

  if (consoleErrors.length) {
    errors.push({ width, consoleErrors });
    console.log("  CONSOLE ERRORS:", consoleErrors);
  } else {
    console.log("  console errors: none");
  }

  await page.screenshot({ path: `.next/check-hero-${width}.png` });
  await page.close();
}

await browser.close();

console.log("\n=== SUMMARY ===");
if (errors.length) {
  console.log("ERRORS FOUND");
  process.exitCode = 1;
} else {
  console.log("no console errors at any width");
}
