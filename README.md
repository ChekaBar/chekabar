# CHEKA — Bar Café &amp; Luggage Storage

A hand-built, production-ready website for **Cheka**, a sophisticated, nature-inspired
bar café that also offers **secure luggage storage**.

- Pure **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step, no backend.
- Works by opening `index.html` directly **and** deploys as-is to **GitHub Pages**
  (including from a project subdirectory such as
  `https://username.github.io/cheka-website/`).
- All content you need to change lives in **`js/data.js`**.

---

## 1. Preview the website locally

**Easiest:** double-click `index.html` — it opens in your browser and works offline.

**Recommended (behaves exactly like the live site):** run a tiny local web server
from the project folder, then visit the printed URL.

| You have… | Command (run in the project folder) | Then open |
|-----------|--------------------------------------|-----------|
| VS Code   | Install the *Live Server* extension → right-click `index.html` → *Open with Live Server* | the URL it shows |
| Python 3  | `python -m http.server 8000` | `http://localhost:8000` |
| Node.js   | `npx serve` | the URL it shows |
| PHP       | `php -S localhost:8000` | `http://localhost:8000` |

You do **not** need any of these to deploy — they are only for local preview.

---

## 2. Replace the logo and photographs

### Logo

1. Put the real logo file in **`images/logo/`** (SVG or PNG; PNG should have a
   transparent background and be roughly 3:1 landscape).
2. Open **`js/data.js`** and set the path once:
   ```js
   images: {
     logo: "images/logo/cheka-logo.svg",   // <-- change this one line
     ...
   }
   ```
3. If the logo ever fails to load, an elegant text lockup
   (*Cheka / BAR • CAFÉ / LUGGAGE STORAGE*) is shown automatically — nothing breaks.

Do **not** rename the folders. Do not stretch or recolour the logo — it is displayed
with `object-fit`-safe sizing and clear space already.

### Photographs

Every image path is centralised in **`js/data.js` → `CHEKA.images`** and
**`CHEKA.gallery`**. The site currently ships with tasteful on-brand **`.svg`
placeholders** so nothing looks broken. To use a real photo:

1. Drop the file into the matching folder:
   | Folder | Used for |
   |--------|----------|
   | `images/hero/`        | homepage hero (wide, ~1920×1280) |
   | `images/about/`       | About section (portrait + optional square detail) |
   | `images/menu/`        | one photo per menu category |
   | `images/gallery/`     | gallery grid |
   | `images/experience/`  | full-width “Experience” band (wide) |
   | `images/luggage/`     | luggage page hero + luggage area |
2. Update the path in `js/data.js` (e.g. change `.svg` to `.jpg`):
   ```js
   hero: "images/hero/cheka-hero.jpg",
   ```
3. For the gallery, edit the entries in `CHEKA.gallery` — each has
   `src`, `alt`, `category` (`interior` / `coffee` / `drinks` / `food`) and `caption`.

**Tips:** keep the same aspect ratio as the placeholder, compress JPEGs
(aim < 300 KB each), and always write meaningful `alt` text.

---

## 3. Update menu items and prices

Open **`js/data.js` → `CHEKA.menu`**. Each category is a list of items:

```js
coffee: [
  { name: "Espresso", description: "Rich, balanced and aromatic.", price: "€1.50" },
  ...
],
drinks:   [ ... ],
food:     [ ... ],
desserts: [ ... ],
```

- Add, remove or reorder items freely — the on-page menu rebuilds itself.
- `price` is a **string**, so any format works (`"€1.50"`, `"1,50 €"`, `"MKD 120"`).
- To rename a tab or change its side photo, edit `CHEKA.menuMeta`.
- The `drinks`, `food` and `desserts` lists are realistic **placeholders** —
  replace them with the real menu.

---

## 4. Update business details

Open **`js/data.js` → `CHEKA.business`**:

