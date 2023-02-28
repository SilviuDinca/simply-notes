const DateTime = luxon.DateTime;

let cards = document.querySelector(".cards-container");
const toggleSwitch = document.querySelector(".switch");
const sal = document.querySelector(".sal");

getStorageTheme();

toggleSwitch.addEventListener("click", function () {
  if (toggleSwitch.checked === true) {
    sal.className = "mynotes-dark";
    localStorage.setItem("theme", "mynotes-dark");
  } else {
    sal.className = "mynotes-light";
    localStorage.setItem("theme", "mynotes-light");
  }
});

function createCard(card, index) {
  const column = document.createElement("div");
  const date = DateTime.fromISO(card.date).toFormat("ff");
  column.className = "column is-4";
  column.innerHTML = `
      <div class="card-theme card mb-1">
        <header class="card-header is-family-secondary">
        <p class="card-header-title ${card.color}">${card.title}</p>
          <span class="${card.color} card-header-icon" aria-label="more options">
            <span class="icon is-small is-right">
              <i class="fas fa-trash-alt"></i>
            </span>
          </span>
        </header>
        <a class="text-color" href="./add-card.html?cardIndex=${index}">
          <div class="card-content">
            <pre class="card-con content is-family-sans-serif is-size-6">${card.body}</pre>
            <p class="has-text-grey-light">${date}</p>
          </div>
        </a>
      </div>
`;
  return column;
}

function showCards() {
  const cardsStringArray = localStorage.getItem("cards") || "[]";
  const cardsArray = JSON.parse(cardsStringArray);
  for (let i = 0; i < cardsArray.length; i++) {
    cards.appendChild(createCard(cardsArray[i], i));
  }
  addClickEvent();
}

function addClickEvent() {
  const deleteButtonNodes = document.querySelectorAll(".card-header-icon");
  for (let i = 0; i < deleteButtonNodes.length; i++) {
    deleteButtonNodes[i].addEventListener("click", function () {
      deleteCard(i);
    });
  }
}

function deleteCard(index) {
  const cardsStringArray = localStorage.getItem("cards");
  const cardsArray = JSON.parse(cardsStringArray);
  cardsArray.splice(index, 1);
  localStorage.setItem("cards", JSON.stringify(cardsArray));
  cards.innerHTML = "";
  showCards();
  noTask();
}

function noTask() {
  const taskAdded = document.querySelector(".task");
  if (cards.children.length == 0) {
    taskAdded.style.display = "block";
  } else {
    taskAdded.style.display = "none";
  }
}

function getStorageTheme() {
  const theme = localStorage.getItem("theme");
  const sal = document.querySelector(".sal");
  if (theme === null) {
    sal.className = "mynotes-light";
  } else {
    if (theme === "mynotes-light") {
      sal.className = "mynotes-light";
    }
    if (theme === "mynotes-dark") {
      toggleSwitch.checked = true;
      sal.className = "mynotes-dark";
    }
  }
}

showCards();
noTask();
