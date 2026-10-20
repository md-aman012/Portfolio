import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(
  "C:/Users/mdama/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright"
);
const sharp = require("sharp");

const URL = "http://localhost:3000";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push("PAGEERROR: " + e.message));

await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

const canvas = page.locator("canvas").first();

async function portraitStats(label) {
  const buf = await canvas.screenshot();
  const { channels } = await sharp(buf).stats();
  const mean = channels[0].mean;
  console.log(`  ${label}: canvas mean brightness = ${mean.toFixed(2)}`);
  return mean;
}

console.log("=== Scroll-driven portrait (1440px, motion ON) ===");
const atTop = await portraitStats("scrollY=0    ");

await page.evaluate(() => window.scrollTo(0, 260));
await page.waitForTimeout(1200);
const mid = await portraitStats("scrollY=260  ");

await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(1500);
const deep = await portraitStats("scrollY=900  ");

// Scroll back up — must reverse
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(2000);
const backTop = await portraitStats("back to 0   ");

console.log(`\n  dispersed as scrolled down: ${mid < atTop ? "YES" : "NO"} (${atTop.toFixed(1)} -> ${mid.toFixed(1)})`);
console.log(`  further dispersed:          ${deep < mid ? "YES" : "NO"} (${mid.toFixed(1)} -> ${deep.toFixed(1)})`);
console.log(`  reverses on scroll up:      ${backTop > deep ? "YES" : "NO"} (${deep.toFixed(1)} -> ${backTop.toFixed(1)})`);
console.log(`  returns near original:      ${Math.abs(backTop - atTop) < atTop * 0.12 ? "YES" : "NO"} (${atTop.toFixed(1)} vs ${backTop.toFixed(1)})`);

// --- MOTION OFF ---
console.log("\n=== MOTION OFF ===");
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.getByRole("button", { name: /turn motion off/i }).click();
await page.waitForTimeout(1500);

const offState = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  return {
    canvasDisplay: getComputedStyle(c).display,
    canvasOpacity: getComputedStyle(c).opacity,
    fallbackImg: !!document.querySelector('img[alt="Md Aman Portrait"]'),
  };
});
console.log("  canvas display:", offState.canvasDisplay, "| opacity:", offState.canvasOpacity);
console.log("  static fallback portrait shown:", offState.fallbackImg);

await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(1200);
const offScroll = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  return { display: getComputedStyle(c).display };
});
console.log("  after scrolling, canvas still hidden:", offScroll.display === "none");

await page.screenshot({ path: ".next/check-portrait-motion-off.png" });

// Turn motion back on
await page.getByRole("button", { name: /turn motion on/i }).click();
await page.waitForTimeout(1500);
const onState = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  return { display: getComputedStyle(c).display, opacity: getComputedStyle(c).opacity };
});
console.log("  motion back on → canvas:", JSON.stringify(onState));

console.log("\nconsole errors:", consoleErrors.length ? consoleErrors : "none");

await browser.close();
