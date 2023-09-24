let modeButton = document.getElementById('toggle-button');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

// Function to enable Dark mode
const enableDarkMode = () =>{
   modeButton.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

// Function to disable Dark Mode
const disableDarkMode = () =>{
   modeButton.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}
// Check if DarkMode is enabled
if(darkMode === 'enabled'){
   enableDarkMode();
}

modeButton.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}