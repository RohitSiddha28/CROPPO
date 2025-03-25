document.addEventListener('DOMContentLoaded', function() {
    // Account tabs functionality
    const accountTabs = document.querySelectorAll('.account-tab');
    const accountPanels = document.querySelectorAll('.account-panel');
    
    accountTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            accountTabs.forEach(t => t.classList.remove('active'));
            accountPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to current tab and panel
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Password visibility toggle
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Password strength meter
    const signupPassword = document.getElementById('signupPassword');
    const strengthMeter = document.querySelector('.strength-meter-fill');
    const strengthText = document.querySelector('.strength-text span');
    
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Check password length
            if (password.length >= 8) {
                strength += 1;
            }
            
            // Check for mixed case
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
                strength += 1;
            }
            
            // Check for numbers
            if (password.match(/\d/)) {
                strength += 1;
            }
            
            // Check for special characters
            if (password.match(/[^a-zA-Z\d]/)) {
                strength += 1;
            }
            
            // Update strength meter
            strengthMeter.setAttribute('data-strength', Math.min(3, strength));
            
            // Update strength text
            const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
            strengthText.textContent = strengthLabels[Math.min(3, strength)];
        });
    }
    
    // Form validation
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            // Validate form (basic validation)
            if (!email || !password) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // In a real app, you would send this data to a server for authentication
            // For this demo, we'll simulate a response with setTimeout
            setTimeout(function() {
                // Reset button state
                submitBtn.innerHTML = 'Login';
                submitBtn.disabled = false;
                
                // Simulate successful login
                alert('Login successful! Redirecting to dashboard...');
                
                // In a real app, you would redirect to the dashboard or home page
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsAgree = document.getElementById('termsAgree').checked;
            
            // Validate form (basic validation)
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Password match validation
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            // Terms agreement validation
            if (!termsAgree) {
                alert('You must agree to the Terms of Service and Privacy Policy.');
                return;
            }
            
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitBtn.disabled = true;
            
            // In a real app, you would send this data to a server for account creation
            // For this demo, we'll simulate a response with setTimeout
            setTimeout(function() {
                // Reset button state
                submitBtn.innerHTML = 'Create Account';
                submitBtn.disabled = false;
                
                // Simulate successful account creation
                alert('Account created successfully! You can now log in.');
                
                // Switch to login tab
                document.querySelector('[data-tab="login"]').click();
                
                // Reset form
                signupForm.reset();
            }, 1500);
        });
    }
    
    // Helper function to validate email format
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
    
    // Firebase Authentication
    const auth = firebase.auth();
    
    // Login with email and password
    function loginWithEmailPassword(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    // Sign up with email and password
    function signUpWithEmailPassword(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    // Login with Google
    function loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider);
    }
    
    // Login with Facebook
    function loginWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider);
    }
    
    // Logout
    function logout() {
        return auth.signOut();
    }
    
    // Auth state change listener
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in
            console.log('User is signed in:', user);
            // Update UI for logged in user
        } else {
            // User is signed out
            console.log('User is signed out');
            // Update UI for logged out user
        }
    });
    */
});