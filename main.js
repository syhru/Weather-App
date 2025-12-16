const apiKey = ""; // Replace with your actual API from OpenWeatherMap.

// Elements
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const iconElement = document.getElementById("weather-icon");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const forecastGrid = document.getElementById("forecast-grid");

const searchInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const errorContainer = document.getElementById("error-container");

// Custom Error Handler
function showError(message) {
  // Clear any existing errors
  errorContainer.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = "error-toast";
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    <span>${message}</span>
  `;

  errorContainer.appendChild(toast);

  // Auto hide after 3 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 500); // Wait for animation
  }, 3000);
}

// Custom SVG Icons
const weatherIcons = {
  clear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FDB813"><path d="M256 104c-83.8 0-152 68.2-152 152s68.2 152 152 152 152-68.2 152-152-68.2-152-152-152zm0 256c-57.3 0-104-46.7-104-104s46.7-104 104-104 104 46.7 104 104-46.7 104-104 104zm0-280c-13.3 0-24-10.7-24-24V32c0-13.3 10.7-24 24-24s24 10.7 24 24v24c0 13.3-10.7 24-24 24zm0 408c-13.3 0-24 10.7-24 24v24c0 13.3 10.7 24 24 24s24-10.7 24-24v-24c0-13.3-10.7-24-24-24zM104 256c0-13.3-10.7-24-24-24H56c-13.3 0-24 10.7-24 24s10.7 24 24 24h24c13.3 0 24-10.7 24-24zm352 0c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24s-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24zM132.5 132.5c-9.4-9.4-24.6-9.4-33.9 0L84.9 146.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l13.6-13.6c9.4-9.4 9.4-24.6 0-33.9zm247 247c-9.4-9.4-24.6-9.4-33.9 0L332 393.1c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l13.6-13.6c9.4-9.4 9.4-24.6 0-33.9zM148.5 393.1l-13.6 13.6c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l13.6-13.6c9.4-9.4 9.4-24.6 0-33.9-9.4 9.4-24.6 9.4-33.9 0zM393.1 148.5l13.6-13.6c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-13.6 13.6c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0z"/></svg>`,
  cloud: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#d3d3d3"><path d="M189.9 174.2c2.7-8.9 4.1-18.4 4.1-28.2 0-51.5-41.7-93.3-93.3-93.3S7.5 94.5 7.5 146c0 9.8 1.4 19.3 4.1 28.2C4.5 183.3 0 193.2 0 204c0 37.6 30.4 68 68 68h128c37.6 0 68-30.4 68-68 0-10.8-4.5-20.7-11.6-29.8zM416 128c-59.2 0-109.1 38.6-128.4 91.6C265.5 214.8 249.2 210.3 232 210.3c-2.3 0-4.6.1-6.8.2-12.2-46.9-55.2-81.5-106.6-81.5-60.8 0-110 49.2-110 110 0 8.4.9 16.5 2.7 24.4C4.2 272.7 0 283.8 0 296c0 48.6 39.4 88 88 88h328c53 0 96-43 96-96s-43-96-96-96z"/></svg>`,
  rain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4a90e2"><path d="M96 224c-53 0-96 43-96 96s43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96c-5.3 0-10.5.4-15.6 1.2C396.2 150.8 323.7 96 240 96c-67.4 0-127 35.3-162.7 88.5C72 185.3 67 186 62 186c-1.3 0-2.6 0-3.9-.1C85.8 206 96 224 96 224zm6.6 242.1c2-12.7 13.9-21.3 26.6-19.3 2.1.3 4.2.7 6.2 1.4L101.4 478c-2 12.7-13.9 21.3-26.6 19.3-12.7-2-21.3-13.9-19.3-26.6l37.1-224.6zm106.9 14.2c-2 12.7-13.9 21.3-26.6 19.3-12.7-2-21.3-13.9-19.3-26.6l37.1-224.6c2-12.7 13.9-21.3 26.6-19.3 12.7 2 21.3 13.9 19.3 26.6l-37.1 224.6zm144-14.2c-2 12.7-13.9 21.3-26.6 19.3-12.7-2-21.3-13.9-19.3-26.6l37.1-224.6c2-12.7 13.9-21.3 26.6-19.3 12.7 2 21.3 13.9 19.3 26.6l-37.1 224.6z"/></svg>`,
  snow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M448 32h-16c-8.8 0-16 7.2-16 16v24.6c-13-11.8-30.1-19.2-48.9-19.9-28.5-1.1-53.9 15.3-66.2 39.7-4.2-2.3-9-3.7-14.1-3.7-13.2 0-24.5 8.1-29.3 19.6-9.4-14.5-25.5-24-43.9-24-18.4 0-34.5 9.5-43.9 24-4.8-11.5-16.1-19.6-29.3-19.6-5.1 0-9.9 1.4-14.1 3.7-12.3-24.4-37.8-40.8-66.2-39.7C41.7 54.2 24.6 61.6 11.6 73.4V48c0-8.8-7.2-16-16-16H4c-8.8 0-16 7.2-16 16v160c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16h-42c22.8-21.5 54-34 88-34s65.2 12.5 88 34h-42c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V48c0-8.8-7.2-16-16-16zm-56 368c-8.8 0-16 7.2-16 16v24.6c-13-11.8-30.1-19.2-48.9-19.9-28.5-1.1-53.9 15.3-66.2 39.7-4.2-2.3-9-3.7-14.1-3.7-13.2 0-24.5 8.1-29.3 19.6-9.4-14.5-25.5-24-43.9-24-18.4 0-34.5 9.5-43.9 24-4.8-11.5-16.1-19.6-29.3-19.6-5.1 0-9.9 1.4-14.1 3.7-12.3-24.4-37.8-40.8-66.2-39.7-18.9 1.1-36 8.5-48.9 20.3V416c0-8.8-7.2-16-16-16H4c-8.8 0-16 7.2-16 16v160c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-16c0-8.8-7.2-16-16-16h-42c22.8-21.5 54-34 88-34s65.2 12.5 88 34h-42c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V416c0-8.8-7.2-16-16-16z"/></svg>`,
  thunder: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FDB813"><path d="M96 224c-53 0-96 43-96 96s43 96 96 96h320c53 0 96-43 96-96s-43-96-96-96c-5.3 0-10.5.4-15.6 1.2C396.2 150.8 323.7 96 240 96c-67.4 0-127 35.3-162.7 88.5C72 185.3 67 186 62 186c-1.3 0-2.6 0-3.9-.1C85.8 206 96 224 96 224zm145.7 205.7l29.4-78.5-56.9 28.5c-4.3 2.1-9.2-1.8-8.2-6.5l24.4-122c.9-4.3 6.9-5.1 8.9-.9l67 134c1.8 3.7-1.7 8-5.6 6l-29.4 14.7 29.4 10.3c3.2 1.1 4.5 5 2.6 7.8L281 447.4c-3.1 4.6-10.1 2.3-8.8-3.1 0 0 7.8-19.6-30.5-14.6z"/></svg>`,
  mist: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#d3d3d3"><path d="M24 168c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H424c13.3 0 24-10.7 24-24s-10.7-24-24-24H24zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"/></svg>`,
  default: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#d3d3d3"><path d="M416 128c-59.2 0-109.1 38.6-128.4 91.6C265.5 214.8 249.2 210.3 232 210.3c-2.3 0-4.6.1-6.8.2-12.2-46.9-55.2-81.5-106.6-81.5-60.8 0-110 49.2-110 110 0 8.4.9 16.5 2.7 24.4C4.2 272.7 0 283.8 0 296c0 48.6 39.4 88 88 88h328c53 0 96-43 96-96s-43-96-96-96z"/></svg>`,
};

