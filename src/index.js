//Details of the day's current weather are shown - Se muestra los detalles el clima actual del día
function currentWeather(
  city,
  temperature,
  description,
  humidity,
  wind_speed,
  icon
) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let wind_speedElement = document.querySelector("#wind-speed");

  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity} %`;
  wind_speedElement.innerHTML = `${wind_speed} Km/h`;

  iconElement.innerHTML = icon;
}

//The time zone of the current city is displayed - Se muestra la zona horaria de la ciudad actual
function currentTime(date) {
  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = date;
}

//Extracts the necessary data from the API - Se extrae los datos necesarios de la API
function weatherData(response) {
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind_speed = response.data.wind.speed;
  let longitude = response.data.coordinates.longitude;
  let latitude = response.data.coordinates.latitude;

  searchTimeZone(longitude, latitude);

  let icon = `<img
    src="${response.data.condition.icon_url}"
    alt=""
    class="weather-app-icon"
  />`;

  currentWeather(city, temperature, description, humidity, wind_speed, icon);
}

//The time zone of the current city is generated - Se genera la zona horaria de la ciudad actual
function formaDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[date.getDay()];
  let time = `${day} ${hours} : ${minutes} `;
  currentTime(time);
}

//The time zone is looked up in the API, using the latitude and longitude from the previous API -
//Se busca la zona horaria en la API, usando la latitud y longitud de la API anterior
function searchTimeZone(longitude, latitude) {
  let apikey = "UQ5WNACRROX6";
  let apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apikey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
  axios(apiUrl).then(zoneTime);
}

///Extracts the necessary data from the API - Se extrae los datos necesarios de la API
function zoneTime(response) {
  let timeZone = new Date(response.data.formatted);
  formaDate(timeZone);
  backgroundChange(timeZone);
}

//Searching for the new city in the API - Se busca la nueva ciudad en la API
function searchCity(city) {
  let apiKey = "b9of4f791t3095ebe30890c6aaeec246";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherData);
  getForecast(apiKey, city);
}

//Search engine data is saved - Se guarda el dato del buscador
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
  searchTimeZone(searchInput.value);
}

//Apartado del pronostico

function getForecast(apiKey, city) {
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timetamp) {
  let date = new Date(timetamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let con = days[date.getDay()];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="weather-forecast-day">
         <div class="weather-forecast-date">${formatDay(day.time)} </div>
         <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      
         <div class="weather-forecast-temperature">
           <div class="weather-forecast-temperature">
             <span class="weather-forecast-temperature-max">
               <strong>${Math.round(day.temperature.maximum)}°</strong>
             </span>
             <span class="weather-forecast-temperature-min">${Math.round(
               day.temperature.minimum
             )}°</span>
           </div>
         </div>
       </div>
     `;
    }
  });
  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHTML;
}

//Personalizacion de a app
function backgroundChange(hour) {
  let hours = hour.getHours();

  if (hours <= 8) {
    let image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/116/313/original/sunrise.jpeg?1708622998";
    let backgroundElement = document.getElementById("weather-app");
    backgroundElement.style["background-image"] = `url(${image})`;

    let bodyElement = document.getElementById("app")
    bodyElement.style["backgroundColor"] = "#29204fdc";

  } 
  else if (hours > 8 && hours <= 17) {
    let image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/116/311/original/noon.jpeg?1708622978";
    let backgroundElement = document.getElementById("weather-app");
    backgroundElement.style["background-image"] = `url(${image})`;

    let bodyElement = document.getElementById("app");
    bodyElement.style["backgroundColor"] = "#7DC3CBdc";
  } 
  else if (hours > 17) {
    let image =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/116/312/original/night.jpeg?1708622983";
    let backgroundElement = document.getElementById("weather-app");
    backgroundElement.style["background-image"] = `url(${image})`;

    let bodyElement = document.getElementById("app");
    bodyElement.style["backgroundColor"] = "#bb8497dc";
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
