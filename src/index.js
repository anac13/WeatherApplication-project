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
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

//Apartado del pronostico
function displayForecast() {
  let forecast = document.querySelector("#weather-forecast");
  forecast.innerHTML = `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">Thu</div>
      <div class="weather-forecast-icon">🌒</div>
        <div class="weather-forecast-temperature">
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">
              <strong>15</strong>
            </span>
            <span class="weather-forecast-temperature-min">18</span>
         </div>
       </div>
  </div>
  `;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
