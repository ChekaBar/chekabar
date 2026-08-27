/* ============================================================================
   CHEKA  ·  data.js
   ----------------------------------------------------------------------------
   THIS IS THE ONE FILE YOU EDIT FOR CONTENT.
   Everything a non-developer needs to change lives here:
     · brand text            -> CHEKA.brand
     · image paths            -> CHEKA.images
     · address / phone / mail -> CHEKA.business
     · opening hours          -> CHEKA.business.hours
     · social links           -> CHEKA.business.social
     · menu items & prices    -> CHEKA.menu
     · luggage storage details-> CHEKA.luggage
     · gallery photos         -> CHEKA.gallery
     · guest reviews          -> CHEKA.reviews   (SAMPLE CONTENT – replace)
     · luggage FAQ            -> CHEKA.luggageFaqs

   No build step. Plain browser globals. Loaded before js/script.js.
   Search this file for "TODO CHEKA" to find every value that still
   needs the real business information.
   ========================================================================== */

const CHEKA = {

  /* ------------------------------------------------------------------ */
  /* 1. BRAND — the words that make up the identity                     */
  /* ------------------------------------------------------------------ */
  brand: {
    name: "Cheka",
    nameUpper: "CHEKA",
    barCafe: "BAR • CAFÉ",
    service: "LUGGAGE STORAGE",
    heroLabel: "CHEKA · BAR CAFÉ · LUGGAGE STORAGE",
    heroHeading: "You’ve found your place.",
    heroCopy:
      "A warm meeting point for good coffee, thoughtful drinks, relaxed moments and secure luggage storage.",
    footerBlurb:
      "A sophisticated, nature-inspired bar café — and a secure place to leave your luggage while you explore the city.",
    // Shown if the logo image fails to load (graceful text fallback).
    logoFallbackLine1: "Cheka",
    logoFallbackLine2: "BAR • CAFÉ",
    logoFallbackLine3: "LUGGAGE STORAGE",
  },

  /* ------------------------------------------------------------------ */
  /* 2. IMAGES — every path in one place.                              */
  /*    Placeholders are tasteful on-brand .svg files that already     */
  /*    exist in /images. To use a real photo, drop the file in the    */
  /*    matching folder and change the path below (e.g. .svg -> .jpg). */
  /*    TODO CHEKA: replace each placeholder with real photography.    */
  /* ------------------------------------------------------------------ */
  images: {
    logo:            "images/logo/cheka-logo.svg",          // TODO CHEKA: real logo
    hero:            "images/hero/cheka-hero.svg",           // TODO CHEKA: real café interior (wide, ~1920x1280)
    aboutMain:       "images/about/cheka-interior.svg",      // TODO CHEKA: real interior (portrait)
    aboutDetail:     "images/about/cheka-detail.svg",        // TODO CHEKA: detail shot (plant / cup / texture)
    menuCoffee:      "images/menu/coffee.svg",               // TODO CHEKA: coffee photo
    menuDrinks:      "images/menu/drinks.svg",               // TODO CHEKA: drinks photo
    menuFood:        "images/menu/food.svg",                 // TODO CHEKA: food photo
    menuDesserts:    "images/menu/desserts.svg",             // TODO CHEKA: dessert photo
    experience:      "images/experience/cheka-experience.svg", // TODO CHEKA: cinematic café/nature photo (wide)
    luggageHero:     "images/luggage/luggage-hero.svg",      // TODO CHEKA: luggage page hero
    luggageSection:  "images/luggage/luggage-storage.svg",   // TODO CHEKA: bags in a green + wood setting
    ogImage:         "images/og-image.svg",                  // TODO CHEKA: social share image (1200x630 .jpg)
  },

  /* ------------------------------------------------------------------ */
  /* 3. BUSINESS — contact, location, hours, social                    */
  /*    Any value left as null renders as a clearly-disabled control   */
  /*    instead of a broken link.                                      */
  /* ------------------------------------------------------------------ */
  business: {
    legalName: "Cheka Bar Café",
    shortName: "Cheka",

    // TODO CHEKA: Add the real street address.
    address: {
      street: "Street address — coming soon",
      city:   "City",
      country:"Country",
      // Full one-line version used in the footer / schema.
      full:   "Address coming soon — Cheka Bar Café",
    },

    // TODO CHEKA: Replace with the real phone number in international format.
    // Example once known:  phone: "+355 6X XXX XXXX"
    phone: null,           // e.g. "+355 69 000 0000"  (null = "Call" shown as unavailable)

    // TODO CHEKA: Replace with the real public email address.
    email: "hello@example.com",   // used for the contact form + "Email us"

    // TODO CHEKA: Replace with the real WhatsApp number (digits only, incl. country code).
    whatsapp: null,        // e.g. "355690000000"

    // Opening hours. Edit freely; each row is a label + a value.
    hours: [
      { label: "Monday – Sunday", value: "07:00 – 23:00" },
      // Add more rows if the days differ, e.g.:
      // { label: "Monday – Friday", value: "07:00 – 23:00" },
      // { label: "Saturday – Sunday", value: "08:00 – 24:00" },
    ],
    hoursShort: "Mon–Sun · 07:00 – 23:00",

    // TODO CHEKA: Paste the real Google Maps share link + embed URL.
    // maps:      the normal "share" link that opens Google Maps
    // mapsEmbed: the src from Google Maps -> Share -> "Embed a map" -> <iframe src="...">
    maps: null,
    mapsEmbed: null,
    // TODO CHEKA: Directions link (Google Maps "Directions" URL). Until set,
    // "Get directions" buttons render as disabled.
    directions: null,

    // TODO CHEKA: Real social profile URLs. null = link hidden / disabled.
    social: {
      instagram: null,   // e.g. "https://instagram.com/chekabarcafe"
      facebook:  null,   // e.g. "https://facebook.com/chekabarcafe"
      tiktok:    null,   // e.g. "https://tiktok.com/@chekabarcafe"
    },

    // Used only in structured data / SEO. "€", "€€", "€€€".
    priceRange: "€€",

    // TODO CHEKA: Real coordinates for structured data (from Google Maps).
    geo: { lat: null, lng: null },

    // TODO CHEKA: Final public website URL (used for canonical + Open Graph).
    siteUrl: "https://example.github.io/cheka-website/",
  },

  /* ------------------------------------------------------------------ */
  /* 4. LUGGAGE STORAGE — service details                              */
  /*    TODO CHEKA: fill in every "coming soon" value below.           */
  /* ------------------------------------------------------------------ */
  luggage: {
    heading: "Luggage Storage",
    subtitle: "Travel light. Enjoy more.",
    intro:
      "Leave your luggage with us in a safe and welcoming environment while you explore the city or relax at Cheka Bar Café.",

    // TODO CHEKA: Set the real price. Leave as-is to show the placeholder.
    pricePerBag: "Price information coming soon",   // e.g. "€5 per bag / day"

    // TODO CHEKA: Confirm luggage-desk hours (can differ from café hours).
    openingHours: "Every day · 07:00 – 23:00",

    // TODO CHEKA: Maximum time a bag can stay.
    maxDuration: "Maximum storage duration — coming soon",  // e.g. "Up to 24 hours"

    // TODO CHEKA: How guests reserve — walk-in, phone, WhatsApp, form…
    bookingMethod: "No booking needed — walk in during opening hours. Booking details coming soon.",

    // These fall back to CHEKA.business values when left null.
    phone: null,        // TODO CHEKA: dedicated luggage line, or leave null to reuse business.phone
    whatsapp: null,     // TODO CHEKA: or leave null to reuse business.whatsapp
    location: "Inside Cheka Bar Café — full address coming soon",
    directionsUrl: null, // TODO CHEKA: or leave null to reuse business.directions

    // Homepage feature bullets.
    features: [
      "Safe & Secure",
      "Convenient Location",
      "Affordable",
      "Easy Drop-off & Pick-up",
      "Available Every Day",
    ],

    // Three-step process (dedicated page).
    steps: [
      { title: "Drop off",        text: "Bring your luggage to Cheka." },
      { title: "Enjoy your time", text: "Explore or relax without carrying your bags." },
      { title: "Pick up",         text: "Return during opening hours and collect your luggage." },
    ],

    // Security reassurance (dedicated page).
    security: [
      "Bags are kept inside the café, in a supervised area — not left unattended on the street.",
      "Every item is tagged at drop-off and matched to you at pick-up.",
      "Staff are present throughout opening hours.",
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 5. QUICK-FEATURE STRIP (below the hero)                           */
  /*    icon = key into the inline-SVG set in js/script.js             */
  /* ------------------------------------------------------------------ */
  quickFeatures: [
    { icon: "bean",    title: "SPECIALTY COFFEE", subtitle: "Premium Quality" },
    { icon: "leaf",    title: "NATURAL ATMOSPHERE", subtitle: "Relax & Enjoy" },
    { icon: "wifi",    title: "FREE WI-FI",        subtitle: "Stay Connected" },
    { icon: "luggage", title: "LUGGAGE STORAGE",   subtitle: "Safe & Secure" },
  ],

  /* ------------------------------------------------------------------ */
  /* 6. MENU  (Albanian · prices in Albanian lek — format: "150 Lek")   */
  /*    Each item has only a name and a price (no description field).   */
  /*    Prices are plain strings ending in " Lek". Never use ALL /      */
  /*    LEK / L / €. Add or remove items freely — the page rebuilds.    */
  /*    Category keys are ASCII; the visible tab names live in          */
  /*    menuMeta below.                                                 */
  /* ------------------------------------------------------------------ */
  menu: {
    // Të ngrohta
    hot: [
      { name: "Kafe",              price: "70 Lek" },
      { name: "Macchiato",         price: "80 Lek" },
      { name: "Çaj",               price: "70 Lek" },
      { name: "Kapuçino",          price: "150 Lek" },
      { name: "Kapuçino bustinë",  price: "170 Lek" },
      { name: "Americano",         price: "90 Lek" },
      { name: "Flat White",        price: "190 Lek" },
      { name: "Kakao",             price: "150 Lek" },
      { name: "Coco Latte",        price: "160 Lek" },
      { name: "Double Espresso",   price: "150 Lek" },
    ],
    // Pije freskuese
    soft: [
      { name: "Ujë pa gaz",             price: "70 Lek" },
      { name: "Ujë me gaz",             price: "70 Lek" },
      { name: "Ujë me vitaminë",        price: "120 Lek" },
      { name: "Britvic",                price: "150 Lek" },
      { name: "Cola",                   price: "150 Lek" },
      { name: "Bitter",                 price: "100 Lek" },
      { name: "Bravo",                  price: "160 Lek" },
      { name: "Lemon/Orange Soda",      price: "150 Lek" },
      { name: "Lipton Çaj i Ftohtë",    price: "150 Lek" },
      { name: "Red Bull",               price: "250 Lek" },
      { name: "B-52",                   price: "130 Lek" },
      { name: "Tonic",                  price: "150 Lek" },
      { name: "Sprite",                 price: "150 Lek" },
      { name: "Suko e vogël",           price: "100 Lek" },
      { name: "Suko e madhe",           price: "150 Lek" },
      { name: "Santal",                 price: "250 Lek" },
    ],
    // Birra
    beer: [
      { name: "Peroni",                 price: "200 Lek" },
      { name: "Peja",                   price: "200 Lek" },
      { name: "Elbar",                  price: "200 Lek" },
      { name: "Heineken",               price: "300 Lek" },
      { name: "Birrë kriko e vogël",    price: "200 Lek" },
      { name: "Birrë kriko e madhe",    price: "300 Lek" },
      { name: "Bavaria 0.0%",           price: "200 Lek" },
      { name: "Paulaner",               price: "350 Lek" },
    ],
    // Pije alkoolike
    spirits: [
      { name: "Amaro Montenegro",           price: "300 Lek" },
      { name: "Jägermeister",               price: "300 Lek" },
      { name: "Baileys",                    price: "250 Lek" },
      { name: "Gin Hendrick’s",             price: "400 Lek" },
      { name: "Metaxa 5 Stars",             price: "300 Lek" },
      { name: "Aperol",                     price: "300 Lek" },
      { name: "Tequila Reposado",           price: "300 Lek" },
      { name: "Vodka Absolut",              price: "300 Lek" },
      { name: "Jack Daniel’s",              price: "300 Lek" },
      { name: "Chivas",                     price: "300 Lek" },
      { name: "Johnnie Walker Red Label",   price: "250 Lek" },
    ],
  },

  /* Per-category tab label (Albanian) + side image.
     imageKey points at an existing entry in CHEKA.images above — the
     photographs themselves are unchanged. */
  menuMeta: {
    hot:     { label: "Të ngrohta",     imageKey: "menuCoffee" },
    soft:    { label: "Pije freskuese", imageKey: "menuDrinks" },
    beer:    { label: "Birra",          imageKey: "menuFood" },
    spirits: { label: "Pije alkoolike", imageKey: "menuDesserts" },
  },

  /* ------------------------------------------------------------------ */
  /* 7. GALLERY                                                        */
  /*    category must be one of: interior | coffee | drinks | food     */
  /*    (luggage images can use "interior" so they show under "All").  */
  /*    TODO CHEKA: swap each src for a real photo and refine alt/caption.*/
  /* ------------------------------------------------------------------ */
  gallery: [
    { src: "images/gallery/interior-01.svg", category: "interior", caption: "The main room at dusk",        alt: "Cheka café interior with warm pendant lighting over wooden tables" },
    { src: "images/gallery/coffee-01.svg",   category: "coffee",   caption: "Morning espresso",             alt: "Espresso being pulled into a small cup" },
    { src: "images/gallery/interior-02.svg", category: "interior", caption: "The bar",                      alt: "Cheka bar counter in forest green with wood detailing" },
    { src: "images/gallery/drinks-01.svg",   category: "drinks",   caption: "Something refreshing",         alt: "A chilled signature drink on a wooden table" },
    { src: "images/gallery/coffee-02.svg",   category: "coffee",   caption: "Latte, unhurried",             alt: "Latte with leaf pattern in a ceramic cup" },
    { src: "images/gallery/food-01.svg",     category: "food",     caption: "Slow brunch",                  alt: "A brunch plate with greens and sourdough" },
    { src: "images/gallery/interior-03.svg", category: "interior", caption: "Plants and signage",           alt: "Corner of Cheka with plants beside the signage" },
    { src: "images/gallery/drinks-02.svg",   category: "drinks",   caption: "Behind the bar",               alt: "Bar shelf with glassware and bottles" },
    { src: "images/gallery/food-02.svg",     category: "food",     caption: "From the counter",             alt: "Pastry counter with fresh bakes" },
    { src: "images/gallery/luggage-01.svg",  category: "interior", caption: "Leave your bags with us",      alt: "Tidy luggage storage area inside Cheka" },
  ],

  /* ------------------------------------------------------------------ */
  /* 8. REVIEWS  —  ⚠ SAMPLE CONTENT ⚠                                 */
  /*    These are placeholder guest stories, NOT real Google reviews.  */
  /*    TODO CHEKA: replace every entry with genuine, permitted quotes.*/
  /*    Do not add invented totals like "4.9 from 600 reviews".        */
  /* ------------------------------------------------------------------ */
  reviewsAreSample: true,
  reviews: [
    { name: "Sample guest — replace", rating: 5, text: "The calmest corner in the city. Great coffee and I could leave my bags while I walked around.", source: "Sample content" },
    { name: "Sample guest — replace", rating: 5, text: "Beautiful space, warm staff, and the flat white was exactly right.", source: "Sample content" },
    { name: "Sample guest — replace", rating: 4, text: "Lovely spot to work for an hour. The plants and the light make it.", source: "Sample content" },
  ],

  /* ------------------------------------------------------------------ */
  /* 9. LUGGAGE FAQ (dedicated page accordion)                         */
  /*    Answers render as HTML-safe text. Edit freely.                 */
  /* ------------------------------------------------------------------ */
  luggageFaqs: [
    { q: "Do I need to book in advance?",
      a: "No — you can walk in during opening hours. If you are travelling with a large group, a quick call ahead helps us make space." },
    { q: "What types of luggage can I store?",
      a: "Suitcases, backpacks, duffel bags, shopping bags and similar personal items. Please keep valuables, documents and medication with you." },
    { q: "How long can I leave my bags?",
      a: "Bags can be collected any time during the same day’s opening hours. Maximum storage duration will be confirmed soon — ask our team for current limits." },
    { q: "Is the storage area secure?",
      a: "Yes. Bags are kept inside the café in a supervised area, tagged at drop-off and matched to you at pick-up, with staff present throughout opening hours." },
    { q: "What are your opening hours?",
      a: "The luggage desk follows café hours: every day, 07:00 – 23:00 (to be confirmed). Drop off and pick up any time within those hours." },
    { q: "How can I find Cheka?",
      a: "We are inside Cheka Bar Café. The full address and a map link will be added here — use the “Get directions” button once it is live." },
  ],
};

/* Make it available to js/script.js (plain global — no modules, no build). */
window.CHEKA = CHEKA;

/* ----------------------------------------------------------------------------
   Convenience aliases (optional). Some people prefer these shorter names when
   hand-editing. They point at the SAME objects as CHEKA.* above — editing
   either side changes the same data.
   -------------------------------------------------------------------------- */
const siteImages   = CHEKA.images;    // e.g. siteImages.logo, siteImages.hero
const menuData      = CHEKA.menu;      // e.g. menuData.coffee[0].price
const galleryData   = CHEKA.gallery;
const reviewsData   = CHEKA.reviews;
const businessInfo  = CHEKA.business;
const luggageInfo   = CHEKA.luggage;
window.siteImages = siteImages;
