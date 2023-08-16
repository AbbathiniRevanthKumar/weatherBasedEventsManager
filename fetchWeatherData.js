import { fetchWeatherData } from "./fetchWeatherApi.js";
import { icons } from "./icons.js";
const data = await fetchWeatherData();


const name = document.querySelector(".name");
const temp = document.querySelector(".currenttemp");
const fl = document.querySelector(".feelslike");
const min = document.querySelector(".min");
const max = document.querySelector(".max");
const speed = document.querySelector(".speed");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const rise = document.querySelector(".rise");
const set = document.querySelector(".set");
const weather = document.querySelector(".weather");

name.innerHTML = data.name;
const t = parseInt(data.main.temp - 273.15);
temp.innerHTML = t+"°";
fl.innerHTML = parseInt(data.main.feels_like -273.15)+"°";
min.innerHTML = parseInt(data.main.temp_min-273.15)+"°";
max.innerHTML = parseInt(data.main.temp_max-273.15)+"°";
pressure.innerHTML = data.main.pressure+" hPa";
speed.innerHTML = data.wind.speed+" Km/h";
humidity.innerHTML = data.main.humidity+"%";
rise.innerHTML = getTime(data.sys.sunrise)+" AM";
set.innerHTML = getTime(data.sys.sunset)+" PM";
weather.innerHTML = data.weather[0].description;

function getTime(timestamp) {
  var date = new Date(timestamp);
  var hours = (date.getHours()-1)%12;
  var min = date.getMinutes();

  return hours+":"+min;
}

const icon = document.getElementById("mainicon");
icon.src = icons[data.weather[0].id].img;

