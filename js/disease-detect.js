document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const resultsContainer = document.getElementById('resultsContainer');
    const fileUpload = document.getElementById('fileUpload');
    const uploadBtn = document.getElementById('uploadBtn');
    const changeImageBtn = document.getElementById('changeImageBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const previewImage = document.getElementById('previewImage');

    // Handle file upload button click
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            fileUpload.click();
        });
    }

    // Handle file selection
    if (fileUpload) {
        fileUpload.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];

                // Check file type
                if (!file.type.match('image.*')) {
                    alert('Please select an image file');
                    return;
                }

                // Check file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size exceeds 5MB limit');
                    return;
                }

                // Display preview
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    uploadArea.style.display = 'none';
                    previewArea.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Handle drag and drop
    if (uploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            uploadArea.classList.add('highlight');
        }

        function unhighlight() {
            uploadArea.classList.remove('highlight');
        }

        uploadArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const file = dt.files[0];

            // Check file type
            if (!file.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                return;
            }

            // Display preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                uploadArea.style.display = 'none';
                previewArea.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    // Handle change image button
    if (changeImageBtn) {
        changeImageBtn.addEventListener('click', function() {
            previewArea.style.display = 'none';
            uploadArea.style.display = 'block';
            resultsContainer.style.display = 'none';
        });
    }

    // Handle analyze button
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            // Show loading state
            analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            analyzeBtn.disabled = true;

            // Simulated API call block (replace with your actual API call)
            /*
            setTimeout(function() {
                // Reset button state
                analyzeBtn.innerHTML = 'Analyze Image';
                analyzeBtn.disabled = false;

                // Show results
                resultsContainer.style.display = 'block';

                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }, 2000);
            */

            // TODO: Replace the above simulation with your actual API call logic.
        });
    }
});
