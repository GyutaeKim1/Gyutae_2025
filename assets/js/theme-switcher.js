document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('theme-switcher');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const themes = {
    'jekyll-theme-cayman.css': 'jekyll-theme-midnight.css',
    'jekyll-theme-midnight.css': 'jekyll-theme-cayman.css'
  };
  
  button.addEventListener('click', () => {
    const currentTheme = themeStylesheet.getAttribute('href').split('/').pop();
    const newTheme = themes[currentTheme];
    themeStylesheet.setAttribute('href', `/assets/css/${newTheme}`);
  });
});
