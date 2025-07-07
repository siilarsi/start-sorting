(function() {
  function setupSplash() {
    const splash = document.getElementById('splash-screen');
    const app = document.getElementById('app');
    const startBtn = document.getElementById('start-btn');
    const toggleBtn = document.getElementById('toggle-instructions');
    const instructions = document.getElementById('instruction-content');
    if (!splash || !app || !startBtn) return;

    if (localStorage.getItem('splashSeen')) {
      splash.style.display = 'none';
      app.style.display = '';
    }

    startBtn.addEventListener('click', () => {
      splash.style.display = 'none';
      app.style.display = '';
      localStorage.setItem('splashSeen', 'true');
    });

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
