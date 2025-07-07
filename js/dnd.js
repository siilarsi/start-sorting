(function() {
  if (typeof interact === 'undefined' || !window.GridUnitManager) return;

  function enableUnit(el) {
    interact(el)
      .draggable({ listeners: { start: preventDefault, move: onDragMove } })
      .resizable({ edges: { left: true, right: true, bottom: true, top: true },
                   listeners: { start: preventDefault, move: onResizeMove } });
  }

  function getCoords(event) {
    const grid = document.getElementById('kitchen-grid');
    const rect = grid.getBoundingClientRect();
    const metrics = window.GridUnitManager.getMetrics();
    const point = pointerCoords(event);
    const x = point.x - rect.left;
    const y = point.y - rect.top;
    return {
      col: Math.round(x / (metrics.width + metrics.gap)),
      row: Math.round(y / (metrics.height + metrics.gap))
    };
  }

  function pointerCoords(e) {
    if (e.client) return { x: e.client.x, y: e.client.y };
    if (typeof e.clientX === 'number') return { x: e.clientX, y: e.clientY };
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: 0, y: 0 };
  }

  function preventDefault(event) {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
  }

  function onDragMove(event) {
    const { col, row } = getCoords(event);
    window.GridUnitManager.moveUnit(event.target, col, row);
  }

  function onResizeMove(event) {
    const metrics = window.GridUnitManager.getMetrics();
    const w = Math.round(event.rect.width / (metrics.width + metrics.gap));
    const h = Math.round(event.rect.height / (metrics.height + metrics.gap));
    window.GridUnitManager.resizeUnit(event.target, w, h);
  }

  window.DragResize = { enableUnit };
})();
