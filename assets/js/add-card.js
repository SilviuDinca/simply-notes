let selectedColor = "has-background-info";

const urlParams = new URLSearchParams(window.location.search);
const cardIndex = urlParams.get("cardIndex");

const saveCardButtonNode = document.querySelector(".save-card-button");
const colorNodes = document.querySelectorAll(".color");
const infoColor = document.querySelector(".is-info");
const warningColor = document.querySelector(".is-warning");
const dangerColor = document.querySelector(".is-danger");
const successColor = document.querySelector(".is-success");
const header = document.querySelector(".title");
const cardTitleNode = document.querySelector(".card-title");

getStorageTheme();

infoColor.addEventListener("click", function () {
  selectedColor = "has-background-info has-text-white";
  header.className = "title has-text-info";
});
warningColor.addEventListener("click", function () {
  selectedColor = "has-background-warning";
  header.className = "title has-text-warning";
});
dangerColor.addEventListener("click", function () {
  selectedColor = "has-background-danger has-text-white";
  header.className = "title has-text-danger";
});
successColor.addEventListener("click", function () {
  selectedColor = "has-background-success has-text-white";
  header.className = "title has-text-success";
});

saveCardButtonNode.addEventListener("click", saveCard);

function saveCard() {
  const titleHelpNode = document.querySelector(".title-help");
  if (cardTitleNode.value === "") {
    titleHelpNode.className = "title-help help is-danger is-block";
  } else {
    titleHelpNode.className = "is-hidden";
    if (cardIndex === null) {
      const cardsStringArray = localStorage.getItem("cards") || "[]";
      const cardsArray = JSON.parse(cardsStringArray);
      cardsArray.push(createCardObject());

      localStorage.setItem("cards", JSON.stringify(cardsArray));
      window.location.href = "./index.html";
    } else {
      const cardsStringArray = localStorage.getItem("cards") || "[]";
      const cardsArray = JSON.parse(cardsStringArray);
      cardsArray[cardIndex] = createCardObject();
      localStorage.setItem("cards", JSON.stringify(cardsArray));
      window.location.href = "./index.html";
    }
  }
}

function createCardObject() {
  const cardBodyNode = document.querySelector(".card-body");

  const cardObject = {
    title: cardTitleNode.value,
    body: cardBodyNode.value,
    color: selectedColor,
    date: new Date(),
  };
  return cardObject;
}

if (cardIndex !== null) {
  const cardsStringArray = localStorage.getItem("cards") || "[]";
  const cardsArray = JSON.parse(cardsStringArray);
  const editedCard = cardsArray[cardIndex];

  const titleNode = document.querySelector(".card-title");
  titleNode.value = editedCard.title;
  const bodyNode = document.querySelector(".card-body");
  bodyNode.value = editedCard.body;
  const colorNode = document.querySelector(".title");
  if (editedCard.color == "has-background-warning") {
    colorNode.className = "title has-text-warning";
    selectedColor = "has-background-info";
  }
  if (editedCard.color == "has-background-info has-text-white") {
    colorNode.className = "title has-text-info";
    selectedColor = "has-background-info has-text-white";
  }
  if (editedCard.color == "has-background-success has-text-white") {
    colorNode.className = "title has-text-success";
    selectedColor = "has-background-success has-text-white";
  }
  if (editedCard.color == "has-background-danger has-text-white") {
    colorNode.className = "title has-text-danger";
    selectedColor = "has-background-danger has-text-white";
  }
}

function getStorageTheme() {
  const theme = localStorage.getItem("theme");
  const sal = document.querySelector(".sal");
  if (theme === null) {
    sal.className = "mynotes-light";
  } else {
    const backButtonNode = document.querySelector(".back-button");
    if (theme === "mynotes-light") {
      sal.className = "mynotes-light";
      backButtonNode.className = "back-button button is-light is-primary mr-3";
    }
    if (theme === "mynotes-dark") {
      sal.className = "mynotes-dark";
      backButtonNode.className = "back-button button is-dark mr-3";
    }
  }
}
