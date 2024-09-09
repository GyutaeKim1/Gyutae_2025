// Check if a theme is already stored in localStorage and apply it
document.addEventListener('DOMContentLoaded', function() {
    var storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.querySelector('#theme-stylesheet').setAttribute('href', storedTheme);
      if (storedTheme.includes('midnight')) {
        document.body.classList.add('midnight');
      }
    }
  });
  
  // Add an event listener for the theme toggle button
  document.getElementById('theme-toggle').addEventListener('click', function() {
    var currentTheme = document.querySelector('#theme-stylesheet').getAttribute('href');
    var newTheme;
  
    if (currentTheme.includes('midnight')) {
      // Switch to Cayman theme
      newTheme = '{{ site.baseurl }}/assets/css/cayman.css';
      document.body.classList.remove('midnight');
    } else {
      // Switch to Midnight theme
      newTheme = '{{ site.baseurl }}/assets/css/midnight.css';
      document.body.classList.add('midnight');
    }
  
    // Update the link element to switch the theme
    document.querySelector('#theme-stylesheet').setAttribute('href', newTheme);
    localStorage.setItem('theme', newTheme); // Store theme preference
  });
  