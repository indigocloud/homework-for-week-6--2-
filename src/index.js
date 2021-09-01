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

let temperature = 17;
let city = "Berlin";

h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees`;

// function search(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-text-input");

//   let h1 = document.querySelector("h2");
//   h2.innerHTML = `${searchInput.value} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature}`;
// }

//Week 5 below

function displayWeatherCondition(response) {
  city = response.data.name;
  temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${city} <div> ${day} ${month} ${date}, ${hour}:${minutes}, ${year}, ${temperature} degrees`;
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

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}
