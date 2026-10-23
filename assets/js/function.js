function openModel(selector) {
  document
    .querySelectorAll(".modal.is-open, .overlay.is-open")
    .forEach((el) => el.classList.remove("is-open"));

  const modal = document.querySelector(selector);
  const overlay = document.querySelector(".overlay");

  if (modal) modal.classList.add("is-open");
  if (overlay) overlay.classList.add("is-open");

  document.body.classList.add("no-scroll");
}

function closeModel() {
  document
    .querySelectorAll(".modal.is-open, .overlay.is-open")
    .forEach((el) => el.classList.remove("is-open"));

  document.body.classList.remove("no-scroll");
}
