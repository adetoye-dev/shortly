const primaryNav = document.querySelector(".primary-navigation");
const navMenuBtn = document.querySelector("#menu-btn");
const navMenuIcon = document.querySelector("#menu-icon");
const input = document.querySelector("#enter-link-input");
const form = document.querySelector("#enter-link-form");
const errorMsg = document.querySelector("#error-msg");
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

//local storage key and shortened list items
const LOCAL_STORAGE_LIST_KEY = "shortened.links";
const shortenedLinkList =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

//copy selected link on button click
linksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("copy")) {
    const selectedLink = shortenedLinkList.find(
      (link) => link.id === e.target.id
    );

    copyText(selectedLink.shortenedURL);

    const clickedBtn = document.getElementById(e.target.id);
    clickedBtn.innerText = "Copied";
    clickedBtn.classList.add("copied");
  }
});

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

  if (input.value == "") {
    input.classList.add("input-error-handling");
    errorMsg.style.display = "block";
    return;
  }
  input.classList.remove("input-error-handling");
  errorMsg.style.display = "";

  const newLink = await makeListItem(input.value);
  input.value = "";
  shortenedLinkList.push(newLink);

  saveAndRenderList();
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

    const copyBtn = list.querySelector(".copy-url-btn");
    copyBtn.id = listItem.id;

    linksContainer.appendChild(list);
  });
};

const clearElements = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const saveList = () => {
  localStorage.setItem(
    LOCAL_STORAGE_LIST_KEY,
    JSON.stringify(shortenedLinkList)
  );
};

const saveAndRenderList = () => {
  saveList();
  renderList();
};

//copy text function
const copyText = (input) => {
  let inputElement = document.createElement("input");
  inputElement.setAttribute("value", input);
  document.body.appendChild(inputElement);
  inputElement.select();
  document.execCommand("Copy");
  inputElement.parentNode.removeChild(inputElement);
};

renderList();
