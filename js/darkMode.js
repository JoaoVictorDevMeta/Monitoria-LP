const darkToggle = document.getElementById("dark-toggler");

darkToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "enabled");
  } else {
    localStorage.setItem("dark-mode", "disabled");
  }
});

window.addEventListener("load", function () {
  if (localStorage.getItem("dark-mode") === "enabled") {
    document.body.classList.add("dark");
  }
});
