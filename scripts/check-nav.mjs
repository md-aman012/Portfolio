import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require(
  "C:/Users/mdama/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright"
);

const URL = "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome" });

// ---------- Desktop ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const align = await page.evaluate(() => {
    const x = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      return Math.round(el.getBoundingClientRect().left);
    };
    const logo = document.querySelector('header nav a[href="/"]');
    // Hero status row — measure the row's leading edge (the accent dot), not
    // the text span, which is offset by the dot width + its gap.
    const heroText = [...document.querySelectorAll("#hero span")].find((s) =>
      /B\.TECH CSE/.test(s.textContent)
    );
    const heroRow = heroText?.parentElement;
    // About section heading (page content gutter)
    const aboutH = document.querySelector("#about h2");
    return {
      logo: logo ? Math.round(logo.getBoundingClientRect().left) : null,
      heroStatus: heroRow ? Math.round(heroRow.getBoundingClientRect().left) : null,
      heroStatusText: heroText ? heroText.textContent.trim().slice(0, 24) : null,
      about: aboutH ? Math.round(aboutH.getBoundingClientRect().left) : null,
    };
  });
  console.log("=== 1440px gutter alignment ===");
  console.log("  nav logo x:", align.logo, "| hero status row x:", align.heroStatus, `(${align.heroStatusText})`, "| about h2 x:", align.about);
  console.log("  all equal:", align.logo === align.heroStatus && align.logo === align.about);

  // Nav link spacing / heights
  const nav = await page.evaluate(() => {
    const links = [...document.querySelectorAll("header nav .nav-link")];
    const toggle = [...document.querySelectorAll("header nav button")].find((b) =>
      /motion/i.test(b.textContent)
    );
    const cta = document.querySelector(".nav-cta");
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y) };
    };
    return {
      links: links.map((l) => ({ t: l.textContent.trim(), ...rect(l) })),
      toggle: rect(toggle),
      cta: rect(cta),
    };
  });
  console.log("\n=== nav items ===");
  nav.links.forEach((l) => console.log(`  ${l.t.padEnd(8)} x=${l.x} w=${l.w} h=${l.h} y=${l.y}`));
  console.log(`  TOGGLE    x=${nav.toggle.x} w=${nav.toggle.w} h=${nav.toggle.h} y=${nav.toggle.y}`);
  console.log(`  CTA       x=${nav.cta.x} w=${nav.cta.w} h=${nav.cta.h} y=${nav.cta.y}`);
  const gaps = nav.links.slice(1).map((l, i) => l.x - (nav.links[i].x + nav.links[i].w));
  console.log("  link gaps:", gaps.join(", "));
  console.log("  heights match:", nav.links.every((l) => l.h === nav.links[0].h), "| toggle==cta height:", nav.toggle.h === nav.cta.h);

  // Backdrop after scroll
  const header = page.locator("header");
  const before = await header.evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(700);
  const after = await header.evaluate((el) => ({
    bg: getComputedStyle(el).backgroundColor,
    blur: getComputedStyle(el).backdropFilter,
  }));
  console.log("\n=== backdrop ===");
  console.log("  at top:", before, "| after scroll:", after.bg, "|", after.blur);

  // Active section highlighting
  await page.evaluate(() => document.querySelector("#skills").scrollIntoView());
  await page.waitForTimeout(900);
  const active = await page.evaluate(() =>
    [...document.querySelectorAll("header nav .nav-link")]
      .filter((l) => l.getAttribute("aria-current") === "true")
      .map((l) => l.textContent.trim())
  );
  console.log("  active link at #skills:", active);

  // Anchor scroll offset
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.locator('header nav a[href="#about"]').click();
  await page.waitForTimeout(1500);
  const offset = await page.evaluate(() => {
    const h = document.querySelector("#about h2");
    const navH = document.querySelector("header").getBoundingClientRect().height;
    return { top: Math.round(h.getBoundingClientRect().top), navH: Math.round(navH) };
  });
  console.log("  #about heading top after nav click:", offset.top, "(nav height", offset.navH, ")");
  console.log("  clears navbar:", offset.top >= offset.navH);

  console.log("\n  console errors:", errs.length ? errs : "none");
  await page.screenshot({ path: ".next/check-nav-desktop.png" });
  await page.close();
}

// ---------- Mobile ----------
{
  const page = await browser.newPage({ viewport: { width: 360, height: 780 } });
  const errs = [];
  page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  page.on("pageerror", (e) => errs.push("PAGEERROR: " + e.message));
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  console.log("\n=== 360px ===");
  console.log("  horizontal overflow:", overflow.scrollW > overflow.clientW ? `YES (${overflow.scrollW} > ${overflow.clientW})` : "none");

  // Open the drawer
  await page.getByRole("button", { name: /open menu/i }).click();
  await page.waitForTimeout(800);
  const drawer = await page.evaluate(() => {
    const menu = document.querySelector("#mobile-menu");
    return {
      exists: !!menu,
      role: menu?.getAttribute("role"),
      modal: menu?.getAttribute("aria-modal"),
      focusInside: menu?.contains(document.activeElement),
      bodyOverflow: document.body.style.overflow,
      linkCount: menu ? menu.querySelectorAll("a[href]").length : 0,
    };
  });
  console.log("  drawer:", JSON.stringify(drawer));

  // Focus trap: shift+tab from the first item should land on the last
  await page.keyboard.press("Shift+Tab");
  const wrapped = await page.evaluate(() => {
    const menu = document.querySelector("#mobile-menu");
    return menu?.contains(document.activeElement);
  });
  console.log("  focus trapped in drawer after Shift+Tab:", wrapped);

  // Escape closes and returns focus to the toggle
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const closed = await page.evaluate(() => ({
    drawerGone: !document.querySelector("#mobile-menu"),
    focusOnToggle: document.activeElement?.getAttribute("aria-label") === "Open menu",
    bodyOverflow: document.body.style.overflow,
  }));
  console.log("  after Escape:", JSON.stringify(closed));

  // Link click closes the drawer
  await page.getByRole("button", { name: /open menu/i }).click();
  await page.waitForTimeout(600);
  await page.locator('#mobile-menu a[href="#skills"]').click();
  await page.waitForTimeout(900);
  console.log("  drawer closed after link click:", await page.evaluate(() => !document.querySelector("#mobile-menu")));
  console.log("  scrolled to skills:", await page.evaluate(() => {
    const s = document.querySelector("#skills");
    return Math.round(s.getBoundingClientRect().top);
  }));

  console.log("  console errors:", errs.length ? errs : "none");
  await page.screenshot({ path: ".next/check-nav-mobile.png" });
  await page.close();
}

await browser.close();
