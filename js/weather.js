document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const weatherSearchForm = document.getElementById("weatherSearchForm")
    const locationInput = document.getElementById("location")
    const getCurrentLocationBtn = document.getElementById("getCurrentLocation")
    const forecastDaysSelect = document.getElementById("forecastDays")
    const weatherDisplay = document.getElementById("weatherDisplay")
    const weatherLocation = document.getElementById("weatherLocation")
    const currentDate = document.getElementById("currentDate")
    const currentTemp = document.getElementById("currentTemp")
    const weatherDescription = document.getElementById("weatherDescription")
    const windSpeed = document.getElementById("windSpeed")
    const humidity = document.getElementById("humidity")
    const precipitation = document.getElementById("precipitation")
    const forecastContainer = document.getElementById("forecastContainer")
    const alertBox = document.getElementById("alertBox")
    
    // API key - in a production environment, this should be secured
    const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=8aa1a9f24202564101f538f97ebd905b` // Replace with your actual API key
    
    // Event listeners
    weatherSearchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = locationInput.value
    if (location) {
    getWeatherData(location)
    }
    })
    
    getCurrentLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    (position) => {
    const { latitude, longitude } = position.coords
    getWeatherByCoordinates(latitude, longitude)
    },
    (error) => {
    console.error("Error getting location:", error)
    alert("Unable to get your location. Please enter it manually.")
    },
    )
    } else {
    alert("Geolocation is not supported by your browser. Please enter your location manually.")
    }
    })
    
    // Function to get weather data by city name
    function getWeatherData(city) {
    // In a real implementation, you would fetch from the OpenWeatherMap API
    // For this example, we'll use the sample data provided
    displayWeatherData(getSampleWeatherData())
    }
    
    // Function to get weather by coordinates
    function getWeatherByCoordinates(lat, lon) {
    // In a real implementation, you would fetch from the OpenWeatherMap API using coordinates
    // For this example, we'll use the sample data provided
    displayWeatherData(getSampleWeatherData())
    }
    
    // Function to return sample weather data (from the provided API response)
    function getSampleWeatherData() {
    return {
    coord: { lon: 88.3697, lat: 22.5697 },
    weather: [{ id: 721, main: "Haze", description: "haze", icon: "50d" }],
    base: "stations",
    main: {
    temp: 311.09,
    feels_like: 308.07,
    temp_min: 311.09,
    temp_max: 311.09,
    pressure: 1001,
    humidity: 9,
    sea_level: 1001,
    grnd_level: 1000,
    },
    visibility: 4000,
    wind: { speed: 3.6, deg: 290 },
    clouds: { all: 20 },
    dt: 1743072603,
    sys: {
    type: 1,
    id: 9114,
    country: "IN",
    sunrise: 1743033837,
    sunset: 1743077983,
    },
    timezone: 19800,
    id: 1275004,
    name: "Kolkata",
    cod: 200,
    }
    }
    
    // Function to display weather data
    function displayWeatherData(data) {
    // Show the weather display section
    weatherDisplay.style.display = "block"
    
    // Update current weather
    weatherLocation.textContent = `${data.name}, ${data.sys.country}`
    currentDate.textContent = formatDate(new Date(data.dt * 1000))
    
    // Convert Kelvin to Celsius and Fahrenheit
    const tempC = Math.round(data.main.temp - 273.15)
    const tempF = Math.round((tempC * 9) / 5 + 32)
    currentTemp.textContent = `${tempC}°C / ${tempF}°F`
    
    weatherDescription.textContent =
      data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)
    
    windSpeed.textContent = `${data.wind.speed} m/s`
    humidity.textContent = `${data.main.humidity}%`
    
    // Precipitation data is not directly available in the sample data
    // In a real implementation, you would use the precipitation data if available
    precipitation.textContent = "N/A"
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].icon)
    
    // Generate forecast (in a real implementation, this would use forecast data)
    generateForecast(Number.parseInt(forecastDaysSelect.value), data)
    
    // Generate agricultural impact based on weather conditions
    generateAgriculturalImpact(data)
    
    // Generate weather alerts based on conditions
    generateWeatherAlerts(data)
    }
    
    // Function to update the weather icon
    function updateWeatherIcon(iconCode) {
    const weatherIconElement = document.querySelector(".weather-icon i")
    
    // Map OpenWeatherMap icon codes to Font Awesome icons
    const iconMap = {
      "01d": "fa-sun", // clear sky day
      "01n": "fa-moon", // clear sky night
      "02d": "fa-cloud-sun", // few clouds day
      "02n": "fa-cloud-moon", // few clouds night
      "03d": "fa-cloud", // scattered clouds
      "03n": "fa-cloud",
      "04d": "fa-cloud", // broken clouds
      "04n": "fa-cloud",
      "09d": "fa-cloud-showers-heavy", // shower rain
      "09n": "fa-cloud-showers-heavy",
      "10d": "fa-cloud-rain", // rain day
      "10n": "fa-cloud-rain", // rain night
      "11d": "fa-bolt", // thunderstorm
      "11n": "fa-bolt",
      "13d": "fa-snowflake", // snow
      "13n": "fa-snowflake",
      "50d": "fa-smog", // mist/haze
      "50n": "fa-smog",
    }
    
    // Remove all existing classes except 'fas'
    weatherIconElement.className = "fas"
    
    // Add the appropriate icon class
    weatherIconElement.classList.add(iconMap[iconCode] || "fa-sun")
    }
    
    // Function to generate forecast cards
    function generateForecast(days, currentData) {
    forecastContainer.innerHTML = ""
    
    // In a real implementation, you would use actual forecast data
    // For this example, we'll generate mock forecast data based on current conditions
    const currentTemp = currentData.main.temp - 273.15 // Convert to Celsius
    
    for (let i = 1; i <= days; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
    
      // Generate some variation in the temperature
      const tempVariation = Math.random() * 6 - 3 // Random variation between -3 and +3
      const forecastTemp = Math.round(currentTemp + tempVariation)
    
      // Create forecast card
      const forecastCard = document.createElement("div")
      forecastCard.className = "forecast-card"
    
      forecastCard.innerHTML = `
        <div class="forecast-date">${formatShortDate(date)}</div>
        <div class="forecast-icon">
          <i class="fas ${getRandomWeatherIcon()}"></i>
        </div>
        <div class="forecast-temp">
          <span class="high">${forecastTemp + 2}°C</span>
          <span class="low">${forecastTemp - 2}°C</span>
        </div>
        <div class="forecast-desc">${getRandomWeatherDescription()}</div>
      `
    
      forecastContainer.appendChild(forecastCard)
    }
    }
    
    // Function to generate agricultural impact based on weather conditions
    function generateAgriculturalImpact(data) {
    const tempC = data.main.temp - 273.15
    const humidity = data.main.humidity
    
    // Update irrigation needs
    const irrigationElement = document.querySelector(".impact-card:nth-child(1) .meter-fill")
    const irrigationValueElement = document.querySelector(".impact-card:nth-child(1) .meter-value")
    const irrigationTextElement = document.querySelector(".impact-card:nth-child(1) p")
    
    let irrigationPercentage, irrigationValue, irrigationText
    
    if (tempC > 30 && humidity < 30) {
      irrigationPercentage = 90
      irrigationValue = "Very High"
      irrigationText = "Due to high temperatures and low humidity, daily irrigation is strongly recommended."
    } else if (tempC > 25) {
      irrigationPercentage = 70
      irrigationValue = "High"
      irrigationText = "Based on the forecast, irrigation is recommended in the next 2-3 days."
    } else if (tempC > 20) {
      irrigationPercentage = 50
      irrigationValue = "Moderate"
      irrigationText = "Moderate irrigation needs, monitor soil moisture levels."
    } else {
      irrigationPercentage = 30
      irrigationValue = "Low"
      irrigationText = "Low irrigation needs at this time."
    }
    
    irrigationElement.style.width = `${irrigationPercentage}%`
    irrigationValueElement.textContent = irrigationValue
    irrigationTextElement.textContent = irrigationText
    
    // Update disease risk
    const diseaseElement = document.querySelector(".impact-card:nth-child(2) .meter-fill")
    const diseaseValueElement = document.querySelector(".impact-card:nth-child(2) .meter-value")
    const diseaseTextElement = document.querySelector(".impact-card:nth-child(2) p")
    
    let diseasePercentage, diseaseValue, diseaseText
    
    if (humidity > 80 && tempC > 20) {
      diseasePercentage = 80
      diseaseValue = "High"
      diseaseText =
        "High humidity and warm temperatures create favorable conditions for fungal diseases. Consider preventative measures."
    } else if (humidity > 60 && tempC > 15) {
      diseasePercentage = 50
      diseaseValue = "Moderate"
      diseaseText = "Moderate risk for common crop diseases. Monitor crops regularly."
    } else {
      diseasePercentage = 30
      diseaseValue = "Low"
      diseaseText = "Current conditions indicate low risk for common crop diseases."
    }
    
    diseaseElement.style.width = `${diseasePercentage}%`
    diseaseValueElement.textContent = diseaseValue
    diseaseTextElement.textContent = diseaseText
    
    // Update harvest conditions
    const harvestElement = document.querySelector(".impact-card:nth-child(3) .meter-fill")
    const harvestValueElement = document.querySelector(".impact-card:nth-child(3) .meter-value")
    const harvestTextElement = document.querySelector(".impact-card:nth-child(3) p")
    
    let harvestPercentage, harvestValue, harvestText
    
    if (tempC > 15 && tempC < 30 && humidity < 70 && data.wind.speed < 5) {
      harvestPercentage = 90
      harvestValue = "Excellent"
      harvestText = "Weather conditions are favorable for harvesting in the next 5-7 days."
    } else if (tempC > 10 && tempC < 35 && humidity < 80 && data.wind.speed < 7) {
      harvestPercentage = 70
      harvestValue = "Good"
      harvestText = "Generally good conditions for harvesting, but monitor the forecast."
    } else {
      harvestPercentage = 40
      harvestValue = "Fair"
      harvestText = "Conditions are not ideal for harvesting. Consider postponing if possible."
    }
    
    harvestElement.style.width = `${harvestPercentage}%`
    harvestValueElement.textContent = harvestValue
    harvestTextElement.textContent = harvestText
    }
    
    // Function to generate weather alerts based on conditions
    function generateWeatherAlerts(data) {
    alertBox.innerHTML = ""
    
    const tempC = data.main.temp - 273.15
    const currentDate = new Date()
    const formattedDate = formatDate(currentDate)
    const formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    // Check for heat advisory
    if (tempC > 35) {
      const heatAlert = document.createElement("div")
      heatAlert.className = "alert"
      heatAlert.innerHTML = `
        <div class="alert-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="alert-content">
          <h3>Extreme Heat Advisory</h3>
          <p>Temperatures exceeding 35°C expected. Ensure adequate irrigation for all crops and consider shade for sensitive plants.</p>
          <span class="alert-time">Issued: ${formattedDate} - ${formattedTime}</span>
        </div>
      `
      alertBox.appendChild(heatAlert)
    } else if (tempC > 30) {
      const heatAlert = document.createElement("div")
      heatAlert.className = "alert"
      heatAlert.innerHTML = `
        <div class="alert-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="alert-content">
          <h3>Heat Advisory</h3>
          <p>High temperatures expected. Ensure adequate irrigation for sensitive crops.</p>
          <span class="alert-time">Issued: ${formattedDate} - ${formattedTime}</span>
        </div>
      `
      alertBox.appendChild(heatAlert)
    }
    
    // Check for drought conditions
    if (data.main.humidity < 20) {
      const droughtAlert = document.createElement("div")
      droughtAlert.className = "alert"
      droughtAlert.innerHTML = `
        <div class="alert-icon">
          <i class="fas fa-tint-slash"></i>
        </div>
        <div class="alert-content">
          <h3>Low Humidity Warning</h3>
          <p>Very low humidity levels detected. Increase irrigation frequency and monitor soil moisture closely.</p>
          <span class="alert-time">Issued: ${formattedDate} - ${formattedTime}</span>
        </div>
      `
      alertBox.appendChild(droughtAlert)
    }
    
    // If no alerts, show a default message
    if (alertBox.children.length === 0) {
      const noAlert = document.createElement("div")
      noAlert.className = "alert no-alerts"
      noAlert.innerHTML = `
        <div class="alert-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="alert-content">
          <h3>No Weather Alerts</h3>
          <p>There are currently no weather alerts for your area.</p>
          <span class="alert-time">Updated: ${formattedDate} - ${formattedTime}</span>
        </div>
      `
      alertBox.appendChild(noAlert)
    }
    }
    
    // Helper function to format date
    function formatDate(date) {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
    }
    
    // Helper function to format short date
    function formatShortDate(date) {
    const options = { weekday: "short", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
    }
    
    // Helper function to get random weather icon for forecast
    function getRandomWeatherIcon() {
    const icons = [
    "fa-sun",
    "fa-cloud-sun",
    "fa-cloud",
    "fa-cloud-rain",
    "fa-cloud-showers-heavy",
    "fa-bolt",
    "fa-smog",
    ]
    return icons[Math.floor(Math.random() * icons.length)]
    }
    
    // Helper function to get random weather description for forecast
    function getRandomWeatherDescription() {
    const descriptions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Heavy Rain", "Thunderstorms", "Hazy"]
    return descriptions[Math.floor(Math.random() * descriptions.length)]
    }
    
    // Initialize with sample data if needed
    // Uncomment the line below to show weather data on page load
    // displayWeatherData(getSampleWeatherData());
    })