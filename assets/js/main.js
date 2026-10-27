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

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const parent = header.closest(".accordion");
    document.querySelectorAll(".accordion").forEach((acc) => {
      if (acc !== parent) {
        acc.classList.remove("open");
        const t = acc.querySelector(".toggle");
        if (t) t.innerHTML = '<img src="assets/icon/plus.svg" alt="">';
      }
    });
    parent.classList.toggle("open");
    const toggle = header.querySelector(".toggle");
    if (toggle)
      toggle.innerHTML = parent.classList.contains("open")
        ? '<img src="assets/icon/minus.svg" alt="">'
        : '<img src="assets/icon/plus.svg" alt="">';
  });
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

// ─── EMI Calculator ──────────────────────────────────────────────────────────
(function initEmiCalculator() {
  const loanRange = document.getElementById("loanAmount");
  const rateRange = document.getElementById("interestRate");
  const tenureRange = document.getElementById("tenure");

  const loanInput = document.getElementById("loanAmountInput");
  const rateInput = document.getElementById("interestRateInput");
  const tenureInput = document.getElementById("tenureInput");

  const emiResult = document.getElementById("emiResult");
  const bLoan = document.getElementById("bLoan");
  const bInterest = document.getElementById("bInterest");
  const bTotal = document.getElementById("bTotal");
  const canvas = document.getElementById("emiDonut");

  if (
    !loanRange ||
    !rateRange ||
    !tenureRange ||
    !loanInput ||
    !rateInput ||
    !tenureInput ||
    !emiResult ||
    !bLoan ||
    !bInterest ||
    !bTotal ||
    !canvas
  ) {
    return;
  }

  // ─── Canvas setup (HiDPI support) ──────────────────────────────────────────
  const ctx = canvas.getContext("2d");

  const W = 350;
  const H = 180;
  const DPR = window.devicePixelRatio || 1;

  canvas.width = W * DPR;
  canvas.height = H * DPR;

  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;

  ctx.scale(DPR, DPR);

  // ─── Chart geometry ────────────────────────────────────────────────────────
  const CX = W / 2;
  const CY = H - 20;
  const RADIUS = 136;
  const LINE_W = 47;

  const START_ANG = Math.PI;
  const END_ANG = Math.PI * 2;

  const COLOR_TRACK = "#D9D9D9";
  const COLOR_INTEREST = "#D9D9D9";
  const COLOR_PRIN = "#5E9423";

  // ─── Animation state ───────────────────────────────────────────────────────
  let currentFraction = 0;
  let animationFrame = null;

  const ANIM_MS = 700;

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // ─── Draw semicircular donut ───────────────────────────────────────────────
  function drawDonut(fraction) {
    ctx.clearRect(0, 0, W, H);

    fraction = Math.max(0, Math.min(1, fraction));

    const principalEnd = START_ANG + fraction * Math.PI;

    ctx.lineWidth = LINE_W;
    ctx.lineCap = "butt";

    // 1. Full semicircular background track
    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, START_ANG, END_ANG);
    ctx.strokeStyle = COLOR_TRACK;
    ctx.stroke();

    // 2. Interest portion (grey, right side)
    if (fraction < 1) {
      ctx.beginPath();
      ctx.arc(CX, CY, RADIUS, principalEnd, END_ANG);
      ctx.strokeStyle = COLOR_INTEREST;
      ctx.stroke();
    }

    // 3. Principal portion (green, left side)
    if (fraction > 0) {
      ctx.beginPath();
      ctx.arc(CX, CY, RADIUS, START_ANG, principalEnd);
      ctx.strokeStyle = COLOR_PRIN;
      ctx.stroke();
    }
  }

  // ─── Animate chart smoothly ────────────────────────────────────────────────
  function animateTo(targetFraction) {
    if (animationFrame !== null) {
      cancelAnimationFrame(animationFrame);
    }

    const from = currentFraction;
    const to = Math.max(0, Math.min(1, targetFraction));

    let startTime = null;

    function step(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / ANIM_MS, 1);

      const eased = easeInOut(progress);

      currentFraction = from + (to - from) * eased;

      drawDonut(currentFraction);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        currentFraction = to;
        animationFrame = null;
      }
    }

    animationFrame = requestAnimationFrame(step);
  }

  // ─── Format Indian currency ────────────────────────────────────────────────
  function formatINR(value) {
    return "₹ " + Math.round(value).toLocaleString("en-IN");
  }

  // ─── Update slider progress ────────────────────────────────────────────────
  function updateTrackFill(rangeEl) {
    const min = parseFloat(rangeEl.min) || 0;
    const max = parseFloat(rangeEl.max) || 100;
    const value = parseFloat(rangeEl.value) || 0;

    const percentage = max === min ? 0 : ((value - min) / (max - min)) * 100;

    rangeEl.style.setProperty("--val", `${percentage.toFixed(2)}%`);
  }

  // ─── Calculate EMI ─────────────────────────────────────────────────────────
  function calculate() {
    const P = parseFloat(loanRange.value);
    const annualRate = parseFloat(rateRange.value);
    const years = parseFloat(tenureRange.value);

    if (
      !Number.isFinite(P) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(years) ||
      P <= 0 ||
      years <= 0 ||
      annualRate < 0
    ) {
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    let emi;

    if (monthlyRate === 0) {
      emi = P / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);

      emi = (P * monthlyRate * factor) / (factor - 1);
    }

    const totalPayable = emi * months;
    const totalInterest = totalPayable - P;
    const principalFraction = totalPayable > 0 ? P / totalPayable : 1;

    // Update displayed values
    emiResult.textContent = formatINR(emi);
    bLoan.textContent = formatINR(P);
    bInterest.textContent = formatINR(totalInterest);
    bTotal.textContent = formatINR(totalPayable);

    // Animate chart according to principal / total payable
    animateTo(principalFraction);
  }

  // ─── Range slider → input field ────────────────────────────────────────────
  function onRange(rangeEl, inputEl) {
    rangeEl.addEventListener("input", function () {
      inputEl.value = rangeEl.value;

      updateTrackFill(rangeEl);
      calculate();
    });
  }

  // ─── Input field → range slider ────────────────────────────────────────────
  function onInput(inputEl, rangeEl) {
    inputEl.addEventListener("input", function () {
      const rawValue = inputEl.value.trim();

      if (rawValue === "") {
        return;
      }

      const value = Number(rawValue);

      if (!Number.isFinite(value)) {
        return;
      }

      const min = Number(rangeEl.min);
      const max = Number(rangeEl.max);

      const clamped = Math.min(Math.max(value, min), max);

      rangeEl.value = String(clamped);
      inputEl.value = String(clamped);

      updateTrackFill(rangeEl);
      calculate();
    });

    inputEl.addEventListener("change", function () {
      const min = Number(rangeEl.min);
      const max = Number(rangeEl.max);
      const value = Number(inputEl.value);

      const clamped = Number.isFinite(value)
        ? Math.min(Math.max(value, min), max)
        : Number(rangeEl.value);

      rangeEl.value = String(clamped);
      inputEl.value = String(clamped);

      updateTrackFill(rangeEl);
      calculate();
    });
  }

  // ─── Bind events ───────────────────────────────────────────────────────────
  onRange(loanRange, loanInput);
  onRange(rateRange, rateInput);
  onRange(tenureRange, tenureInput);

  onInput(loanInput, loanRange);
  onInput(rateInput, rateRange);
  onInput(tenureInput, tenureRange);

  // ─── Initialize ────────────────────────────────────────────────────────────
  [loanRange, rateRange, tenureRange].forEach(updateTrackFill);

  loanInput.value = loanRange.value;
  rateInput.value = rateRange.value;
  tenureInput.value = tenureRange.value;

  calculate();
})();
