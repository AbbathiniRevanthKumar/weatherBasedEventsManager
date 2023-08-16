export function getGeoLocation() {
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
//api key 8eb104a215780c50c17b3abed6534689
