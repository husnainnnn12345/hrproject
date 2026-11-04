import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("snapshots");
const BASE = "http://localhost:3000";

const sections = [
  { id: "top", file: "01-hero.png", label: "Hero" },
  { id: "trust-bar", file: "02-trust-bar.png", label: "Trust bar / marquee" },
  { id: "stats", file: "03-stats.png", label: "Animated stats" },
  { id: "services", file: "04-services.png", label: "Services grid" },
  { id: "how-it-works", file: "05-how-it-works.png", label: "How it works" },
  { id: "for-businesses", file: "06-for-businesses.png", label: "For businesses" },
  { id: "wizard", file: "07-find-my-staff.png", label: "Find My Staff wizard" },
  { id: "why-us", file: "08-why-us.png", label: "Why choose us" },
  { id: "testimonials", file: "09-testimonials.png", label: "Testimonials" },
  { id: "pricing", file: "10-pricing.png", label: "Pricing / engagement models" },
  { id: "faq", file: "11-faq.png", label: "FAQ" },
  { id: "contact", file: "12-contact.png", label: "Contact" },
  { id: "footer", file: "13-footer.png", label: "Footer" },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "light",
  reducedMotion: "reduce",
});
const page = await context.newPage();

await page.goto(BASE, { waitUntil: "networkidle" });

// Dismiss intro + hide floating chrome for cleaner shots
await page.evaluate(() => {
  document.querySelectorAll("button").forEach((b) => {
    if (b.textContent?.trim() === "Skip") b.click();
  });
  document.querySelectorAll("body *").forEach((el) => {
    const style = window.getComputedStyle(el);
    if (style.position !== "fixed") return;
    const z = Number(style.zIndex) || 0;
    if (z >= 70) el.style.setProperty("display", "none", "important");
  });
});

await page.waitForTimeout(400);

// Full page overview
await page.screenshot({
  path: path.join(OUT, "00-full-page.png"),
  fullPage: true,
});
console.log("Saved 00-full-page.png");

for (const section of sections) {
  const el = page.locator(`#${section.id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await el.screenshot({
    path: path.join(OUT, section.file),
    animations: "disabled",
  });
  console.log(`Saved ${section.file} (${section.label})`);
}

// Mobile hero + services for ad-channel realism
const mobile = await context.newPage();
await mobile.setViewportSize({ width: 390, height: 844 });
await mobile.goto(BASE, { waitUntil: "networkidle" });
await mobile.evaluate(() => {
  document.querySelectorAll("button").forEach((b) => {
    if (b.textContent?.trim() === "Skip") b.click();
  });
  document.querySelectorAll("body *").forEach((el) => {
    const style = window.getComputedStyle(el);
    if (style.position !== "fixed") return;
    const z = Number(style.zIndex) || 0;
    if (z >= 70) el.style.setProperty("display", "none", "important");
  });
});
await mobile.waitForTimeout(300);
await mobile.locator("#top").screenshot({
  path: path.join(OUT, "14-mobile-hero.png"),
  animations: "disabled",
});
await mobile.locator("#services").screenshot({
  path: path.join(OUT, "15-mobile-services.png"),
  animations: "disabled",
});
console.log("Saved mobile shots");

await browser.close();
console.log(`\nAll snapshots saved to ${OUT}`);
