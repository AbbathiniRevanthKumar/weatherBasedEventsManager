import { getGeoLocation } from "./geolocation.js";

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
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=8&appid=8eb104a215780c50c17b3abed6534689&lang=en`;

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

export function fetchForecastData() {
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
