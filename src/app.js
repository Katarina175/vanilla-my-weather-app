function displayTemperature (response){
    let temperatureElement = document.querySelector("#current-weather");
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#weather-saying");
    let currentDescription = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    humidityElement.innerHTML = response.data.main.humidity;
    descriptionElement.innerHTML = `Today: ${currentDescription}`;
    cityElement.innerHTML = response.data.name;
    console.log(response);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
}


let apiKey = "b855a19b8fb3b4c4426ec0e293bf081b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=imperial&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);