| Field | What it controls |
|-------|------------------|
| `address` (`street`, `city`, `country`, `full`) | Contact section + footer + schema |
| `phone` | “Call us” buttons + mobile quick-bar (leave `null` to disable them) |
| `email` | “Email us” links + the contact form recipient |
| `whatsapp` | optional WhatsApp link (digits only, incl. country code) |
| `hours` / `hoursShort` | opening-hours blocks everywhere |
| `maps`, `mapsEmbed`, `directions` | Google Maps link, embedded map, “Get directions” |
| `social` (`instagram`, `facebook`, `tiktok`) | social icons (hidden/disabled while `null`) |
| `priceRange`, `geo`, `siteUrl` | SEO / structured data |

Any value left as `null` renders as a **clearly-disabled control**, never a broken link.

---

## 5. Update luggage-storage details

Open **`js/data.js` → `CHEKA.luggage`**:

| Field | Notes |
|-------|-------|
| `pricePerBag` | leave the default to show **“Price information coming soon”** |
| `openingHours` | luggage-desk hours (can differ from café hours) |
| `maxDuration` | maximum time a bag can stay |
| `bookingMethod` | walk-in / phone / WhatsApp / form … |
| `phone`, `whatsapp`, `directionsUrl` | leave `null` to reuse the café’s `CHEKA.business` values |
| `location` | where inside the café to find the desk |
| `features`, `steps`, `security` | the bullet lists on the homepage section and the dedicated page |

FAQ answers are in **`CHEKA.luggageFaqs`**.

---

## 6. Add the real Google Maps embed

