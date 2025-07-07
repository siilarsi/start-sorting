(function() {
  if (typeof interact === 'undefined' || !window.GridUnitManager) return;

  function enableUnit(el) {
    interact(el)
      .draggable({ listeners: { move: onDragMove } })
      .resizable({ edges: { left: true, right: true, bottom: true, top: true },
                   listeners: { move: onResizeMove } });
  }

  function getCoords(event) {
    const grid = document.getElementById('kitchen-grid');
    const rect = grid.getBoundingClientRect();
    const metrics = window.GridUnitManager.getMetrics();
    const x = event.client.x - rect.left;
    const y = event.client.y - rect.top;
    return {
      col: Math.round(x / (metrics.width + metrics.gap)),
      row: Math.round(y / (metrics.height + metrics.gap))
    };
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
