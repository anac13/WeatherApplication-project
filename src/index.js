function weatherData(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = temperature;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  humidityElement.innerHTML = `${humidity} %`;

  let wind_speedElement = document.querySelector("#wind-speed");
  let wind_speed = response.data.wind.speed;
  wind_speedElement.innerHTML = `${wind_speed} Km/h`;

 
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
