import { fetchForecastAllData } from "./eventsApi.js";

const data = await fetchForecastAllData();

const eventDate = document.getElementById("eventDate");

function dtTexttoDate(date) {
  let [datePart, timePart] = date.split(" ");
  let d = datePart.split("-");
  return d[2] + "-" + d[1] + "-" + d[0];
}
const datelist = [];
await data.list.forEach((item) => {
  if (!datelist.includes(dtTexttoDate(item.dt_txt))) {
    datelist.push(dtTexttoDate(item.dt_txt));
  }
});

datelist.forEach((item) => {
  createDateOption(item);
});

function createDateOption(value) {
  const ele = document.createElement("option");
  const atr = document.createAttribute("value");
  atr.value = value;
  ele.setAttributeNode(atr);
  ele.innerHTML = value;
  eventDate.appendChild(ele);
}




