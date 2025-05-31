// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (typeof GLightbox === "function") {
  const lightbox = GLightbox({ selector: '.glightbox' });
}

const langToggle = document.getElementById("langToggle");

let swiperInstance = null;
let heroSwiperInstance = null;

// Initialize products slider
function initSwiper() {
  if (typeof Swiper !== "function" || !document.querySelector('.products-slider')) return;

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }

  const sliderElement = document.querySelector('.products-slider');
  sliderElement.style.direction = document.documentElement.dir;

  const isRTL = document.documentElement.dir === "rtl";

  swiperInstance = new Swiper('.products-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    rtl: isRTL,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      480: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 }
    }
  });
}

// Initialize hero slider
function initHeroSwiper() {
  if (heroSwiperInstance) {
    heroSwiperInstance.destroy(true, true);
    heroSwiperInstance = null;
  }

  heroSwiperInstance = new Swiper('.home-hero-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.hero-swiper-button-next',
      prevEl: '.hero-swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 1500
  });
}

// Set language and store it
function setLanguage(lang) {
  const html = document.documentElement;

  if (heroSwiperInstance) heroSwiperInstance.autoplay.stop();

  if (lang === "ar") {
    html.lang = "ar";
    html.dir = "rtl";
    if (langToggle) langToggle.textContent = "English";
  } else {
    html.lang = "en";
    html.dir = "ltr";
    if (langToggle) langToggle.textContent = "العربية";
  }

  localStorage.setItem("lang", lang);

  initSwiper();
  initHeroSwiper();

  if (heroSwiperInstance) heroSwiperInstance.autoplay.start();
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("lang") || "ar";
  setLanguage(savedLang);
});

// Toggle language on button click
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "ar" ? "en" : "ar";
    setLanguage(newLang);
  });
}
