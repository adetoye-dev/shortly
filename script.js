const primaryNav = document.querySelector(".primary-navigation");
const navMenuBtn = document.querySelector("#menu-btn");
const navMenuIcon = document.querySelector("#menu-icon");

navMenuBtn.addEventListener("click", () => {
  if (primaryNav.style.display == "flex") {
    primaryNav.style.display = "";
    navMenuIcon.classList.remove("fa-times");
    navMenuIcon.classList.add("fa-bars");
  } else {
    primaryNav.style.display = "flex";
    navMenuIcon.classList.remove("fa-bars");
    navMenuIcon.classList.add("fa-times");
  }
});
