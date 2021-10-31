let now = new Date();
let h2 = document.querySelector("h2");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let temperature = "17";
let city = "Berlin";
let windElement = "5";
let celsiusTemperature = 0;


h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees | Wind speed: ${windElement}km/h`;
// function search(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-text-input");

//   let h1 = document.querySelector("h2");
//   h2.innerHTML = `${searchInput.value} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature}`;
// }

//Week 5 below

function getForecast(coordinates) {

console.log(coordinates);
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid= ${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response) {
  let windElement = document.querySelector("#wind");
  windElement = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description")
  city = response.data.name;
  let humidityElement = document.querySelector("#humidity");
  let iconELement = document.querySelector("#icon");
  let temperature = document.querySelector("#temp");
  temperature = Math.round(response.data.main.temp);

  celsiusTemperature = response.data.main.temp;

  humidityElement.innerHTML = (response.data.main.humidity);
  descriptionElement.innerHTML = (response.data.weather[0].description);

  iconELement.setAttribute("src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees | Wind speed ${windElement}km/h`;

getForecast(response.data.coord)

}

function displayForecast(response) {

  
  let forecastElement = document.querySelector("#forecast");

let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function displayFahrenheitTemperature(event) {
event.preventDefault();
let fahrenheitTemperature = (14 * 9)/ 5 + 32;
let temperature = document.querySelector("#temperature")
temperature = fahrenheitTemperature;
h2.innerHTML.temperature= fahrenheitTemperature;
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (14 * 9) / 5 + 32;
  temperature = fahrenheitTemperature;
  h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees | Wind speed: ${windElement}km/h`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  temperature = celsiusTemperature;
  h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees | Wind speed: ${windElement}km/h`;
}
let fahrenheit =document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius =document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

displayForecast();
