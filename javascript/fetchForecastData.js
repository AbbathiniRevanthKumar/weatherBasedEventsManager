import { fetchForecastData } from "./fetchForecastApi.js";
import { icons } from "./icons.js";
const data = await fetchForecastData();

await data.list.forEach((item) => {
  let time = dtTexttoTime(item.dt_txt);
  let temp = parseInt(item.main.temp - 273.15);
  let src = icons[item.weather[0].id].img;
  createElement(time, temp,src);
});

function createElement(time, tem,src) {
  const todaysForecast = document.querySelector(".forecasts");

  let element = document.createElement("article");
  element.classList.add("item");

  let h4 = document.createElement("h4");
  h4.innerHTML = time;
  h4.classList.add("h4");
  element.appendChild(h4);

  let icon = document.createElement("img");
  icon.setAttribute("src",src);
  icon.classList.add("icon");
  element.appendChild(icon);

  let temp = document.createElement("div");
  temp.innerHTML = tem + "°";
  temp.classList.add("temp");
  element.appendChild(temp);

  todaysForecast.appendChild(element);
}


  
function dtTexttoTime(date) {
  let [datePart, timePart] = date.split(" ");
  timePart = parseInt(timePart);
  if (timePart == 12) {
    return `${timePart}:00 PM`;
  }
  if (timePart > 12) {
    timePart = timePart % 12;
    return `${timePart}:00 PM`;
  }
  return `${timePart}:00 AM`;
}


