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

// دالة تهيئة السلايدر مع ضبط اتجاهه بناء على اللغة
function initSwiper() {
  if (typeof Swiper !== "function" || !document.querySelector('.products-slider')) return;

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }

  const sliderElement = document.querySelector('.products-slider');
  sliderElement.style.direction = document.documentElement.dir; // تأكد من ضبط اتجاه الـ CSS

  const isRTL = document.documentElement.dir === "rtl";

  swiperInstance = new Swiper('.products-slider', {
    slidesPerView: 1, // القيمة الافتراضية
    spaceBetween: 20,
    loop: true,
    rtl: isRTL,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      480: { slidesPerView: 1 },   // على الشاشات الصغيرة جدًا صورة واحدة
      640: { slidesPerView: 2 },   // على الشاشات المتوسطة صورتين
      768: { slidesPerView: 3 },   // على الشاشات الأكبر 3 صور
      1024: { slidesPerView: 4 }   // على الشاشات الكبيرة 4 صور
    }
  });
}

// دالة تغيير اللغة وتخزينها
function setLanguage(lang) {
  const html = document.documentElement;
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

  // هنا ممكن تضيف كود تحديث المحتوى النصي لو عندك

  // إعادة تهيئة السلايدر بعد تغيير اللغة
  initSwiper();
}

// عند تحميل الصفحة، اقرأ اللغة من localStorage أو افتراضي عربي
document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("lang") || "ar";
  setLanguage(savedLang);
});

// عند الضغط على زر تغيير اللغة
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === "ar" ? "en" : "ar";
    setLanguage(newLang);
  });
}
