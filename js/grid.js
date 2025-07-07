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

  function addUnit(type) {
    if (!gridEl || !defaultSizes[type]) return;
    const size = defaultSizes[type];
    const el = createUnitElement(type);
    placeUnit(el, 0, 0, size.w, size.h);
    gridEl.appendChild(el);
    units.push({ type, el, col: 0, row: 0, w: size.w, h: size.h });
  }

  function onResize() {
    units.forEach(u => placeUnit(u.el, u.col, u.row, u.w, u.h));
  }

  window.GridUnitManager = { addUnit };

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
