const toggle = document.getElementById("modeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggle.textContent = "Switch to Light";
  } else {
    toggle.textContent = "Switch to Dark";
  }
});
