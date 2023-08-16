const alert = document.querySelector(".alert");
const form = document.getElementById("eventForm");
const itemName = document.getElementById("eventName");
const itemDate = document.getElementById("eventDate");
const itemTime = document.getElementById("eventTime");
const itemWeather = document.getElementById("weatherPreference");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const list = document.querySelector(".eventitems");
const container = document.querySelector(".eventcontainer");
const desc = document.querySelector(".desc");

let editElement;
let editFlag = false;
let editID = "";

window.addEventListener("DOMContentLoaded", setUpItems);

function createElement(value, id) {
  const element = document.createElement("div");
  const atr = document.createAttribute("data-id");
  atr.value = id;
  element.setAttributeNode(atr);
  element.classList.add("item");
  element.innerHTML = `<div class="name i">${value[0]}</div>
    <div class="expectedWeather i"><h5>Expected Weather</h5><img src=${value[4]}></div>
    <div class="userWeather i">${value[3]}</div>
    <div class="date i">${value[1]}</div>
    </div>`;

  list.appendChild(element);
  container.classList.add("showContainer");
  container.classList.remove("emptyContainer");
  desc.innerHTML = "";
}

function getLocalStorage() {
  return localStorage.getItem("eventsList")
    ? JSON.parse(localStorage.getItem("eventsList"))
    : [];
}

function setUpItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    for (let i = 0; i < 2; i++) {
      try
      {
        createElement(items[i].value, items[i].id);
      }
      catch(error)
      {
        console.log("Events from Local storage retrievd");
      }
    }
  }
}

const more = document.querySelector(".eventsPage");
more.onclick = () => {
  window.location.href = "../Html/eventPage.html";
};
