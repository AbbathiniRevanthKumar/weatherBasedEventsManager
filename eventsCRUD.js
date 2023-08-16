import { icons } from "./icons.js";
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

form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearAllItems);
window.addEventListener("DOMContentLoaded", setUpItems);

function addItem(e) {
  e.preventDefault();
  const id = new Date().getTime().toString();
  let icon = getDateValues();
  if(icon==0)
  {
    displayAlert("Please Enter Future Timings !","alert-danger");
    return;
  }
  let value = [
    itemName.value,
    itemDate.value,
    itemTime.value,
    itemWeather.value,
    icons[icon].img,
  ];
  if (value && !editFlag) {
    createElement(value, id);
    displayAlert("Event is Created!", "alert-green");
    setTodefault();
    addToLocalStorage(id, value);
  } else if (value && editFlag) {
    editElement[0].innerHTML = itemName.value;
    editElement[2].innerHTML = itemWeather.value;
    editElement[3].innerHTML = itemDate.value;
    editElement[4].innerHTML = itemTime.value;
    displayAlert("Event Edited!", "alert-green");
    editLocalStorage(editID, value);
    setTodefault();
  }
}

function displayAlert(text, type) {
  alert.innerHTML = text;
  alert.classList.add(type);
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(type);
  }, 1000);
}

function createElement(value, id) {
  const element = document.createElement("div");
  const atr = document.createAttribute("data-id");
  atr.value = id;
  element.setAttributeNode(atr);
  element.classList.add("item");
  element.innerHTML = `<div class="name i">${value[0]}</div>
    <div class="expectedWeather i"><h4>Expected Weather</h4><img src=${value[4]}></div>
    <div class="userWeather i">${value[3]}</div>
    <div class="date i">${value[1]}</div>
    <div class="time i">${value[2]}</div>
    <div class="btn-container">
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = element.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  list.appendChild(element);
  clearBtn.classList.remove("hide");
  container.classList.add("showContainer");
  container.classList.remove("emptyContainer");
  desc.innerHTML = "";
  // getDateItems();
}

function deleteItem(e) {
  const ele = e.currentTarget.parentElement.parentElement;
  const id = ele.dataset.id;
  list.removeChild(ele);
  if (list.children.length == 0) {
    container.classList.remove("showContainer");
    container.classList.add("emptyContainer");
    desc.innerHTML = "Events Are Empty!Add Events";
    clearBtn.classList.add("hide");
  }
  displayAlert("Event Deleted!", "alert-danger");
  setTodefault();
  removeFromLocalStorage(id);
  // getDateItems();
}

function clearAllItems() {
  const items = document.querySelectorAll(".item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }

  displayAlert("All Events Deleted!", "alert-danger");
  container.classList.remove("showContainer");
  container.classList.add("emptyContainer");
  clearBtn.classList.add("hide");
  desc.innerHTML = "Events Are Empty!Add Events";
  setTodefault();
  localStorage.removeItem("eventsList");
  // getDateItems();
}

function editItem(e) {
  const ele = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.parentElement.children;
  itemName.value = editElement[0].innerHTML;
  itemWeather.value = editElement[2].innerHTML;
  itemDate.value = editElement[3].innerHTML;
  itemTime.value = editElement[4].innerHTML;
  submitBtn.textContent = "Edit Event";
  editFlag = true;
  editID = ele.dataset.id;
  // getDateItems();
}

function setTodefault() {
  itemName.value = "";
  itemDate.value = itemDate.children[0].value;
  itemTime.value = itemTime.children[0].value;
  itemWeather.value = itemWeather.children[0].value;
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Create Event";
}

function addToLocalStorage(id, value) {
  const item = { id, value };
  let items = getLocalStorage();
  items.push(item);
  localStorage.setItem("eventsList", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("eventsList")
    ? JSON.parse(localStorage.getItem("eventsList"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) return item;
  });
  localStorage.setItem("eventsList", JSON.stringify(items));
}

function editLocalStorage(id, value) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });

  localStorage.setItem("eventsList", JSON.stringify(items));
}
// localStorage.clear();

function setUpItems() {
  let items = getLocalStorage();

  if (items.length > 0) {
    items.forEach((item) => {
      createElement(item.value, item.id);
    });
  }
}

const back = document.querySelector(".back");

back.addEventListener("click", () => {
  window.location.href ="https://revanthkumar-github.github.io/weatherBasedEventsManager/";
});

function getGeoLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;

          resolve({ lat, lon });
        },
        (error) => {
          reject("Error getting location : " + error.message);
        }
      );
    } else {
      reject("Error:Geolocation is not supported!");
    }
  });
}

var latitude, longitude;
await getGeoLocation()
  .then((location) => {
    latitude = location.lat;
    longitude = location.lon;
  })
  .catch((error) => {
    console.log(error);
  });

console.log(latitude, longitude);
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8eb104a215780c50c17b3abed6534689`;

async function fetching() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error:Fetching api problem");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function fetchForecastAllData() {
  return new Promise((resolve, reject) => {
    fetching()
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

let data = await fetchForecastAllData();

function getDateValues() {
  let [timepart, p] = itemTime.value.split(" ");
  timepart = timepart.split(":");
  if (p == "PM" && timepart[0] != "12") {
    timepart = parseInt(timepart[0]) + 12 + ":" + timepart[1] + ":" + "00";
  } else if (p == "PM" && timepart[0] == "12") {
    timepart = parseInt(timepart[0]) + ":" + timepart[1] + ":" + "00";
  } else {
    timepart = "0" + parseInt(timepart[0]) + ":" + timepart[1] + ":" + "00";
  }
  let [d, m, y] = itemDate.value.split("-");
  let date = y + "-" + m + "-" + d;
  date = date + " " + timepart;



  for (let i = 0; i < data.list.length; i++) {
    let item = data.list[i];
    if (item.dt_txt === date) {
      return item.weather[0].id;
    }
  }

  return 0;
}

