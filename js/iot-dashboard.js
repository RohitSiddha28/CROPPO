document.addEventListener('DOMContentLoaded', function() {
    // Update last updated time
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = now.toLocaleString();
    }
    
    // Refresh data button
    const refreshDataBtn = document.getElementById('refreshData');
    if (refreshDataBtn) {
        refreshDataBtn.addEventListener('click', function() {
            refreshData();
        });
    }
    
    // Location selector
    const locationSelector = document.getElementById('locationSelector');
    if (locationSelector) {
        locationSelector.addEventListener('change', function() {
            refreshData();
        });
    }
    
    // Initialize charts
    initCharts();
    
    // Refresh data function
    function refreshData() {
        // Show loading state
        refreshDataBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        refreshDataBtn.disabled = true;
        
        // In a real app, fetch data from an API here.
        // For now, the simulation using random data is commented out.
        /*
        setTimeout(function() {
            // Reset button state
            refreshDataBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            refreshDataBtn.disabled = false;
            
            // Update last updated time
            const now = new Date();
            lastUpdated.textContent = now.toLocaleString();
            
            // Update sensor readings with random values
            updateSensorReadings();
            
            // Update charts with new data
            updateCharts();
        }, 1000);
        */
        
        // TODO: Replace the above simulation with your actual API call and data processing logic.
    }
    
    // Update sensor readings with random values
    // Commented out because this simulation uses random data.
    /*
    function updateSensorReadings() {
        // Temperature (20-35°C)
        const tempReading = document.getElementById('temperatureReading');
        if (tempReading) {
            const temp = (Math.random() * 15 + 20).toFixed(1);
            tempReading.textContent = `${temp}°C`;
        }
        
        // Humidity (40-80%)
        const humidityReading = document.getElementById('humidityReading');
        if (humidityReading) {
            const humidity = Math.floor(Math.random() * 40 + 40);
            humidityReading.textContent = `${humidity}%`;
        }
        
        // Soil Moisture (20-60%)
        const moistureReading = document.getElementById('moistureReading');
        if (moistureReading) {
            const moisture = Math.floor(Math.random() * 40 + 20);
            moistureReading.textContent = `${moisture}%`;
        }
        
        // Light Intensity (500-2000 lux)
        const lightReading = document.getElementById('lightReading');
        if (lightReading) {
            const light = Math.floor(Math.random() * 1500 + 500);
            lightReading.textContent = `${light} lux`;
        }
        
        // Wind Speed (0-30 km/h)
        const windReading = document.getElementById('windReading');
        if (windReading) {
            const wind = Math.floor(Math.random() * 30);
            windReading.textContent = `${wind} km/h`;
        }
        
        // Rainfall (0-10 mm)
        const rainfallReading = document.getElementById('rainfallReading');
        if (rainfallReading) {
            const rainfall = (Math.random() * 10).toFixed(1);
            rainfallReading.textContent = `${rainfall} mm`;
        }
        
        // Soil pH (5.5-7.5)
        const phReading = document.getElementById('phReading');
        if (phReading) {
            const ph = (Math.random() * 2 + 5.5).toFixed(1);
            phReading.textContent = ph;
        }
        
        // NPK Levels
        const npkReading = document.getElementById('npkReading');
        if (npkReading) {
            const n = Math.floor(Math.random() * 30 + 30);
            const p = Math.floor(Math.random() * 30 + 20);
            const k = Math.floor(Math.random() * 30 + 20);
            npkReading.textContent = `N: ${n} | P: ${p} | K: ${k}`;
        }
    }
    */
    
    // Initialize charts
    function initCharts() {
        // Temperature & Humidity Chart
        const tempHumidityCtx = document.getElementById('tempHumidityChart');
        if (tempHumidityCtx) {
            // Generate time labels for 24 hours
            const timeLabels = [];
            for (let i = 0; i < 24; i++) {
                timeLabels.push(`${i}:00`);
            }
            
            // Generate random temperature data (20-35°C)
            const tempData = [];
            for (let i = 0; i < 24; i++) {
                tempData.push(Math.random() * 15 + 20);
            }
            
            // Generate random humidity data (40-80%)
            const humidityData = [];
            for (let i = 0; i < 24; i++) {
                humidityData.push(Math.random() * 40 + 40);
            }
            
            // Create chart
            window.tempHumidityChart = new Chart(tempHumidityCtx, {
                type: 'line',
                data: {
                    labels: timeLabels,
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: tempData,
                            borderColor: '#FF6384',
                            backgroundColor: 'rgba(255, 99, 132, 0.1)',
                            tension: 0.4,
                            fill: true
                        },
                        {
                            label: 'Humidity (%)',
                            data: humidityData,
                            borderColor: '#36A2EB',
                            backgroundColor: 'rgba(54, 162, 235, 0.1)',
                            tension: 0.4,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
        
        // Soil Moisture Chart
        const soilMoistureCtx = document.getElementById('soilMoistureChart');
        if (soilMoistureCtx) {
            // Generate day labels for 7 days
            const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            
            // Generate random soil moisture data (20-60%)
            const moistureData = [];
            for (let i = 0; i < 7; i++) {
                moistureData.push(Math.random() * 40 + 20);
            }
            
            // Create chart
            window.soilMoistureChart = new Chart(soilMoistureCtx, {
                type: 'bar',
                data: {
                    labels: dayLabels,
                    datasets: [
                        {
                            label: 'Soil Moisture (%)',
                            data: moistureData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 0,
                            max: 100
                        }
                    }
                }
            });
        }
    }
    
    // Update charts with new random data
    // Commented out because this simulation uses random data.
    /*
    function updateCharts() {
        if (window.tempHumidityChart) {
            // Generate new random temperature data (20-35°C)
            const newTempData = [];
            for (let i = 0; i < 24; i++) {
                newTempData.push(Math.random() * 15 + 20);
            }
            
            // Generate new random humidity data (40-80%)
            const newHumidityData = [];
            for (let i = 0; i < 24; i++) {
                newHumidityData.push(Math.random() * 40 + 40);
            }
            
            // Update chart data
            window.tempHumidityChart.data.datasets[0].data = newTempData;
            window.tempHumidityChart.data.datasets[1].data = newHumidityData;
            window.tempHumidityChart.update();
        }
        
        if (window.soilMoistureChart) {
            // Generate new random soil moisture data (20-60%)
            const newMoistureData = [];
            for (let i = 0; i < 7; i++) {
                newMoistureData.push(Math.random() * 40 + 20);
            }
            
            // Update chart data
            window.soilMoistureChart.data.datasets[0].data = newMoistureData;
            window.soilMoistureChart.update();
        }
    }
    */
});
