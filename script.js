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

const params = new URLSearchParams({
  url: "https://google.com",
});

const fetchData = async () => {
  const data = await fetch("https://api.shrtco.de/v2/shorten", {
    method: "POST",
    body: params,
  }).then((response) => response.json());

  console.log(data.result.full_short_link);
};

fetchData();
