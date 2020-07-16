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
    descriptionElement.innerHTML = `Today: ${currentDescription}`;
    cityElement.innerHTML = response.data.name;
    console.log(response);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

let city = "New York"
let apiKey = "b855a19b8fb3b4c4426ec0e293bf081b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);

