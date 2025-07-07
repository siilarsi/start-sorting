(function() {
    function setupSplash() {
      const splash = document.getElementById('splash-screen');
      const app = document.getElementById('app');
      const startBtn = document.getElementById('start-btn');
      const toggleBtn = document.getElementById('toggle-instructions');
      const instructions = document.getElementById('instruction-content');
      const homeBtn = document.getElementById('home-btn');
      if (!splash || !app || !startBtn) return;

      if (localStorage.getItem('splashSeen')) {
        splash.style.display = 'none';
        app.style.display = '';
        if (homeBtn) homeBtn.style.display = 'block';
      }

      startBtn.addEventListener('click', () => {
        splash.style.display = 'none';
        app.style.display = '';
        localStorage.setItem('splashSeen', 'true');
        if (homeBtn) homeBtn.style.display = 'block';
      });

      if (homeBtn) {
        homeBtn.addEventListener('click', () => {
          app.style.display = 'none';
          splash.style.display = '';
          homeBtn.style.display = 'none';
        });
      }

    if (toggleBtn && instructions) {
      toggleBtn.addEventListener('click', () => {
        instructions.classList.toggle('open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSplash);
  } else {
    setupSplash();
  }
})();
