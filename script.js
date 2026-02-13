document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     DARK MODE TOGGLE
  ========================== */

  const modeToggle = document.getElementById("modeToggle");

  modeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });


  /* =========================
     PARALLAX WINDOW EFFECT
  ========================== */

  const windowLayer = document.querySelector(".window-layer");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    // Adjust this number to control speed
    windowLayer.style.transform = `translateY(${scrollY * 0.3}px)`;
  });

});
