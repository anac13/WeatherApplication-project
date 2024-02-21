function currentWeather(
  city,
  temperature,
  description,
  humidity,
  wind_speed,
  date,
  icon
) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let wind_speedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity} %`;
  wind_speedElement.innerHTML = `${wind_speed} Km/h`;
  dateElement.innerHTML = date;
  iconElement.innerHTML = icon;
}

function weatherData(response) {
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind_speed = response.data.wind.speed;

  let date = new Date(response.data.time * 1000);
  date = formaDate(date);

  let icon = `<img
    src="${response.data.condition.icon_url}"
    alt=""
    class="weather-app-icon"
  />`;

  currentWeather(
    city,
    temperature,
    description,
    humidity,
    wind_speed,
    date,
    icon
  );
}

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
  return `${day} ${hours} : ${minutes}`;
}

function searchCity(city) {
  let apiKey = "b9of4f791t3095ebe30890c6aaeec246";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherData);
  getForecast(apiKey, city);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

//Apartado del pronostico

function getForecast(apiKey, city) {
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="weather-forecast-day">
         <div class="weather-forecast-date">Sat</div>
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
