# AgriTech Website

A responsive agriculture-focused website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Navigation menu with mobile hamburger toggle
- Five main pages: Home, Disease Detection, Crop Preferences, Weather, and Contact
- Disease detection tool with image upload functionality
- Crop recommendation system based on soil and climate conditions
- Weather forecast with agricultural impact analysis
- Contact form with validation
- Firebase integration for backend functionality (commented out in the code)

## Pages

1. **Home** - Overview of the agriculture platform
2. **Disease Detection** - Tool to upload plant images for disease detection
3. **Crop Preferences** - Information about suitable crops based on conditions
4. **Weather** - Weather forecast relevant for farming
5. **Contact** - Contact form and information

## Setup Instructions

1. Clone or download this repository
2. Open the project folder in your code editor
3. Open `index.html` in your browser to view the website

## Firebase Integration (Optional)

To enable Firebase functionality:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Get your Firebase configuration
3. Uncomment the Firebase code in `js/contact.js` and replace the configuration with your own
4. Add the Firebase SDK to your HTML files:

```html
&lt;!-- Add Firebase SDK before your scripts -->
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>