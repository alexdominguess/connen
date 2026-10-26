/**
 * CONNEN — interações da página
 * Depende de assets/js/config.js (window.CONNEN_CONFIG).
 */
(function () {
  "use strict";

  var config = window.CONNEN_CONFIG || { whatsappNumber: "", messages: {} };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- WhatsApp ---------- */
  var digits = String(config.whatsappNumber || "").replace(/\D/g, "");
  // 55 + DDD (2) + número (8 ou 9 dígitos) = 12 ou 13 dígitos
  var hasWhatsapp = !!config.whatsappUrl || /^55\d{10,11}$/.test(digits);

  function whatsappUrl(key) {
    if (config.whatsappUrl) return config.whatsappUrl;
    var text = (config.messages && (config.messages[key] || config.messages.orcamento)) || "";
    return "https://wa.me/" + digits + (text ? "?text=" + encodeURIComponent(text) : "");
  }

  var toast = $("[data-toast]");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 5000);
  }

  var whatsappLinks = $$("[data-whatsapp]");
  if (hasWhatsapp) {
    whatsappLinks.forEach(function (el) {
      el.href = whatsappUrl(el.getAttribute("data-whatsapp"));
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  } else {
    console.warn(
      "[Connen] WhatsApp não configurado. Preencha `whatsappNumber` em assets/js/config.js " +
      "(formato: 55 + DDD + número, somente dígitos)."
    );
    whatsappLinks.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        closeMenu();
        showToast("O contato por WhatsApp ainda está sendo configurado. Em breve você poderá falar com a Connen por aqui.");
      });
    });
  }

  var phoneEl = $("[data-phone]");
  if (phoneEl && config.phoneDisplay) {
    var phoneDigits = String(config.phoneDisplay).replace(/\D/g, "");
    if (phoneDigits.length >= 10) {
      phoneEl.textContent = config.phoneDisplay;
      phoneEl.href = "tel:+" + (phoneDigits.indexOf("55") === 0 && phoneDigits.length > 11 ? "" : "55") + phoneDigits;
      phoneEl.hidden = false;
    }
  }

  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  var toggle = $("[data-menu-toggle]");
  var nav = $("[data-nav]");
  var toggleLabel = $("[data-menu-label]");

  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (toggleLabel) toggleLabel.textContent = open ? "Fechar menu" : "Abrir menu";
  }
  function closeMenu() { setMenu(false); }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    window.matchMedia("(min-width: 980px)").addEventListener("change", closeMenu);
  }

  /* ---------- FAQ (accordion) ---------- */
  var triggers = $$(".accordion__trigger");
  triggers.forEach(function (btn, i) {
    var panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
    btn.addEventListener("keydown", function (e) {
      var target;
      if (e.key === "ArrowDown") target = triggers[(i + 1) % triggers.length];
      else if (e.key === "ArrowUp") target = triggers[(i - 1 + triggers.length) % triggers.length];
      else if (e.key === "Home") target = triggers[0];
      else if (e.key === "End") target = triggers[triggers.length - 1];
      if (target) { e.preventDefault(); target.focus(); }
    });
  });

  /* ---------- Header, botão flutuante ---------- */
  var header = $("[data-header]");
  var fab = $("[data-fab]");
  var hero = $("[data-hero]");
  var finalCta = $("[data-final-cta]");
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (fab && hero && finalCta) {
      var pastHero = y > hero.offsetHeight * 0.8;
      var atFinal = finalCta.getBoundingClientRect().top < window.innerHeight * 0.7;
      fab.classList.toggle("is-visible", pastHero && !atFinal);
    }
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Revelar ao rolar ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
