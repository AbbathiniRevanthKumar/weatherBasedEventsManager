import { fetchWeatherData } from "./fetchWeatherApi.js";
import { icons } from "./icons.js";
const data = await fetchWeatherData();

const name = document.querySelector(".name");
const temp = document.querySelector(".currenttemp");

name.innerHTML = data.name;
const t = parseInt(data.main.temp - 273.15);
temp.innerHTML = t + "°";

const icon = document.getElementById("mainicon");
icon.src = icons[data.weather[0].id].img;
