(function() {
  const rows = 4;
  const cols = 8;

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

    for (let i = 0; i < rows * cols; i++) {
      grid.appendChild(createGridCell());
    }

    root.appendChild(grid);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderGrid);
  } else {
    renderGrid();
  }
})();
