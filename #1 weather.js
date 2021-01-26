const weather = document.querySelector(".js-weather");
const API_KEY = "20adac4bbd929096e1e355fe11d6461b";
const COORDS = "coords";

function getWeather(lat,lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`).then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude,longitude);
}

function handleGoeError(){
  console.log("Cannot access geo location");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGoeError);
}

function loadCoords(){
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else{
    const parseCoords = JSON.parse(loadedCoords);
    console.log(parseCoords);
    getWeather(parseCoords.latitude,parseCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();