1. Open [Google Maps](https://maps.google.com), find Cheka.
2. **Share → Embed a map → COPY HTML.** From the copied `<iframe …>` take only the
   `src="…"` value.
3. In `js/data.js` set:
   ```js
   mapsEmbed: "https://www.google.com/maps/embed?pb=...",   // the src you copied
   maps:      "https://maps.app.goo.gl/xxxxxxxx",            // normal share link
   directions:"https://www.google.com/maps/dir/?api=1&destination=LAT,LNG"
   ```
4. Reload — the “Map coming soon” placeholder is automatically replaced by the
   responsive embedded map, and every “Get directions” button becomes active.

Also update the coordinates in `CHEKA.business.geo` and the `REPLACE_*` values in the
`<script type="application/ld+json">` blocks in `index.html` and `luggage-storage.html`.

### Contact form

The form has **no backend**. On submit it validates the fields client-side and opens
the visitor’s email app with the message pre-filled (`mailto:` to `CHEKA.business.email`).
To collect submissions automatically instead, sign up for a no-backend form service
(e.g. Formspree, Basin, Web3Forms), then in `js/script.js` → `initContactForm()`
replace the `mailto:` block with a `fetch()` POST to your endpoint.

---

## 7. Upload the project to GitHub

1. Create a new repository on GitHub, e.g. **`cheka-website`** (public).
2. From the project folder:
   ```bash
   git init
   git add .
   git commit -m "Cheka website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/cheka-website.git
   git push -u origin main
   ```
   (Or use GitHub Desktop, or drag the files into the repo’s web uploader.)

The repo already contains an empty **`.nojekyll`** file so GitHub Pages serves the
files as-is.

---

## 8. Enable GitHub Pages from the main branch

1. Repository → **Settings → Pages**.
2. **Build and deployment → Source: “Deploy from a branch”.**
3. **Branch: `main`**, folder **`/ (root)`** → **Save**.
4. Wait ~1 minute, then open the published URL, e.g.
   `https://USERNAME.github.io/cheka-website/`.

All links and asset paths are **relative**, so the site works whether it is served
from a domain root or from the `/cheka-website/` subfolder.

Finally, set the real URL in three places:
`js/data.js → business.siteUrl`, and the `<link rel="canonical">` +
`og:url` tags at the top of `index.html` and `luggage-storage.html`.

---

## 9. Placeholders still needing real information

Search the project for **`TODO CHEKA`** and **`REPLACE_`** to jump to each one.

| # | Placeholder | Where to edit |
|---|-------------|---------------|
| 1 | Final **logo** file | `images/logo/` + `js/data.js → images.logo` |
| 2 | Real **address** | `js/data.js → business.address` |
| 3 | **Google Maps** embed + coordinates | `js/data.js → business.mapsEmbed / maps / directions / geo` + JSON-LD |
| 4 | **Phone number** | `js/data.js → business.phone` |
| 5 | **Email address** | `js/data.js → business.email` |
| 6 | **WhatsApp number** | `js/data.js → business.whatsapp` |
| 7 | **Instagram** link | `js/data.js → business.social.instagram` |
| 8 | **Facebook** link | `js/data.js → business.social.facebook` |
| 9 | **TikTok** link | `js/data.js → business.social.tiktok` |
| 10 | **Opening hours** (confirm) | `js/data.js → business.hours` / `hoursShort` |
| 11 | **Menu items & final prices** | `js/data.js → menu` (Drinks / Food / Desserts are placeholders) |
| 12 | **Luggage price per bag** | `js/data.js → luggage.pricePerBag` |
| 13 | **Maximum storage duration** | `js/data.js → luggage.maxDuration` |
| 14 | **Booking method** | `js/data.js → luggage.bookingMethod` |
| 15 | **Real customer reviews** | `js/data.js → reviews` (currently sample content) |
| 16 | **Final photographs** | `images/**` + `js/data.js → images` and `gallery` |
| 17 | **Website domain / canonical / OG URL** | `js/data.js → business.siteUrl` + `<head>` of both HTML files |
| 18 | **Open Graph share image** (1200×630) | `images/og-image.*` + `og:image` tags |
| 19 | **Structured-data values** (`REPLACE_*`) | `<script type="application/ld+json">` in both HTML files |

Until real values are added, the site shows honest placeholders
(“Price information coming soon”, “Map coming soon”, disabled Call/Directions
buttons, sample reviews clearly labelled as samples) — **no invented business
details, no fake ratings, no broken links.**

---

## Project structure

```
cheka-website/
├── index.html              Homepage (hero, features, about, menu, luggage,
│                           experience, gallery, reviews, contact)
├── luggage-storage.html    Dedicated Luggage Storage page (hero, how-it-works,
│                           pricing/security/hours, FAQ accordion, CTAs)
├── css/
│   └── styles.css          Full design system + all components (mobile-first)
├── js/
│   ├── data.js             ← ALL editable content (text, images, menu, business…)
│   └── script.js           Behaviour only (safe to load on both pages)
├── images/
│   ├── logo/  hero/  about/  menu/  gallery/  luggage/  experience/
│   └── og-image.svg        (all currently on-brand SVG placeholders)
├── favicon.svg
├── .nojekyll               Tells GitHub Pages to serve files as-is
└── README.md
```

## Editing quick-reference

| I want to change… | File → key |
|-------------------|------------|
| Any visible text / slogan | `js/data.js` (mostly `CHEKA.brand`) |
| Menu & prices | `js/data.js → CHEKA.menu` |
| Contact details / hours / socials | `js/data.js → CHEKA.business` |
| Luggage-storage info & FAQ | `js/data.js → CHEKA.luggage`, `CHEKA.luggageFaqs` |
| Image paths | `js/data.js → CHEKA.images` and `CHEKA.gallery` |
| Colours, spacing, fonts | `css/styles.css` → `:root` design tokens |
| Behaviour (menu tabs, gallery, lightbox, nav…) | `js/script.js` |

## Browser support &amp; accessibility

Works in all current versions of Chrome, Firefox, Safari and Edge. Includes a
skip link, keyboard-operable navigation / menu tabs / gallery lightbox / FAQ
accordion, visible focus styles, semantic landmarks, `prefers-reduced-motion`
support, and graceful fallbacks when JavaScript, IntersectionObserver, images or
web fonts are unavailable.
