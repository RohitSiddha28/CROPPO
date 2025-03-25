document.addEventListener('DOMContentLoaded', function() {
    const weatherSearchForm = document.getElementById('weatherSearchForm');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
    const locationInput = document.getElementById('location');
    const forecastDaysSelect = document.getElementById('forecastDays');
    
    // Weather icons mapping
    const weatherIcons = {
        'clear': 'fa-sun',
        'sunny': 'fa-sun',
        'partly cloudy': 'fa-cloud-sun',
        'cloudy': 'fa-cloud',
        'overcast': 'fa-cloud',
        'rain': 'fa-cloud-rain',
        'showers': 'fa-cloud-showers-heavy',
        'thunderstorm': 'fa-bolt',
        'snow': 'fa-snowflake',
        'fog': 'fa-smog',
        'mist': 'fa-smog',
        'windy': 'fa-wind'
    };

    // Handle form submission
    if (weatherSearchForm) {
        weatherSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = locationInput.value;
            const days = forecastDaysSelect.value;
            
            if (location) {
                fetchWeatherData(location, days);
            }
        });
    }

    // Handle get current location button
    if (getCurrentLocationBtn) {
        getCurrentLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                getCurrentLocationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        // Success
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        
                        // Reverse geocode to get location name (simplified)
                        locationInput.value = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
                        getCurrentLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                        
                        // Fetch weather for coordinates
                        fetchWeatherData(`${lat},${lon}`, forecastDaysSelect.value);
                    },
                    function(error) {
                        // Error
                        alert('Unable to retrieve your location. Please enter it manually.');
                        getCurrentLocationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser. Please enter your location manually.');
            }
        });
    }

    // Fetch weather data
    function fetchWeatherData(location, days) {
        // Show loading state
        if (weatherSearchForm) {
            const submitBtn = weatherSearchForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            submitBtn.disabled = true;
        }
        
        // In a real app, make an API call to a weather service here.
        // The simulated response using random data is commented out below.
        /*
        setTimeout(function() {
            // Reset button state
            if (weatherSearchForm) {
                const submitBtn = weatherSearchForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'Get Forecast';
                submitBtn.disabled = false;
            }
            
            // Display weather data using simulated random values
            displayWeatherData(location, days);
            
            // Show weather display section
            if (weatherDisplay) {
                weatherDisplay.style.display = 'block';
                weatherDisplay.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
        */
        
        // TODO: Replace the above simulation with your actual API call and data processing logic.
    }

    // Display weather data
    function displayWeatherData(location, days) {
        // Update location and date
        document.getElementById('weatherLocation').textContent = formatLocation(location);
        document.getElementById('currentDate').textContent = getCurrentDate();
        
        /* 
        // Simulated random weather data (replace with API data)
        const currentTemp = Math.floor(Math.random() * 25) + 10; // 10-35°C
        const weatherConditions = ['clear', 'partly cloudy', 'cloudy', 'rain', 'thunderstorm'];
        const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        
        // Update current weather
        document.getElementById('currentTemp').textContent = `${currentTemp}°C`;
        document.getElementById('weatherDescription').textContent = capitalizeFirstLetter(randomCondition);
        
        // Update weather icon
        const weatherIconElement = document.querySelector('.weather-icon i');
        weatherIconElement.className = 'fas ' + (weatherIcons[randomCondition] || 'fa-sun');
        
        // Update weather details
        document.getElementById('windSpeed').textContent = `${Math.floor(Math.random() * 30) + 5} km/h`;
        document.getElementById('humidity').textContent = `${Math.floor(Math.random() * 50) + 30}%`;
        document.getElementById('precipitation').textContent = randomCondition.includes('rain') || randomCondition.includes('thunder') ? 
            `${Math.floor(Math.random() * 80) + 20}%` : '0%';
        
        // Generate forecast using simulated data
        generateForecast(days, currentTemp, randomCondition);
        
        // Update agricultural impact based on simulated weather data
        updateAgriculturalImpact(randomCondition, currentTemp);
        */
        
        // TODO: Replace the above simulation with actual weather data from your API.
    }

    // Generate forecast data
    function generateForecast(days, baseTemp, baseCondition) {
        const forecastContainer = document.getElementById('forecastContainer');
        if (!forecastContainer) return;
        
        // Clear previous forecast
        forecastContainer.innerHTML = '';
        
        /* 
        // Simulated forecast generation using random data
        const conditions = ['clear', 'partly cloudy', 'cloudy', 'rain', 'clear', 'partly cloudy'];
        
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            
            const tempVariation = Math.floor(Math.random() * 10) - 5; // -5 to +5 variation
            const dayTemp = baseTemp + tempVariation;
            const nightTemp = dayTemp - Math.floor(Math.random() * 8) - 3;
            
            const conditionIndex = (i + Math.floor(Math.random() * 2)) % conditions.length;
            const dayCondition = conditions[conditionIndex];
            
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            
            forecastCard.innerHTML = `
                <div class="day">${i === 0 ? 'Today' : getDayName(date)}</div>
                <div class="date">${formatDate(date)}</div>
                <i class="fas ${weatherIcons[dayCondition] || 'fa-sun'}"></i>
                <div class="condition">${capitalizeFirstLetter(dayCondition)}</div>
                <div class="temp">${dayTemp}°C</div>
                <div class="temp-range">${nightTemp}°C - ${dayTemp}°C</div>
            `;
            
            forecastContainer.appendChild(forecastCard);
        }
        */
        
        // TODO: Replace the above simulated forecast generation with your actual forecast data.
    }

    // Update agricultural impact based on weather
    function updateAgriculturalImpact(condition, temperature) {
        /* 
        // Simulated agricultural impact calculations based on random weather data
        
        // Irrigation needs
        const irrigationMeter = document.querySelector('.impact-card:nth-child(1) .meter-fill');
        const irrigationValue = document.querySelector('.impact-card:nth-child(1) .meter-value');
        const irrigationText = document.querySelector('.impact-card:nth-child(1) p');
        
        let irrigationLevel = 50;
        if (condition.includes('rain') || condition.includes('thunder')) {
            irrigationLevel = 20;
            irrigationValue.textContent = 'Low';
            irrigationText.textContent = 'Recent precipitation reduces irrigation needs for the next 2-3 days.';
        } else if (condition === 'clear' && temperature > 25) {
            irrigationLevel = 80;
            irrigationValue.textContent = 'High';
            irrigationText.textContent = 'Hot and dry conditions require immediate irrigation for most crops.';
        } else if (condition === 'partly cloudy' && temperature > 20) {
            irrigationLevel = 60;
            irrigationValue.textContent = 'Medium-High';
            irrigationText.textContent = 'Moderate irrigation recommended within the next 1-2 days.';
        } else {
            irrigationValue.textContent = 'Medium';
            irrigationText.textContent = 'Normal irrigation schedule recommended.';
        }
        if (irrigationMeter) {
            irrigationMeter.style.width = `${irrigationLevel}%`;
        }
        
        // Disease risk
        const diseaseMeter = document.querySelector('.impact-card:nth-child(2) .meter-fill');
        const diseaseValue = document.querySelector('.impact-card:nth-child(2) .meter-value');
        const diseaseText = document.querySelector('.impact-card:nth-child(2) p');
        
        let diseaseLevel = 30;
        if ((condition.includes('rain') || condition === 'cloudy') && temperature > 20) {
            diseaseLevel = 70;
            diseaseValue.textContent = 'High';
            diseaseText.textContent = 'Warm and humid conditions increase risk for fungal diseases. Monitor crops closely.';
        } else if (condition.includes('rain') && temperature < 20) {
            diseaseLevel = 50;
            diseaseValue.textContent = 'Medium';
            diseaseText.textContent = 'Cool and wet conditions may promote certain diseases. Preventative measures recommended.';
        } else if (condition === 'clear' && temperature > 30) {
            diseaseLevel = 40;
            diseaseValue.textContent = 'Medium-Low';
            diseaseText.textContent = 'Hot and dry conditions may stress plants, monitor for pest infestations.';
        } else {
            diseaseValue.textContent = 'Low';
            diseaseText.textContent = 'Current conditions indicate low risk for common crop diseases.';
        }
        if (diseaseMeter) {
            diseaseMeter.style.width = `${diseaseLevel}%`;
        }
        
        // Harvest conditions
        const harvestMeter = document.querySelector('.impact-card:nth-child(3) .meter-fill');
        const harvestValue = document.querySelector('.impact-card:nth-child(3) .meter-value');
        const harvestText = document.querySelector('.impact-card:nth-child(3) p');
        
        let harvestLevel = 50;
        if (condition === 'clear' && temperature > 15 && temperature < 30) {
            harvestLevel = 90;
            harvestValue.textContent = 'Excellent';
            harvestText.textContent = 'Ideal conditions for harvesting most crops. Plan harvest activities in the next 2-3 days.';
        } else if (condition === 'partly cloudy' && temperature > 15 && temperature < 28) {
            harvestLevel = 80;
            harvestValue.textContent = 'Very Good';
            harvestText.textContent = 'Good conditions for harvesting. Consider scheduling harvest soon.';
        } else if (condition.includes('rain') || condition.includes('thunder')) {
            harvestLevel = 20;
            harvestValue.textContent = 'Poor';
            harvestText.textContent = 'Wet conditions not suitable for harvesting. Delay harvest until drier conditions.';
        } else {
            harvestValue.textContent = 'Fair';
            harvestText.textContent = 'Moderate conditions for harvesting. Use judgment based on crop type and maturity.';
        }
        if (harvestMeter) {
            harvestMeter.style.width = `${harvestLevel}%`;
        }
        */
        
        // TODO: Replace the above simulated agricultural impact calculations with real data logic.
    }

    // Helper function to format location
    function formatLocation(location) {
        if (location.includes(',')) {
            return 'Current Location';
        }
        return location.split(',').map(part => capitalizeFirstLetter(part.trim())).join(', ');
    }

    // Helper function to get current date
    function getCurrentDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    }

    // Helper function to format date
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Helper function to get day name
    function getDayName(date) {
        const options = { weekday: 'short' };
        return date.toLocaleDateString('en-US', options);
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
