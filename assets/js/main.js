document.querySelectorAll("[data-modal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    openModel(`.${btn.dataset.modal}`);

    const modalId = btn.dataset.modal;

    if (modalId === "video-modal") {
      const modalVideo = btn.dataset.video;

      const videoEl = document.getElementById("iframe1");
      videoEl.src = modalVideo;
    }
  });
});

document.querySelectorAll(".overlay, .close").forEach((el) => {
  el.addEventListener("click", closeModel);

  const isVideoModal = el.closest(".video-modal");
  if (isVideoModal) {
    document.getElementById("iframe1").src = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const textSlides = document.querySelectorAll(".hero-usp-slider .usp-slide");

  const imageSlides = document.querySelectorAll(
    ".usp-image-slider .usp-image-slide",
  );

  if (!textSlides.length || textSlides.length !== imageSlides.length) {
    return;
  }

  let currentIndex = 0;
  const interval = 3000;

  function changeSlide() {
    const previousIndex = currentIndex;
    const nextIndex = (currentIndex + 1) % textSlides.length;

    textSlides[previousIndex].classList.remove("active");

    textSlides[nextIndex].classList.add("active");

    imageSlides[previousIndex].classList.remove("active");

    imageSlides[nextIndex].classList.add("active");

    currentIndex = nextIndex;
  }

  setInterval(changeSlide, interval);
});
