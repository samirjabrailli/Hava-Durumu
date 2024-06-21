const hava = document.getElementById("hava");
const getWeatherButton = document.getElementById("getWeather");
const weatherInfo = document.getElementById("weatherInfo");
const ApiKey = "85e899c19847f3555e3ad1a0a76c1e1b";

getWeatherButton.addEventListener("click", () => {
    const city = hava.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert("Could not fetch weather data. Please try again.");
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}
