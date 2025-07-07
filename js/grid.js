(function() {
  const rows = 4;
  const cols = 8;
  let gridEl;
  const units = [];

  const defaultSizes = {
    cabinet: { w: 2, h: 3 },
    drawer: { w: 1, h: 1 },
    shelf: { w: 2, h: 1 }
  };

  function createGridCell() {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    return cell;
  }

  function renderGrid() {
    const root = document.getElementById('grid-root');
    if (!root) return;

    const grid = document.createElement('div');
    grid.id = 'kitchen-grid';
    grid.className = 'kitchen-grid';
    grid.style.position = 'relative';

    for (let i = 0; i < rows * cols; i++) {
      grid.appendChild(createGridCell());
    }

    root.appendChild(grid);
    gridEl = grid;
  }

  function computeMetrics() {
    if (!gridEl) return { width: 0, height: 0, gap: 0 };
    const cell = gridEl.querySelector('.grid-cell');
    if (!cell) return { width: 0, height: 0, gap: 0 };
    const rect = cell.getBoundingClientRect();
    const styles = window.getComputedStyle(gridEl);
    const gap = parseInt(styles.gap) || 0;
    return { width: rect.width, height: rect.height, gap };
  }

  function createUnitElement(type) {
    const el = document.createElement('div');
    el.className = `unit ${type}`;
    el.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    return el;
  }

  function placeUnit(el, col, row, w, h) {
    const { width, height, gap } = computeMetrics();
    el.style.left = col * (width + gap) + 'px';
    el.style.top = row * (height + gap) + 'px';
    el.style.width = w * width + gap * (w - 1) + 'px';
    el.style.height = h * height + gap * (h - 1) + 'px';
  }

  function findUnit(el) {
    return units.find(u => u.el === el);
  }

  function moveUnit(el, col, row) {
    const u = findUnit(el);
    if (!u) return;
    col = Math.max(0, Math.min(cols - u.w, col));
    row = Math.max(0, Math.min(rows - u.h, row));
    u.col = col;
    u.row = row;
    placeUnit(u.el, u.col, u.row, u.w, u.h);
  }

  function resizeUnit(el, w, h) {
    const u = findUnit(el);
    if (!u) return;
    w = Math.max(1, Math.min(cols - u.col, w));
    h = Math.max(1, Math.min(rows - u.row, h));
    u.w = w;
    u.h = h;
    placeUnit(u.el, u.col, u.row, u.w, u.h);
  }

  function getMetrics() {
    return computeMetrics();
  }

  function addUnit(type) {
    if (!gridEl || !defaultSizes[type]) return;
    const size = defaultSizes[type];
    const el = createUnitElement(type);
    placeUnit(el, 0, 0, size.w, size.h);
    gridEl.appendChild(el);
    const unit = { type, el, col: 0, row: 0, w: size.w, h: size.h };
    units.push(unit);
    el.dataset.unitIndex = units.length - 1;
    if (window.DragResize && window.DragResize.enableUnit) {
      window.DragResize.enableUnit(el);
    }
  }

  function onResize() {
    units.forEach(u => placeUnit(u.el, u.col, u.row, u.w, u.h));
  }

  window.GridUnitManager = {
    addUnit,
    moveUnit,
    resizeUnit,
    getMetrics
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderGrid();
      window.addEventListener('resize', onResize);
    });
  } else {
    renderGrid();
    window.addEventListener('resize', onResize);
  }
})();