function getCustomIcon(weatherMain) {
  const main = weatherMain.toLowerCase();
  if (main.includes("clear")) return weatherIcons.clear;
  if (main.includes("cloud")) return weatherIcons.cloud;
  if (main.includes("rain") || main.includes("drizzle"))
    return weatherIcons.rain;
  if (main.includes("snow")) return weatherIcons.snow;
  if (main.includes("thunder")) return weatherIcons.thunder;
  if (
    main.includes("mist") ||
    main.includes("fog") ||
    main.includes("haze") ||
    main.includes("smoke")
  )
    return weatherIcons.mist;
  return weatherIcons.default;
}

// update UI
function updateUI(data) {
  locationElement.textContent = `${data.name}, ${data.sys.country}`;
  temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionElement.textContent = data.weather[0].description;
  humidityElement.textContent = `${data.main.humidity}%`;
  windSpeedElement.textContent = `${data.wind.speed} m/s`;

  const weatherMain = data.weather[0].main;
  iconElement.innerHTML = getCustomIcon(weatherMain);
}

// update Forecast
function updateForecast(list) {
  forecastGrid.innerHTML = ""; // Clear existing

  // Filter for one data point per day (e.g., at 12:00 PM)
  // The API returns 3-hour intervals
  const dailyData = list.filter((item) => item.dt_txt.includes("12:00:00"));

  // Take the first 5 days
  dailyData.slice(0, 5).forEach((day) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(day.main.temp);
    const weatherMain = day.weather[0].main;
    const iconSvg = getCustomIcon(weatherMain);

    const forecastItem = document.createElement("div");
    forecastItem.className = "forecast-item";
    forecastItem.innerHTML = `
      <span class="forecast-day">${dayName}</span>
      <div class="forecast-icon">${iconSvg}</div>
      <span class="forecast-temp">${temp}°C</span>
    `;
    forecastGrid.appendChild(forecastItem);
  });
}

// Fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  await fetchWeather(weatherURL);
  await fetchForecast(forecastURL);
}

// Fetch weather by city name
async function getWeatherByCity(city) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  await fetchWeather(weatherURL);
  await fetchForecast(forecastURL);
}

// Core fetch function for Weather
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

// Core fetch function for Forecast
async function fetchForecast(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Forecast data not found");
    const data = await response.json();
    updateForecast(data.list);
  } catch (error) {
    console.error("Forecast Error:", error);
  }
}

// Geolocation Handler
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherByCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        // Default to Jakarta if location denied
        console.warn("Location denied, defaulting to Jakarta");
        getWeatherByCity("Jakarta");
      }
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
}

// Event Listeners
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      getWeatherByCity(city);
    }
  }
});

// Initialize
window.onload = getLocation;
