(function() {
  function setupToolbar() {
    const toolbar = document.getElementById('unit-toolbar');
    if (!toolbar || !window.GridUnitManager) return;

    toolbar.addEventListener('click', (e) => {
      const type = e.target.getAttribute('data-unit');
      if (type) {
        window.GridUnitManager.addUnit(type);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupToolbar);
  } else {
    setupToolbar();
  }
})();
