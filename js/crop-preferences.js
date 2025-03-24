document.addEventListener('DOMContentLoaded', function() {
    const soilAnalysisForm = document.getElementById('soilAnalysisForm');
    const cropRecommendations = document.getElementById('cropRecommendations');
    const cropCardsContainer = document.getElementById('cropCardsContainer');

    // Sample crop data
    const cropDatabase = {
        clay: {
            acidic: ['Cabbage', 'Broccoli', 'Brussels Sprouts'],
            neutral: ['Beans', 'Peas', 'Corn'],
            alkaline: ['Asparagus', 'Beets', 'Cauliflower']
        },
        sandy: {
            acidic: ['Potatoes', 'Strawberries', 'Blueberries'],
            neutral: ['Carrots', 'Radishes', 'Lettuce'],
            alkaline: ['Spinach', 'Asparagus', 'Fava Beans']
        },
        loamy: {
            acidic: ['Blueberries', 'Potatoes', 'Rhubarb'],
            neutral: ['Tomatoes', 'Peppers', 'Cucumbers'],
            alkaline: ['Cabbage', 'Cauliflower', 'Brussels Sprouts']
        },
        silty: {
            acidic: ['Strawberries', 'Raspberries', 'Blackberries'],
            neutral: ['Lettuce', 'Spinach', 'Chard'],
            alkaline: ['Beets', 'Broccoli', 'Cauliflower']
        },
        peaty: {
            acidic: ['Blueberries', 'Cranberries', 'Potatoes'],
            neutral: ['Carrots', 'Onions', 'Lettuce'],
            alkaline: ['Brassicas', 'Legumes', 'Spinach']
        },
        chalky: {
            acidic: ['Not recommended'],
            neutral: ['Spinach', 'Beets', 'Sweetcorn'],
            alkaline: ['Cabbage', 'Cauliflower', 'Brussels Sprouts']
        }
    };

    // Climate zone preferences
    const climatePreferences = {
        tropical: ['Rice', 'Bananas', 'Sugarcane', 'Coconut', 'Cassava'],
        subtropical: ['Citrus', 'Avocado', 'Mango', 'Olives', 'Figs'],
        temperate: ['Wheat', 'Barley', 'Apples', 'Pears', 'Grapes'],
        continental: ['Wheat', 'Corn', 'Soybeans', 'Sunflowers', 'Potatoes'],
        polar: ['Barley', 'Oats', 'Potatoes', 'Cabbage', 'Kale']
    };

    // Handle form submission
    if (soilAnalysisForm) {
        soilAnalysisForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const soilType = document.getElementById('soilType').value;
            const soilPH = document.getElementById('soilPH').value;
            const rainfall = document.getElementById('rainfall').value;
            const temperature = document.getElementById('temperature').value;
            const region = document.getElementById('region').value;
            
            // Generate recommendations
            generateRecommendations(soilType, soilPH, rainfall, temperature, region);
        });
    }

    // Generate crop recommendations based on input
    function generateRecommendations(soilType, soilPH, rainfall, temperature, region) {
        // Clear previous recommendations
        if (cropCardsContainer) {
            cropCardsContainer.innerHTML = '';
        }
        
        // Get soil-based recommendations
        let soilRecommendations = [];
        if (cropDatabase[soilType] && cropDatabase[soilType][soilPH]) {
            soilRecommendations = cropDatabase[soilType][soilPH];
        }
        
        // Get climate-based recommendations
        let climateRecommendations = [];
        if (climatePreferences[region]) {
            climateRecommendations = climatePreferences[region];
        }
        
        // Combine recommendations (with some overlap)
        let allRecommendations = [...new Set([...soilRecommendations, ...climateRecommendations])];
        
        // Filter based on rainfall and temperature (simplified logic)
        let finalRecommendations = allRecommendations.filter(crop => {
            // This is a simplified example - in a real app, you'd have more detailed crop requirements
            return true;
        });
        
        // If no recommendations, provide a fallback
        if (finalRecommendations.length === 0 || finalRecommendations[0] === 'Not recommended') {
            finalRecommendations = ['Cover Crops', 'Consider Soil Amendments', 'Consult Local Extension Office'];
        }
        
        // Create crop cards
        finalRecommendations.forEach(crop => {
            const cropCard = createCropCard(crop, soilType, soilPH, rainfall, temperature, region);
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
    }

    // Create a crop card element
    function createCropCard(cropName, soilType, soilPH, rainfall, temperature, region) {
        const card = document.createElement('div');
        card.className = 'crop-card';
        
        // Generate a random suitability score between 70 and 95
        const suitabilityScore = Math.floor(Math.random() * 26) + 70;
        
        // Determine suitability class
        let suitabilityClass = '';
        if (suitabilityScore >= 90) {
            suitabilityClass = 'excellent';
        } else if (suitabilityScore >= 80) {
            suitabilityClass = 'good';
        } else {
            suitabilityClass = 'fair';
        }
        
        // Create card content
        card.innerHTML = `
            <div class="crop-card-header">
                <h3>${cropName}</h3>
                <span class="suitability ${suitabilityClass}">${suitabilityScore}% Match</span>
            </div>
            <div class="crop-card-image">
                <img src="images/crops/${cropName.toLowerCase().replace(/\s+/g, '-')}.jpg" 
                     alt="${cropName}" 
                     onerror="this.src='images/crops/placeholder.jpg'">
            </div>
            <div class="crop-card-details">
                <div class="detail-item">
                    <span class="detail-label">Soil Type:</span>
                    <span class="detail-value">${soilType.charAt(0).toUpperCase() + soilType.slice(1)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Soil pH:</span>
                    <span class="detail-value">${soilPH.charAt(0).toUpperCase() + soilPH.slice(1)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Water Needs:</span>
                    <span class="detail-value">${getWaterNeeds(cropName)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Growing Season:</span>
                    <span class="detail-value">${getGrowingSeason(cropName, region)}</span>
                </div>
            </div>
            <div class="crop-card-footer">
                <button class="btn-small">View Details</button>
            </div>
        `;
        
        return card;
    }

    // Helper function to get water needs (simplified)
    function getWaterNeeds(cropName) {
        const lowWaterCrops = ['Olives', 'Figs', 'Asparagus', 'Cassava'];
        const highWaterCrops = ['Rice', 'Sugarcane', 'Bananas', 'Lettuce', 'Spinach'];
        
        if (lowWaterCrops.includes(cropName)) {
            return 'Low';
        } else if (highWaterCrops.includes(cropName)) {
            return 'High';
        } else {
            return 'Medium';
        }
    }

    // Helper function to get growing season (simplified)
    function getGrowingSeason(cropName, region) {
        const springCrops = ['Lettuce', 'Spinach', 'Peas', 'Radishes'];
        const summerCrops = ['Tomatoes', 'Peppers', 'Corn', 'Cucumbers'];
        const fallCrops = ['Broccoli', 'Cauliflower', 'Cabbage', 'Kale'];
        const winterCrops = ['Cover Crops', 'Garlic', 'Winter Wheat'];
        
        if (springCrops.includes(cropName)) {
            return 'Spring';
        } else if (summerCrops.includes(cropName)) {
            return 'Summer';
        } else if (fallCrops.includes(cropName)) {
            return 'Fall';
        } else if (winterCrops.includes(cropName)) {
            return 'Winter';
        } else {
            // Determine based on climate region (simplified)
            if (region === 'tropical' || region === 'subtropical') {
                return 'Year-round';
            } else if (region === 'temperate' || region === 'continental') {
                return 'Spring-Summer';
            } else {
                return 'Summer';
            }
        }
    }
});