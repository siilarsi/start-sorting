(function() {
  function assign(itemId, unitEl) {
    if (!window.InventoryPalette) return false;
    const success = window.InventoryPalette.placeItem(itemId, unitEl);
    if (success) {
      renderIntoUnit(itemId, unitEl);
    }
    return success;
  }

  function renderIntoUnit(itemId, unitEl) {
    const item = window.InventoryPalette.getItem(itemId);
    if (!item) return;
    let list = unitEl.querySelector('.unit-items');
    if (!list) {
      list = document.createElement('ul');
      list.className = 'unit-items';
      unitEl.appendChild(list);
    }
    const li = document.createElement('li');
    li.textContent = item.name;
    list.appendChild(li);
  }

  window.PlacementAssigner = {
    assign
  };
})();

