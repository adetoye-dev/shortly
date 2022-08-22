const primaryNav = document.querySelector(".primary-navigation");
const navMenuBtn = document.querySelector("#menu-btn");
const navMenuIcon = document.querySelector("#menu-icon");
const input = document.querySelector("#enter-link-input");
const form = document.querySelector("#enter-link-form");
const linksContainer = document.querySelector(".shortened-links");
const linkListTemplate = document.querySelector("#shortened-url-template");

//navigation control
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

//shortened list item declarations
const shortenedLinkList = [];

//fetch data from api
const fetchData = async (url) => {
  const data = await fetch("https://api.shrtco.de/v2/shorten", {
    method: "POST",
    body: new URLSearchParams({
      url: url,
    }),
  }).then((response) => response.json());

  return data;
};

//form was submitted
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newLink = await makeListItem(input.value);
  input.value = "";
  shortenedLinkList.push(newLink);
  console.log(newLink);
  console.log(shortenedLinkList);

  renderList();
});

//make list item
const makeListItem = async (original_url) => {
  let short = await fetchData(original_url);
  let linkData = {
    original_url: original_url,
    id: Date.now().toString(),
    shortenedURL: short.result.full_short_link,
  };

  return linkData;
};

//render list item
const renderList = () => {
  clearElements(linksContainer);
  shortenedLinkList.map((listItem) => {
    const list = document.importNode(linkListTemplate.content, true);
    const originalURL = list.querySelector(".original-url");
    originalURL.innerText = listItem.original_url;

    const shortenedLink = list.querySelector(".shortened-link");
    shortenedLink.innerText = listItem.shortenedURL;

    linksContainer.appendChild(list);
  });
};

const clearElements = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
