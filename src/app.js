let now = new Date();
  now.getDate();
  
let months = [ 
      "Jan",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
  ];
  let month = months[now.getMonth()];
  
  let date = now.getDate();
  
  let year = now.getFullYear();
  
  let currentDateTime = `${month} ${date}, ${year}`;
  
  let today = document.querySelector("#current-date");
  today.innerHTML = `${currentDateTime}`;

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes< 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;
  

  document.querySelector("#current-time").innerHTML = `${currentTime}`;


function displayTemperature (response){
    let temperatureElement = document.querySelector("#current-weather");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#weather-saying");
    let currentDescription = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
    descriptionElement.innerHTML = `Right now: ${currentDescription}`;
    fahrenheitTemperature = response.data.main.temp;
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
function formatHours(timestamp){
    let forecastDate = new Date(timestamp);
    let forecastHours = forecastDate.getHours();
    if (forecastHours < 10) {
      forecastHours = `0${forecastHours}`;
    }
    let forecastMinutes = forecastDate.getMinutes();
    if (forecastMinutes < 10) {
      forecastMinutes = `0${forecastMinutes}`;
    }
    return `${forecastHours}:${forecastMinutes}`;
}

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
      let forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2">
          <h5>${formatHours(forecast.dt * 1000)}</h5>

          <div class="icons">
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
          </div>

          <div class="weekly-temps-style">
            ${Math.round(forecast.main.temp_max)}°F
          </div>
      </div>`;
    }
}

function search (city) {
    let apiKey = "b855a19b8fb3b4c4426ec0e293bf081b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);

}

function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    console.log(fahrenheitTemperature);
    let celsiusTemperature = Math.round((fahrenheitTemperature - 32) * 5 / 9);
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#current-weather");
    temperatureElement.innerHTML = celsiusTemperature;

}

function displayFahrenheitTemperature(event) {
    event.preventDefault;
    let temperatureElement = document.querySelector("#current-weather");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

}
let fahrenheitTemperature = null;


let form = document.querySelector("#search-box");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);



search("New York");

