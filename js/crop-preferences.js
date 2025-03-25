document.addEventListener('DOMContentLoaded', function() {
    const soilAnalysisForm = document.getElementById('soilAnalysisForm');
    const cropRecommendations = document.getElementById('cropRecommendations');
    const cropCardsContainer = document.getElementById('cropCardsContainer');
    const sampleDataBtn = document.getElementById('sampleDataBtn');

    // Sample data for the form
    const sampleData = {
        temperature: 25,
        humidity: 60,
        rainfall: 1200,
        nitrogen: 90,
        phosphorous: 45,
        potassium: 60,
        ph: 6.5
    };
    
    // Handle sample data button
    if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', function() {
            // Fill form with sample data
            document.getElementById('temperature').value = sampleData.temperature;
            document.getElementById('humidity').value = sampleData.humidity;
            document.getElementById('rainfall').value = sampleData.rainfall;
            document.getElementById('nitrogen').value = sampleData.nitrogen;
            document.getElementById('phosphorous').value = sampleData.phosphorous;
            document.getElementById('potassium').value = sampleData.potassium;
            document.getElementById('ph').value = sampleData.ph;
        });
    }

    // Handle form submission
    if (soilAnalysisForm) {
        soilAnalysisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const temperature = document.getElementById('temperature').value;
            const humidity = document.getElementById('humidity').value;
            const rainfall = document.getElementById('rainfall').value;
            const nitrogen = document.getElementById('nitrogen').value;
            const phosphorous = document.getElementById('phosphorous').value;
            const potassium = document.getElementById('potassium').value;
            const ph = document.getElementById('ph').value;
            
            // Generate recommendations
            generateRecommendations(temperature, humidity, rainfall, nitrogen, phosphorous, potassium, ph);
        });
    }

    // Generate crop recommendations based on input
    function generateRecommendations(temperature, humidity, rainfall, nitrogen, phosphorous, potassium, ph) {
        // Show loading state
        const submitBtn = soilAnalysisForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitBtn.disabled = true;
        
        // In a real app, replace the simulation below with an API call or your own logic.
        /*
        setTimeout(function() {
            // Reset button state
            submitBtn.innerHTML = 'Get Recommendations';
            submitBtn.disabled = false;
            
            // Clear previous recommendations
            if (cropCardsContainer) {
                cropCardsContainer.innerHTML = '';
            }
            
            // Determine crop recommendations based on input (simplified logic)
            let recommendedCrops = [];
            
            // Rice prefers high rainfall, warm temperatures, and slightly acidic to neutral pH
            if (rainfall > 1000 && temperature > 20 && temperature < 35 && ph >= 5.5 && ph <= 7.0) {
                recommendedCrops.push({
                    name: 'Rice',
                    type: 'Cereal',
                    suitability: 95,
                    waterNeeds: 'High',
                    growingSeason: 'Summer',
                    npkRequirements: 'N: High, P: Medium, K: Medium'
                });
            }
            
            // Wheat prefers moderate rainfall, cooler temperatures, and neutral pH
            if (rainfall > 500 && rainfall < 1200 && temperature > 15 && temperature < 25 && ph >= 6.0 && ph <= 7.5) {
                recommendedCrops.push({
                    name: 'Wheat',
                    type: 'Cereal',
                    suitability: 90,
                    waterNeeds: 'Medium',
                    growingSeason: 'Winter',
                    npkRequirements: 'N: Medium, P: Medium, K: Low'
                });
            }
            
            // Corn prefers moderate rainfall, warm temperatures, and slightly acidic to neutral pH
            if (rainfall > 600 && rainfall < 1200 && temperature > 20 && temperature < 30 && ph >= 5.5 && ph <= 7.0) {
                recommendedCrops.push({
                    name: 'Corn',
                    type: 'Cereal',
                    suitability: 85,
                    waterNeeds: 'Medium',
                    growingSeason: 'Summer',
                    npkRequirements: 'N: High, P: Medium, K: Medium'
                });
            }
            
            // Potatoes prefer moderate rainfall, cooler temperatures, and acidic pH
            if (rainfall > 500 && rainfall < 1000 && temperature > 15 && temperature < 25 && ph >= 4.8 && ph <= 6.5) {
                recommendedCrops.push({
                    name: 'Potato',
                    type: 'Tuber',
                    suitability: 80,
                    waterNeeds: 'Medium',
                    growingSeason: 'Spring-Summer',
                    npkRequirements: 'N: Medium, P: High, K: High'
                });
            }
            
            // Tomatoes prefer moderate rainfall, warm temperatures, and slightly acidic to neutral pH
            if (rainfall > 400 && rainfall < 800 && temperature > 20 && temperature < 30 && ph >= 5.5 && ph <= 7.0) {
                recommendedCrops.push({
                    name: 'Tomato',
                    type: 'Vegetable',
                    suitability: 75,
                    waterNeeds: 'Medium',
                    growingSeason: 'Summer',
                    npkRequirements: 'N: Medium, P: High, K: High'
                });
            }
            
            // Cotton prefers moderate rainfall, warm temperatures, and neutral pH
            if (rainfall > 700 && rainfall < 1300 && temperature > 20 && temperature < 35 && ph >= 5.8 && ph <= 8.0) {
                recommendedCrops.push({
                    name: 'Cotton',
                    type: 'Fiber',
                    suitability: 70,
                    waterNeeds: 'Medium',
                    growingSeason: 'Summer',
                    npkRequirements: 'N: High, P: Medium, K: Medium'
                });
            }
            
            // If no crops match the criteria, provide some default recommendations
            if (recommendedCrops.length === 0) {
                recommendedCrops = [
                    {
                        name: 'Sorghum',
                        type: 'Cereal',
                        suitability: 65,
                        waterNeeds: 'Low',
                        growingSeason: 'Summer',
                        npkRequirements: 'N: Medium, P: Low, K: Low'
                    },
                    {
                        name: 'Millet',
                        type: 'Cereal',
                        suitability: 60,
                        waterNeeds: 'Low',
                        growingSeason: 'Summer',
                        npkRequirements: 'N: Low, P: Low, K: Low'
                    },
                    {
                        name: 'Cover Crops',
                        type: 'Soil Improvement',
                        suitability: 70,
                        waterNeeds: 'Low',
                        growingSeason: 'Any',
                        npkRequirements: 'N: Low, P: Low, K: Low'
                    }
                ];
            }
            
            // Create crop cards
            recommendedCrops.forEach(crop => {
                const cropCard = createCropCard(crop, temperature, humidity, rainfall, nitrogen, phosphorous, potassium, ph);
                if (cropCardsContainer) {
                    cropCardsContainer.appendChild(cropCard);
                }
            });
            
            // Show recommendations section
            if (cropRecommendations) {
                cropRecommendations.style.display = 'block';
                
                // Scroll to recommendations
                cropRecommendations.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1500);
        */
       
        // TODO: Replace the above simulated response with your actual API call or logic.
        // Example:
        // fetch('https://your-api-endpoint.com/analyze', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ temperature, humidity, rainfall, nitrogen, phosphorous, potassium, ph })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     // Process the response data and update the UI accordingly
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     // Handle error state and update the UI
        // })
        // .finally(() => {
        //     submitBtn.innerHTML = 'Get Recommendations';
        //     submitBtn.disabled = false;
        // });
    }

    // Create a crop card element
    function createCropCard(crop, temperature, humidity, rainfall, nitrogen, phosphorous, potassium, ph) {
        const card = document.createElement('div');
        card.className = 'crop-card';
        
        // Determine suitability class
        let suitabilityClass = '';
        if (crop.suitability >= 90) {
            suitabilityClass = 'excellent';
        } else if (crop.suitability >= 80) {
            suitabilityClass = 'good';
        } else if (crop.suitability >= 70) {
            suitabilityClass = 'fair';
        } else {
            suitabilityClass = 'poor';
        }
        
        // Create card content
        card.innerHTML = `
            <div class="crop-card-header">
                <h3>${crop.name}</h3>
                <span class="suitability ${suitabilityClass}">${crop.suitability}% Match</span>
            </div>
            <div class="crop-card-image">
                <img src="images/crops/${crop.name.toLowerCase().replace(/\s+/g, '-')}.jpg" 
                     alt="${crop.name}" 
                     onerror="this.src='images/crops/placeholder.jpg'">
            </div>
            <div class="crop-card-details">
                <div class="detail-item">
                    <span class="detail-label">Type:</span>
                    <span class="detail-value">${crop.type}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Water Needs:</span>
                    <span class="detail-value">${crop.waterNeeds}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Growing Season:</span>
                    <span class="detail-value">${crop.growingSeason}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">NPK Requirements:</span>
                    <span class="detail-value">${crop.npkRequirements}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Optimal pH:</span>
                    <span class="detail-value">${getOptimalPH(crop.name)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Temperature Range:</span>
                    <span class="detail-value">${getTemperatureRange(crop.name)}</span>
                </div>
            </div>
            <div class="crop-card-footer">
                <button class="btn-small">View Details</button>
            </div>
        `;
        
        return card;
    }

    // Helper function to get optimal pH range for a crop
    function getOptimalPH(cropName) {
        const phRanges = {
            'Rice': '5.5 - 7.0',
            'Wheat': '6.0 - 7.5',
            'Corn': '5.5 - 7.0',
            'Potato': '4.8 - 6.5',
            'Tomato': '5.5 - 7.0',
            'Cotton': '5.8 - 8.0',
            'Sorghum': '5.5 - 7.5',
            'Millet': '5.5 - 7.0',
            'Cover Crops': '5.0 - 7.5'
        };
        
        return phRanges[cropName] || '6.0 - 7.0';
    }

    // Helper function to get temperature range for a crop
    function getTemperatureRange(cropName) {
        const tempRanges = {
            'Rice': '20°C - 35°C',
            'Wheat': '15°C - 25°C',
            'Corn': '20°C - 30°C',
            'Potato': '15°C - 25°C',
            'Tomato': '20°C - 30°C',
            'Cotton': '20°C - 35°C',
            'Sorghum': '25°C - 35°C',
            'Millet': '25°C - 35°C',
            'Cover Crops': '10°C - 30°C'
        };
        
        return tempRanges[cropName] || '15°C - 30°C';
    }
});
