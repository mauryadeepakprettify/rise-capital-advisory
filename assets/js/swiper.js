new Swiper(".horizontal-ad-slider", {
  slidesPerView: 1,
  spaceBetween: 80,
  loop: true,
  speed: 2000,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".ad-pagination",
    clickable: true,
  },
});

new Swiper(".solution-slider", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1200,
  navigation: {
    nextEl: ".solution-next",
    prevEl: ".solution-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    540: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.2,
    },
    991: {
      slidesPerView: 3.2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".partnerships-slider", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1200,
  navigation: {
    nextEl: ".partnerships-next",
    prevEl: ".partnerships-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    540: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.2,
    },
    991: {
      slidesPerView: 3.2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

new Swiper(".financial-growth-swiper", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1800,
  navigation: {
    nextEl: ".financial-growth-swiper-next",
    prevEl: ".financial-growth-swiper-prev",
  },
  pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    540: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.2 },
    991: { slidesPerView: 3 },
    1024: { slidesPerView: 3 },
  },
});


new Swiper(".partners-slider-one", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  speed: 1800,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    540: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.2 },
    991: { slidesPerView: 3.2 },
    1024: { slidesPerView: 4 },
  },
});

new Swiper(".partners-slider-two", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,
  speed: 1800,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
    reverseDirection: true,
  },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    540: { slidesPerView: 1.5 },
    768: { slidesPerView: 2.2 },
    991: { slidesPerView: 3.2 },
    1024: { slidesPerView: 4 },
  },
});

new Swiper(".directors-slider", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1200,
  navigation: {
    nextEl: ".directors-next",
    prevEl: ".directors-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    540: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.2,
    },
    991: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

new Swiper(".blog-slider", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1200,
  navigation: {
    nextEl: ".blog-slider-next",
    prevEl: ".blog-slider-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    540: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.2,
    },
    991: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

new Swiper(".bank-slider", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: false,
  speed: 1200,
  navigation: {
    nextEl: ".solution-next",
    prevEl: ".solution-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1.2,
    },
    540: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 2.2,
    },
    991: {
      slidesPerView: 3.2,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});

const dreamContentSwiper = new Swiper(".dream-content-slider", {
  slidesPerView: 1.6,
  spaceBetween: 24,
  loop: false,
  speed: 1200,
  direction: "vertical",
});

const dreamImageSwiper = new Swiper(".dream-image-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: false,
  speed: 1200,

  pagination: {
    el: ".dream-image-pagination",
    type: "progressbar",
    clickable: true,
  },

  navigation: {
    nextEl: ".dream-next",
    prevEl: ".dream-prev",
  },
});

dreamContentSwiper.controller.control = dreamImageSwiper;
dreamImageSwiper.controller.control = dreamContentSwiper;

