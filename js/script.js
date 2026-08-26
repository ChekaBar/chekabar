/* ============================================================================
   CHEKA  ·  script.js
   ----------------------------------------------------------------------------
   Behaviour only. All editable content lives in js/data.js (window.CHEKA).
   This file is safe to load on BOTH index.html and luggage-storage.html —
   every module checks that its elements exist before running, so a section
   that is absent on one page simply does nothing.

   Modules:
     · no-js flag            · inline SVG icons        · centralised images
     · sticky header state   · mobile navigation       · smooth anchor scroll
     · quick features        · interactive menu        · luggage details
     · gallery + lightbox    · FAQ accordion           · scroll reveal
     · business details      · reviews                 · footer year
     · mobile quick-actions  · contact form (mailto)
   ========================================================================== */
(function () {
  "use strict";

  var DATA = window.CHEKA || {};
  var doc = document;

  /* mark that JS is available (CSS uses .no-js for fallbacks) */
  doc.documentElement.classList.remove("no-js");
  doc.documentElement.classList.add("js");

  var prefersReduced = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  /* -------------------------------------------------- tiny helpers */
  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var node = doc.createElement(tag);
    if (attrs) { Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }); }
    if (html != null) node.innerHTML = html;
    return node;
  }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function on(node, evt, fn) { if (node) node.addEventListener(evt, fn); }


  /* ==========================================================================
     INLINE SVG ICONS  (no icon library, consistent 24px stroke set)
     ========================================================================== */
  var ICONS = {
    bean: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="12" rx="7" ry="9"/><path d="M9 5c2 3 2 11-2 14M15 5c-2 3-2 11 2 14"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-8 6-15 16-16C19 12 13 20 4 20Z"/><path d="M4 20C8 14 12 11 18 8"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="1"/></svg>',
    luggage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="7" width="14" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11v5M15 11v5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"/><path d="M9 12l2 2 4-4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13V5a1 1 0 0 1 1-1h8l7 7-9 9-7-7a1 1 0 0 1 0-0Z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5 11-11"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l2 2M14 9l2 2"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l3 5-2 2c1 3 3 5 6 6l2-2 5 3-1 4c-9 1-19-9-18-18Z"/></svg>',
    directions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l10 10-10 10L2 12 12 2Z"/><path d="M9 14v-3a2 2 0 0 1 2-2h4M13 7l3 2-3 2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3l.5-3.5H14V4c0-1 .3-1.7 1.8-1.7H18V-.8C17.5-.9 16.2-1 14.8-1 11.8-1 10 .8 10 4v1.5H7V9h3v12h4V9Z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 3c.3 2.2 1.6 3.9 4 4.2v3.1c-1.5.1-2.9-.3-4.2-1.1v6.6c0 4-3.2 6.6-6.9 5.8-3-.6-4.9-3.5-4.4-6.5.5-2.9 3.2-4.9 6.2-4.5v3.2c-.5-.1-1-.2-1.5-.1-1.3.2-2.2 1.3-2 2.6.2 1.5 1.8 2.4 3.2 1.8 1-.4 1.5-1.3 1.5-2.5V3H16Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>'
  };

  function injectIcons() {
    $all("[data-icon]").forEach(function (node) {
      var key = node.getAttribute("data-icon");
      if (ICONS[key]) node.innerHTML = ICONS[key];
    });
  }


  /* ==========================================================================
     CENTRALISED IMAGES  +  graceful missing-image fallback
     ========================================================================== */
  function handleImgError(img) {
    img.classList.add("img-fallback");
    var label = img.getAttribute("data-fallback-label") || img.getAttribute("alt") || "Image coming soon";
    var wrap = img.parentElement;
    if (wrap && !wrap.querySelector(".img-fallback-note")) {
      wrap.classList.add("has-img-fallback");
    }
    img.setAttribute("data-broken", "true");
    // Swap in an inline SVG so nothing looks broken.
    var w = img.getAttribute("width") || 1200;
    var h = img.getAttribute("height") || 800;
    img.src =
      "data:image/svg+xml;charset=utf8," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '">' +
        '<rect width="100%" height="100%" fill="#1B3523"/>' +
        '<text x="50%" y="50%" fill="#C49A5A" font-family="Georgia,serif" font-size="' +
        Math.round(Math.min(w, h) / 16) +
        '" text-anchor="middle" dominant-baseline="middle">CHEKA — ' + esc(label) + "</text></svg>"
      );
  }

  function applyImages() {
    var imgs = DATA.images || {};
    $all("[data-img]").forEach(function (img) {
      var key = img.getAttribute("data-img");
      var src = imgs[key];
      if (src) {
        img.addEventListener("error", function once() {
          img.removeEventListener("error", once);
          handleImgError(img);
        });
        // Only set if different (keeps any hand-authored src as a pre-paint hint)
        if (img.getAttribute("src") !== src) img.src = src;
      } else if (img.getAttribute("src")) {
        img.addEventListener("error", function once() {
          img.removeEventListener("error", once);
          handleImgError(img);
        });
      }
    });

    // Background images (e.g. the Experience section)
    $all("[data-bg-img]").forEach(function (node) {
      var key = node.getAttribute("data-bg-img");
      var src = imgs[key];
      if (src) node.style.backgroundImage = 'url("' + src + '")';
    });

    // Logo images: fall back to the text lockup if they fail
    $all("[data-logo]").forEach(function (img) {
      if (imgs.logo && img.getAttribute("src") !== imgs.logo) img.src = imgs.logo;
      on(img, "error", function () {
        var brand = img.closest(".brand, .footer-brand");
        if (brand) brand.classList.add("logo-missing");
      });
    });
  }


  /* ==========================================================================
     STICKY HEADER STATE
     ========================================================================== */
  function initHeaderScroll() {
    var header = $(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }
    update();
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }


  /* ==========================================================================
     MOBILE NAVIGATION
     ========================================================================== */
  function initMobileNav() {
    var toggle = $(".nav-toggle");
    var panel = $("#mobile-nav");
    if (!toggle || !panel) return;
    var closeBtn = $(".mobile-nav__close", panel);
    var links = $all("a", panel);
    var lastFocused = null;

    function open() {
      lastFocused = doc.activeElement;
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      doc.body.classList.add("no-scroll");
      (closeBtn || links[0] || panel).focus();
      doc.addEventListener("keydown", onKeydown);
    }
    function close() {
      panel.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      doc.body.classList.remove("no-scroll");
      doc.removeEventListener("keydown", onKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }
    function onKeydown(e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab") return;
      // simple focus containment
      var focusables = [toggle].concat($all("a, button", panel)).filter(function (n) {
        return n.offsetParent !== null || n === toggle;
      });
      var first = closeBtn || focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    on(toggle, "click", function () {
      panel.classList.contains("is-open") ? close() : open();
    });
    on(closeBtn, "click", close);
    links.forEach(function (a) { on(a, "click", close); });

    // Close if resized up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 940 && panel.classList.contains("is-open")) close();
    });
  }


  /* ==========================================================================
     SMOOTH ANCHOR SCROLL (with sticky-header offset + focus handling)
     ========================================================================== */
  function initSmoothScroll() {
    var headerH = 72;
    var header = $(".site-header");
    if (header) headerH = header.offsetHeight;

    $all('a[href*="#"]').forEach(function (link) {
      // Links with data-action are managed by wireAction() (they may become
      // external links or be disabled) — leave them alone here.
      if (link.hasAttribute("data-action")) return;

      var url = link.getAttribute("href");
      // only same-page hashes (e.g. "#menu" or "index.html#menu" while on index)
      var hashIndex = url.indexOf("#");
      if (hashIndex < 0) return;
      var path = url.slice(0, hashIndex);
      var hash = url.slice(hashIndex);
      if (hash.length < 2) return;
      var samePage = !path || path === location.pathname || path === location.pathname.split("/").pop();
      if (!samePage) return;

      link.addEventListener("click", function (e) {
        var target = doc.getElementById(hash.slice(1));
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : headerH) - 12;
        window.scrollTo({ top: top, behavior: prefersReduced ? "auto" : "smooth" });
        // move focus for keyboard + screen-reader users
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        if (history.replaceState) history.replaceState(null, "", hash);
      });
    });
  }


  /* ==========================================================================
     SCROLL-SPY  (highlight the nav link for the section in view — home page)
     ========================================================================== */
  function initScrollSpy() {
    var links = $all('.primary-nav__link[href^="#"]');
    if (!links.length) return;
    var sections = [];
    links.forEach(function (a) {
      var sec = doc.getElementById(a.getAttribute("href").slice(1));
      if (sec) sections.push({ link: a, sec: sec });
    });
    if (!sections.length) return;
    // Order by position on the page, not by nav order.
    sections.sort(function (a, b) { return a.sec.offsetTop - b.sec.offsetTop; });

    var header = $(".site-header");
    var ticking = false;
    function update() {
      ticking = false;
      var probe = window.scrollY + (header ? header.offsetHeight : 72) + 40;
      var currentLink = sections[0].link;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].sec.offsetTop <= probe) currentLink = sections[i].link;
      }
      // near the very bottom, force-select the last section
      if (window.innerHeight + window.scrollY >= doc.body.scrollHeight - 4) {
        currentLink = sections[sections.length - 1].link;
      }
      links.forEach(function (a) { a.classList.toggle("is-active", a === currentLink); });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }


  /* ==========================================================================
     QUICK-FEATURE STRIP
     ========================================================================== */
  function renderQuickFeatures() {
    var wrap = $("#quick-features");
    if (!wrap || !DATA.quickFeatures) return;
    wrap.innerHTML = "";
    DATA.quickFeatures.forEach(function (f) {
      wrap.appendChild(el("div", { class: "feature" },
        '<span class="feature__icon" aria-hidden="true">' + (ICONS[f.icon] || "") + '</span>' +
        '<span><span class="feature__title">' + esc(f.title) + "</span>" +
        '<span class="feature__sub">' + esc(f.subtitle) + "</span></span>"
      ));
    });
  }


  /* ==========================================================================
     INTERACTIVE MENU  (tabs + panels built from CHEKA.menu)
     ========================================================================== */
  function initMenu() {
    var tablist = $("#menu-tabs");
    var panels = $("#menu-panels");
    var aside = $("#menu-photo");
    var caption = $("#menu-photo-caption");
    if (!tablist || !panels || !DATA.menu) return;

    var meta = DATA.menuMeta || {};
    var keys = Object.keys(DATA.menu);
    tablist.innerHTML = "";
    panels.innerHTML = "";

    keys.forEach(function (key, i) {
      var label = (meta[key] && meta[key].label) || key;
      var tabId = "menu-tab-" + key;
      var panelId = "menu-panel-" + key;

      var tab = el("button", {
        class: "menu__tab",
        id: tabId,
        role: "tab",
        type: "button",
        "aria-selected": i === 0 ? "true" : "false",
        "aria-controls": panelId,
        tabindex: i === 0 ? "0" : "-1"
      }, esc(label));
      tablist.appendChild(tab);

      var panel = el("div", {
        class: "menu__panel",
        id: panelId,
        role: "tabpanel",
        "aria-labelledby": tabId,
        tabindex: "0"
      });
      if (i !== 0) panel.hidden = true;

      var list = el("div", { class: "menu__list" });
      /* <!-- TODO CHEKA: real menu items & prices are edited in js/data.js -> CHEKA.menu --> */
      (DATA.menu[key] || []).forEach(function (item) {
        list.appendChild(el("div", { class: "menu__item" },
          '<span class="menu__item-name">' + esc(item.name) + "</span>" +
          '<span class="menu__item-price">' + esc(item.price) + "</span>" +
          '<span class="menu__item-desc">' + esc(item.description) + "</span>"
        ));
      });
      panel.appendChild(list);
      panels.appendChild(panel);
    });

    var tabs = $all(".menu__tab", tablist);
    var panelEls = $all(".menu__panel", panels);

    function activate(index, focusTab) {
      tabs.forEach(function (t, i) {
        var selected = i === index;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.setAttribute("tabindex", selected ? "0" : "-1");
        panelEls[i].hidden = !selected;
        if (selected && !prefersReduced) {
          panelEls[i].classList.remove("is-entering");
          void panelEls[i].offsetWidth;           // restart animation
          panelEls[i].classList.add("is-entering");
        }
      });
      if (focusTab) tabs[index].focus();
      updatePhoto(keys[index]);
      announce("U zgjodh kategoria: " + (tabs[index].textContent || ""));
    }

    function updatePhoto(key) {
      if (!aside) return;
      var m = meta[key];
      var imgKey = m && m.imageKey;
      var src = imgKey && DATA.images ? DATA.images[imgKey] : null;
      if (src) { aside.src = src; aside.alt = "Cheka — " + ((m && m.label) || key); }
      if (caption) caption.textContent = (m && m.label) || key;
    }

    tabs.forEach(function (tab, i) {
      on(tab, "click", function () { activate(i, false); });
      on(tab, "keydown", function (e) {
        var idx = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") idx = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") idx = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") idx = 0;
        else if (e.key === "End") idx = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(idx, true);
      });
    });

    updatePhoto(keys[0]);
  }


  /* ==========================================================================
     LUGGAGE DETAILS  (home section facts + dedicated-page fields)
     ========================================================================== */
  function renderLuggage() {
    var L = DATA.luggage || {};
    var B = DATA.business || {};

    // feature bullets (home + page)
    $all("[data-luggage-features]").forEach(function (ul) {
      ul.innerHTML = "";
      (L.features || []).forEach(function (f) {
        ul.appendChild(el("li", null, '<span aria-hidden="true">' + ICONS.check + "</span><span>" + esc(f) + "</span>"));
      });
    });

    // key/value facts
    var facts = [
      ["Price per bag", L.pricePerBag],
      ["Opening hours", L.openingHours],
      ["Max. duration", L.maxDuration],
      ["Booking", L.bookingMethod],
      ["Location", L.location]
    ];
    $all("[data-luggage-facts]").forEach(function (dl) {
      dl.innerHTML = "";
      facts.forEach(function (row) {
        if (!row[1]) return;
        dl.appendChild(el("dt", { text: row[0] }));
        dl.appendChild(el("dd", { text: row[1] }));
      });
    });

    // individual fields on the dedicated page
    setText("[data-luggage='price']", L.pricePerBag);
    setText("[data-luggage='hours']", L.openingHours);
    setText("[data-luggage='duration']", L.maxDuration);
    setText("[data-luggage='booking']", L.bookingMethod);
    setText("[data-luggage='location']", L.location);

    // three-step process
    var stepsWrap = $("[data-luggage-steps]");
    if (stepsWrap && L.steps) {
      stepsWrap.innerHTML = "";
      L.steps.forEach(function (s) {
        stepsWrap.appendChild(el("div", { class: "step" },
          "<h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p>"));
      });
    }

    // security list
    var secWrap = $("[data-luggage-security]");
    if (secWrap && L.security) {
      secWrap.innerHTML = "";
      L.security.forEach(function (t) {
        secWrap.appendChild(el("li", null, '<span aria-hidden="true">' + ICONS.check + "</span><span>" + esc(t) + "</span>"));
      });
    }

    // luggage phone / directions CTAs (reuse business values when not overridden)
    wireAction("[data-action='luggage-call']", (L.phone || B.phone) ? "tel:" + (L.phone || B.phone) : null,
      (L.phone || B.phone) || null);
    wireAction("[data-action='luggage-directions']", L.directionsUrl || B.directions || null, null);
  }


  /* ==========================================================================
     GALLERY  +  LIGHTBOX
     ========================================================================== */
  function initGallery() {
    var grid = $("#gallery-grid");
    var filterWrap = $("#gallery-filters");
    if (!grid || !DATA.gallery) return;

    var items = DATA.gallery.slice();
    var cats = ["all"].concat(items.map(function (i) { return i.category; })
      .filter(function (v, i, a) { return a.indexOf(v) === i; }));
    var labels = { all: "All", interior: "Interior", coffee: "Coffee", drinks: "Drinks", food: "Food" };

    // filters
    if (filterWrap) {
      filterWrap.innerHTML = "";
      cats.forEach(function (cat, i) {
        var btn = el("button", {
          class: "filter-btn",
          type: "button",
          "data-filter": cat,
          "aria-pressed": i === 0 ? "true" : "false"
        }, esc(labels[cat] || cat));
        on(btn, "click", function () { applyFilter(cat, btn); });
        filterWrap.appendChild(btn);
      });
    }

    // grid
    grid.innerHTML = "";
    items.forEach(function (item, index) {
      var fig = el("figure", {
        class: "gallery__item",
        "data-cat": item.category,
        "data-index": String(index),
        tabindex: "0",
        role: "button",
        "aria-label": "Open image: " + (item.caption || item.alt || "photo")
      },
        '<img src="' + esc(item.src) + '" alt="' + esc(item.alt || item.caption || "Cheka photo") +
        '" loading="lazy" decoding="async">' +
        (item.caption ? "<figcaption>" + esc(item.caption) + "</figcaption>" : "")
      );
      var img = $("img", fig);
      on(img, "error", function () { handleImgError(img); });
      on(fig, "click", function () { openLightbox(index); });
      on(fig, "keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(index); }
      });
      grid.appendChild(fig);
    });

    var figures = $all(".gallery__item", grid);

    function applyFilter(cat, btn) {
      $all(".filter-btn", filterWrap).forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      var shown = 0;
      figures.forEach(function (fig) {
        var match = cat === "all" || fig.getAttribute("data-cat") === cat;
        fig.classList.toggle("is-hidden", !match);
        if (match) shown++;
      });
      announce(shown + " photo" + (shown === 1 ? "" : "s") + " shown" +
        (cat === "all" ? "" : " in " + (labels[cat] || cat)));
    }

    /* ---- lightbox ---- */
    var lb = $("#lightbox");
    if (!lb) return;
    var lbImg = $(".lightbox__img", lb);
    var lbCap = $(".lightbox__caption", lb);
    var btnClose = $(".lightbox__close", lb);
    var btnPrev = $(".lightbox__prev", lb);
    var btnNext = $(".lightbox__next", lb);
    var current = 0;
    var lbOpener = null;

    function visibleIndexes() {
      return figures.map(function (f, i) { return f.classList.contains("is-hidden") ? -1 : i; })
        .filter(function (i) { return i >= 0; });
    }
    function show(index) {
      current = index;
      var item = items[index];
      lbImg.src = item.src;
      lbImg.alt = item.alt || item.caption || "Cheka photo";
      lbCap.textContent = item.caption || "";
      lbImg.onerror = function () { handleImgError(lbImg); };
    }
    function openLightbox(index) {
      lbOpener = figures[index] || doc.activeElement;
      show(index);
      lb.classList.add("is-open");
      lb.removeAttribute("hidden");
      doc.body.classList.add("no-scroll");
      doc.addEventListener("keydown", onKey);
      btnClose.focus();
    }
    function closeLightbox() {
      lb.classList.remove("is-open");
      doc.body.classList.remove("no-scroll");
      doc.removeEventListener("keydown", onKey);
      setTimeout(function () { lb.setAttribute("hidden", ""); }, 300);
      if (lbOpener && lbOpener.focus) lbOpener.focus();
    }
    function step(dir) {
      var vis = visibleIndexes();
      if (!vis.length) return;
      var pos = vis.indexOf(current);
      if (pos < 0) pos = 0;
      var next = (pos + dir + vis.length) % vis.length;
      show(vis[next]);
    }
    function onKey(e) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab") {
        // contain focus within the 3 controls
        var f = [btnClose, btnPrev, btnNext];
        var idx = f.indexOf(doc.activeElement);
        e.preventDefault();
        var dir = e.shiftKey ? -1 : 1;
        f[(idx + dir + f.length) % f.length].focus();
      }
    }
    on(btnClose, "click", closeLightbox);
    on(btnPrev, "click", function () { step(-1); });
    on(btnNext, "click", function () { step(1); });
    on(lb, "click", function (e) { if (e.target === lb) closeLightbox(); });
  }


  /* ==========================================================================
     FAQ ACCORDION  (progressive enhancement)
     ========================================================================== */
  function initFaq() {
    var wrap = $("#faq");
    if (!wrap) return;

    // Build from data if a container is empty; otherwise enhance existing markup.
    if (!wrap.children.length && DATA.luggageFaqs) {
      DATA.luggageFaqs.forEach(function (f, i) {
        var id = "faq-a-" + i;
        var item = el("div", { class: "faq__item" },
          '<h3 style="margin:0">' +
          '<button class="faq__question" type="button" aria-expanded="false" aria-controls="' + id + '">' +
          "<span>" + esc(f.q) + "</span><span class=\"faq__icon\" aria-hidden=\"true\"></span></button></h3>" +
          '<div class="faq__answer" id="' + id + '" role="region"><div class="faq__answer-inner"><p>' +
          esc(f.a) + "</p></div></div>"
        );
        wrap.appendChild(item);
      });
    }

    $all(".faq__question", wrap).forEach(function (btn) {
      var panel = doc.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = "0px";
      on(btn, "click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
      });
    });

    window.addEventListener("resize", function () {
      $all(".faq__question[aria-expanded='true']", wrap).forEach(function (btn) {
        var panel = doc.getElementById(btn.getAttribute("aria-controls"));
        if (panel) panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  }


  /* ==========================================================================
     SCROLL REVEAL
     ========================================================================== */
  function initReveal() {
    var nodes = $all(".reveal");
    if (!nodes.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  }


  /* ==========================================================================
     BUSINESS DETAILS  (contact section + footer, kept in sync with data.js)
     ========================================================================== */
  function setText(sel, value) {
    $all(sel).forEach(function (n) {
      if (value != null && value !== "") n.textContent = value;
    });
  }
  function announce(msg) {
    var live = $("#sr-status");
    if (live) { live.textContent = ""; window.setTimeout(function () { live.textContent = msg; }, 30); }
  }
  function wireAction(sel, href, telDisplay) {
    $all(sel).forEach(function (node) {
      if (href) {
        node.setAttribute("href", href);
        node.classList.remove("is-unavailable");
        node.removeAttribute("aria-disabled");
        if (/^https?:/.test(href)) { node.setAttribute("target", "_blank"); node.setAttribute("rel", "noopener"); }
      } else {
        node.classList.add("is-unavailable");
        node.setAttribute("aria-disabled", "true");
        node.removeAttribute("href");
        node.setAttribute("title", "Coming soon");
      }
    });
  }

  function renderBusiness() {
    var B = DATA.business || {};

    // address / email
    setText("[data-field='address']", B.address && B.address.full);
    setText("[data-field='email-text']", B.email);

    // phone (text + tel: links)
    if (B.phone) {
      setText("[data-field='phone-text']", B.phone);
      wireAction("[data-action='call']", "tel:" + B.phone, B.phone);
    } else {
      setText("[data-field='phone-text']", "Phone number coming soon");
      wireAction("[data-action='call']", null);
    }

    // email links
    if (B.email) {
      wireAction("[data-action='email']", "mailto:" + B.email);
    }

    // directions / maps
    wireAction("[data-action='directions']", B.directions || B.maps || null);

    // whatsapp
    if (B.whatsapp) {
      wireAction("[data-action='whatsapp']", "https://wa.me/" + String(B.whatsapp).replace(/[^\d]/g, ""));
    } else {
      wireAction("[data-action='whatsapp']", null);
    }

    // opening hours
    $all("[data-field='hours']").forEach(function (wrap) {
      if (!B.hours) return;
      wrap.innerHTML = "";
      B.hours.forEach(function (row) {
        wrap.appendChild(el("div", null,
          "<span>" + esc(row.label) + "</span><span>" + esc(row.value) + "</span>"));
      });
    });
    setText("[data-field='hours-short']", B.hoursShort);

    // socials
    var social = B.social || {};
    $all("[data-social]").forEach(function (a) {
      var key = a.getAttribute("data-social");
      var url = social[key];
      if (url) {
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
        a.classList.remove("is-unavailable");
      } else {
        a.classList.add("is-unavailable");
        a.setAttribute("aria-disabled", "true");
        a.removeAttribute("href");
        a.setAttribute("title", "Link coming soon");
      }
    });

    // Google Maps embed (only if a real URL is provided)
    var mapWrap = $("#contact-map");
    if (mapWrap && B.mapsEmbed) {
      var ph = $(".contact__map-placeholder", mapWrap);
      if (ph) ph.remove();
      var iframe = el("iframe", {
        src: B.mapsEmbed,
        title: "Map showing the location of Cheka Bar Café",
        loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade",
        allowfullscreen: ""
      });
      mapWrap.appendChild(iframe);
    }
  }


  /* ==========================================================================
     REVIEWS
     ========================================================================== */
  function renderReviews() {
    var wrap = $("#reviews-grid");
    if (!wrap || !DATA.reviews) return;
    wrap.innerHTML = "";
    DATA.reviews.forEach(function (r) {
      var stars = "";
      var rating = Math.max(0, Math.min(5, Math.round(r.rating || 5)));
      for (var i = 0; i < rating; i++) stars += ICONS.star;
      wrap.appendChild(el("blockquote", { class: "review" },
        '<div class="review__stars" aria-label="' + rating + ' out of 5">' + stars + "</div>" +
        '<p class="review__text">' + esc(r.text) + "</p>" +
        '<footer class="review__meta">' +
        '<span class="review__name">' + esc(r.name) + "</span>" +
        (r.source ? ' · <span class="review__source">' + esc(r.source) + "</span>" : "") +
        "</footer>"
      ));
    });
  }


  /* ==========================================================================
     FOOTER YEAR
     ========================================================================== */
  function initYear() {
    setText("[data-year]", String(new Date().getFullYear()));
  }


  /* ==========================================================================
     MOBILE QUICK-ACTION BAR  (Call · Directions · Menu · Luggage)
     ========================================================================== */
  function initQuickBar() {
    // Wiring for call/directions is handled by renderBusiness() via data-action.
    // Here we only make sure disabled ones can't be tab-focused into a dead link.
    $all(".quick-bar__btn.is-unavailable").forEach(function (b) {
      b.setAttribute("tabindex", "-1");
    });
  }


  /* ==========================================================================
     CONTACT FORM  (client-side validation + mailto fallback, no backend)
     ========================================================================== */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var status = $("#form-status", form) || $("#form-status");
    var B = DATA.business || {};

    function setError(field, msg) {
      var wrap = field.closest(".field");
      var errNode = wrap ? $(".error-text", wrap) : null;
      if (wrap) wrap.classList.toggle("has-error", !!msg);
      if (errNode) errNode.textContent = msg || "";
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name;
      var email = form.elements.email;
      var message = form.elements.message;
      var ok = true;

      if (!name.value.trim()) { setError(name, "Please tell us your name."); ok = false; } else setError(name, "");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, "Please enter a valid email address."); ok = false;
      } else setError(email, "");
      if (message.value.trim().length < 10) {
        setError(message, "Please add a few more details (10+ characters)."); ok = false;
      } else setError(message, "");

      if (!ok) {
        if (status) { status.textContent = "Please fix the highlighted fields."; status.className = "form-status is-err"; }
        var firstErr = $(".field.has-error input, .field.has-error textarea", form);
        if (firstErr) firstErr.focus();
        return;
      }

      // No backend: open the visitor's email client with a pre-filled message.
      // TODO CHEKA: to receive messages automatically instead, connect a form
      // service (e.g. Formspree) — see README, section "Contact form".
      var to = B.email || "hello@example.com";
      var subject = encodeURIComponent("Website enquiry from " + name.value.trim());
      var body = encodeURIComponent(
        name.value.trim() + " <" + email.value.trim() + "> wrote:\n\n" + message.value.trim()
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;

      if (status) {
        status.textContent = "Opening your email app… if nothing happens, email us directly at " + to + ".";
        status.className = "form-status is-ok";
      }
      form.reset();
    });
  }


  /* ==========================================================================
     BOOT
     ========================================================================== */
  function boot() {
    // Each module is isolated: a failure in one must not stop the others,
    // and must never leave .reveal content invisible.
    var steps = [
      injectIcons, applyImages, initHeaderScroll, initMobileNav, initSmoothScroll,
      initScrollSpy, renderQuickFeatures, initMenu, renderLuggage, initGallery, initFaq,
      renderBusiness, renderReviews, initYear, initQuickBar, initContactForm
    ];
    steps.forEach(function (fn) {
      try { fn(); } catch (err) {
        if (window.console) console.error("[Cheka] " + fn.name + " failed:", err);
      }
    });
    try { initReveal(); } catch (e) {
      $all(".reveal").forEach(function (n) { n.classList.add("is-visible"); });
    }
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
