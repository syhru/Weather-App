# Weather App

A modern, interactive weather application built with vanilla JavaScript, HTML, and CSS. It features a sleek glassmorphism UI/UX, dark mode, 5-day forecasts, and custom SVG icons.

## Features

- **Real-time Weather Data**: Fetches current weather data using the OpenWeatherMap API.
- **City Search**: Search for weather conditions in any city worldwide.
- **Geolocation Support**: Automatically detects your location on startup (defaults to Jakarta if denied).
- **5-Day Forecast**: Displays weather trends for the upcoming days.
- **Detailed Metrics**: specific cards for Humidity and Wind Speed.
- **Modern UI**:
  - **Glassmorphism**: premium semi-transparent card design with blur effects.
  - **Dark Mode**: Optimized dark theme for visual comfort.
  - **Dynamic Backgrounds**: Smooth animated gradients.
  - **Responsive Design**: Fully functional on desktop and mobile devices.
- **Custom Assets**: High-quality SVG icons for various weather conditions (Clear, Rain, Snow, Thunderstorm, Mist/Fog).
- **Enhanced UX**: Custom toast notifications for errors instead of native browser alerts.

## Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Flexbox, Grid, CSS Variables, Animations, Backdrop Filter.
- **JavaScript (ES6+)**: Async/Await, Fetch API, DOM Manipulation.
- **OpenWeatherMap API**: Data source for weather and forecasts.
- **Google Fonts**: Inter font family.

## Setup & Installation

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/syhru/Weather-App.git
    ```
2.  **Open the project**:
    Navigate to the project folder and open `index.html` in your web browser.

    > **Note on API Key**: The project uses a public OpenWeatherMap API key for demonstration. For production or heavy use, please replace the `apiKey` variable in `main.js` with your own key from [OpenWeatherMap](https://openweathermap.org/api).

## Usage

1.  **Allow Location Access**: When prompted, allow the browser to access your location to see local weather immediately.
2.  **Search**: type a city name in the search bar and press **Enter** or click the **Search Icon**.
3.  **View Forecast**: Scroll down (if on mobile) to see the 5-day weather looking ahead.

## Project Structure

```
Weather-App/
├── index.html      # Main HTML structure
├── style.css       # Core styles, animations, and responsive rules
├── main.js         # Application logic, API fetching, and UI updates
└── README.md       # Project documentation
```

## Credits

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/).
- Icons designed as custom SVGs.

## License

This project is open source and available under the [MIT License](LICENSE).
