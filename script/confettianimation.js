const confettiButton = document.getElementById("clicker"); 
const confettiContainer = document.getElementById("confettiContainer");

// Function to create confetti elements
function createConfetti() {
    // Create a new div element for the confetti
    const confetti = document.createElement("div");
    // Add a class for styling
    confetti.classList.add("confetti");

    // Define an array of colors
    const colors = ["#f5a623", "#2ecc71", "#9b59b6", "#3498db", "#e74c3c"];
    // Set a random background color for the confetti from the array
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Set a random size for the confetti
    const size = Math.floor(Math.random() * 10 + 5);
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;

    // Set a random horizontal and vertical position for the confetti
    const left = Math.floor(Math.random() * 100);
    const top = Math.floor(Math.random() * 10);
    confetti.style.top = `${top}%`;
    confetti.style.left = `${left}%`;

    // Set a random animation duration for the falling animation
    const animationDuration = Math.floor(Math.random() * 4 + 3);
    confetti.style.animation = `fall ${animationDuration}s linear`;

    // Set a random rotation for the confatti element
    const rotationAngle = Math.floor(Math.random() * 360); // 0 to 360 degrees
    confetti.style.transform = `rotate(${rotationAngle}deg)`;

    // Remove the confetti element after it finishes the animation
    confetti.addEventListener("animationend", () => {
        confetti.remove();
    });

    // Add the confetti element to the container
    confettiContainer.appendChild(confetti);
}

// Add a click event listener to the button
confettiButton.addEventListener("click", () => {
    // Create a larger number of confetti pieces when the button is clicked for a more realistic effect
    for (let i = 0; i < 150; i++) {
        createConfetti();
    }
});
