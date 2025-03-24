document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const newsletter = document.getElementById('newsletter').checked;
            
            // Validate form (basic validation)
            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showFormStatus('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // In a real app, you would send this data to a server
            // For this demo, we'll simulate a response with setTimeout
            setTimeout(function() {
                // Reset button state
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
                
                // Show success message
                showFormStatus('Your message has been sent successfully! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            }, 2000);
        });
    }

    // Show form status message
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
            
            // Clear status after 5 seconds
            setTimeout(function() {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        }
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Firebase integration (commented out as this is just a demo)
    /*
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "your-app.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-app.appspot.com",
        messagingSenderId: "your-messaging-sender-id",
        appId: "your-app-id"
    };
    
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    // Save contact form data to Firebase
    function saveContactToFirebase(name, email, phone, subject, message, newsletter) {
        return db.collection('contacts').add({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message,
            newsletter: newsletter,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    */
});