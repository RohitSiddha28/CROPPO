document.addEventListener('DOMContentLoaded', function() {
    const fertilizerForm = document.getElementById('fertilizerForm');
    const fertilizerResults = document.getElementById('fertilizerResults');
    const sampleDataBtn = document.getElementById('sampleDataBtn');
    
    // Sample data for the form
    const sampleData = {
        temperature: 28,
        humidity: 65,
        moisture: 35,
        soilType: 'loamy',
        cropType: 'rice',
        nitrogen: 80,
        phosphorous: 45,
        potassium: 60
    };
    
    // Handle form submission
    if (fertilizerForm) {
        fertilizerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const temperature = document.getElementById('temperature').value;
            const humidity = document.getElementById('humidity').value;
            const moisture = document.getElementById('moisture').value;
            const soilType = document.getElementById('soilType').value;
            const cropType = document.getElementById('cropType').value;
            const nitrogen = document.getElementById('nitrogen').value;
            const phosphorous = document.getElementById('phosphorous').value;
            const potassium = document.getElementById('potassium').value;
            
            // Generate fertilizer recommendation
            generateRecommendation(temperature, humidity, moisture, soilType, cropType, nitrogen, phosphorous, potassium);
        });
    }
    
    // Handle sample data button
    if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', function() {
            // Fill form with sample data
            document.getElementById('temperature').value = sampleData.temperature;
            document.getElementById('humidity').value = sampleData.humidity;
            document.getElementById('moisture').value = sampleData.moisture;
            document.getElementById('soilType').value = sampleData.soilType;
            document.getElementById('cropType').value = sampleData.cropType;
            document.getElementById('nitrogen').value = sampleData.nitrogen;
            document.getElementById('phosphorous').value = sampleData.phosphorous;
            document.getElementById('potassium').value = sampleData.potassium;
        });
    }
    
    // Generate fertilizer recommendation based on input
    function generateRecommendation(temperature, humidity, moisture, soilType, cropType, nitrogen, phosphorous, potassium) {
        // Show loading state
        const submitBtn = fertilizerForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitBtn.disabled = true;
        
        // In a real app, you would make an API call to a backend service.
        // For this demo, we'll simulate a response with setTimeout.
        /*
        setTimeout(function() {
            // Reset button state
            submitBtn.innerHTML = 'Get Fertilizer Recommendation';
            submitBtn.disabled = false;
            
            // Determine fertilizer recommendation based on input (simplified logic)
            let recommendedFertilizer = '';
            let fertilizerDescription = '';
            let applicationGuidelines = [];
            let nValue = 0;
            let pValue = 0;
            let kValue = 0;
            
            // Very simplified recommendation logic based on crop type and NPK values
            if (cropType === 'rice') {
                if (nitrogen < 80) {
                    recommendedFertilizer = 'Urea (46-0-0)';
                    fertilizerDescription = 'Urea is a high-nitrogen fertilizer ideal for rice crops with nitrogen deficiency. It promotes vegetative growth and increases yield potential.';
                    applicationGuidelines = [
                        'Apply 100-150 kg per hectare',
                        'Split application: 50% at transplanting, 25% at tillering, 25% at panicle initiation',
                        'Apply on dry soil and irrigate immediately after application',
                        'Avoid application during heavy rainfall to prevent leaching'
                    ];
                    nValue = 46;
                    pValue = 0;
                    kValue = 0;
                } else if (phosphorous < 40) {
                    recommendedFertilizer = 'DAP (18-46-0)';
                    fertilizerDescription = 'Diammonium Phosphate (DAP) provides both nitrogen and high phosphorus content, promoting root development and early growth in rice.';
                    applicationGuidelines = [
                        'Apply 100-125 kg per hectare',
                        'Best applied before transplanting or at planting',
                        'Incorporate into soil for maximum effectiveness',
                        'Follow up with nitrogen fertilizer during later growth stages'
                    ];
                    nValue = 18;
                    pValue = 46;
                    kValue = 0;
                } else {
                    recommendedFertilizer = 'NPK 15-15-15';
                    fertilizerDescription = 'A balanced NPK fertilizer providing equal amounts of nitrogen, phosphorus, and potassium for overall rice crop development.';
                    applicationGuidelines = [
                        'Apply 200-250 kg per hectare',
                        'Split application recommended: 50% at planting, 50% at tillering',
                        'Ensure proper mixing with soil',
                        'Supplement with additional nitrogen during panicle initiation'
                    ];
                    nValue = 15;
                    pValue = 15;
                    kValue = 15;
                }
            } else if (cropType === 'wheat') {
                if (potassium < 50) {
                    recommendedFertilizer = 'MOP (0-0-60)';
                    fertilizerDescription = 'Muriate of Potash (MOP) is high in potassium, which improves wheat\'s disease resistance and helps in grain filling.';
                    applicationGuidelines = [
                        'Apply 75-100 kg per hectare',
                        'Best applied before sowing',
                        'Mix thoroughly with soil',
                        'Combine with nitrogen fertilizer for balanced nutrition'
                    ];
                    nValue = 0;
                    pValue = 0;
                    kValue = 60;
                } else {
                    recommendedFertilizer = 'NPK 20-20-0';
                    fertilizerDescription = 'This fertilizer provides balanced nitrogen and phosphorus for wheat, promoting both vegetative growth and grain development.';
                    applicationGuidelines = [
                        'Apply 200-250 kg per hectare',
                        'Apply 50% at sowing and 50% at tillering stage',
                        'Avoid application during frost periods',
                        'Supplement with potassium if soil test indicates deficiency'
                    ];
                    nValue = 20;
                    pValue = 20;
                    kValue = 0;
                }
            } else if (cropType === 'tomato') {
                recommendedFertilizer = 'NPK 10-26-26';
                fertilizerDescription = 'This phosphorus and potassium rich fertilizer is ideal for tomatoes, promoting flowering, fruiting, and disease resistance.';
                applicationGuidelines = [
                    'Apply 300-350 kg per hectare',
                    'Apply 50% before transplanting and 50% during flowering',
                    'Maintain consistent soil moisture after application',
                    'Supplement with calcium to prevent blossom end rot'
                ];
                nValue = 10;
                pValue = 26;
                kValue = 26;
            } else {
                // Default recommendation
                recommendedFertilizer = 'NPK 14-14-14';
                fertilizerDescription = 'A balanced fertilizer suitable for a wide range of crops, providing equal amounts of essential macronutrients.';
                applicationGuidelines = [
                    'Apply 200-300 kg per hectare depending on crop needs',
                    'Split application recommended for long-duration crops',
                    'Apply when soil is moist but not waterlogged',
                    'Follow up with specific nutrients based on crop growth stage'
                ];
                nValue = 14;
                pValue = 14;
                kValue = 14;
            }
            
            // Update the results in the DOM
            document.getElementById('recommendedFertilizer').textContent = recommendedFertilizer;
            document.getElementById('fertilizerDescription').textContent = fertilizerDescription;
            
            // Update nutrient bars
            document.getElementById('nitrogenBar').style.width = `${nValue}%`;
            document.getElementById('phosphorousBar').style.width = `${pValue}%`;
            document.getElementById('potassiumBar').style.width = `${kValue}%`;
            
            // Update nutrient values
            document.querySelectorAll('.nutrient-bar')[0].querySelector('.nutrient-value').textContent = `${nValue}%`;
            document.querySelectorAll('.nutrient-bar')[1].querySelector('.nutrient-value').textContent = `${pValue}%`;
            document.querySelectorAll('.nutrient-bar')[2].querySelector('.nutrient-value').textContent = `${kValue}%`;
            
            // Update application guidelines
            const guidelinesList = document.getElementById('applicationGuidelines');
            guidelinesList.innerHTML = '';
            applicationGuidelines.forEach(guideline => {
                const li = document.createElement('li');
                li.textContent = guideline;
                guidelinesList.appendChild(li);
            });
            
            // Show results
            fertilizerResults.style.display = 'block';
            
            // Scroll to results
            fertilizerResults.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
        */
        
        // TODO: Replace the above simulated response with your actual API call or processing logic.
    }
});
