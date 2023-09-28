const cookieAlert = document.getElementById('cookie-alert');
const acceptCookiesButton = document.getElementById('accept-cookies');
const dimissButton = document.getElementById('dimiss-cookies');

// Check if the user has already accepted cookies
if (!localStorage.getItem('cookiesAccepted')) {
    cookieAlert.style.display = 'block';
}

// Handle the "Accept" button click
acceptCookiesButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieAlert.style.display = 'none';
});

// Handle the "Dimiss" button clock
dimissButton.addEventListener('click', () => {
    cookieAlert.style.display = 'none';
})