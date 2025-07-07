(function() {
  const items = {};
  const listEl = document.getElementById('item-list');
  const inputEl = document.getElementById('new-item-input');

  function normalize(name) {
    return name.trim().toLowerCase();
  }

  function remaining(item) {
    return item.total - item.placed.length;
  }

  function addItem(name) {
    const id = normalize(name);
    if (!id) return;
    if (items[id]) {
      items[id].total += 1;
    } else {
      items[id] = { name: name.trim(), total: 1, placed: [] };
    }
    render();
  }

  function changeQuantity(id, delta) {
    const item = items[id];
    if (!item) return;
    const min = item.placed.length;
    item.total = Math.max(min, item.total + delta);
    render();
  }

    function placeItem(id, unitEl) {
      const item = items[id];
      if (!item) return false;
      if (remaining(item) <= 0) return false;
      const unitId = unitEl.dataset.unitIndex;
      item.placed.push(unitId);
      render();
      return true;
    }

    function getItem(id) {
      return items[id];
    }

  function onInputKey(e) {
    if (e.key === 'Enter') {
      addItem(inputEl.value);
      inputEl.value = '';
    }
  }

  function createEntry(id, item) {
    const li = document.createElement('li');
    li.className = 'item-entry';
    li.draggable = remaining(item) > 0;
    if (!li.draggable) li.classList.add('disabled');
    li.dataset.itemId = id;

    const label = document.createElement('span');
    label.className = 'item-label';
    label.textContent = item.name;

    const badge = document.createElement('span');
    badge.className = 'item-count';
    badge.textContent = remaining(item);

    const inc = document.createElement('button');
    inc.className = 'qty-btn';
    inc.textContent = '＋';
    inc.addEventListener('click', () => changeQuantity(id, 1));

    const dec = document.createElement('button');
    dec.className = 'qty-btn';
    dec.textContent = '−';
    dec.addEventListener('click', () => changeQuantity(id, -1));

    li.appendChild(label);
    li.appendChild(badge);
    li.appendChild(inc);
    li.appendChild(dec);

    li.addEventListener('dragstart', (e) => {
      if (remaining(item) <= 0) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData('text/plain', id);
    });

    return li;
  }

  function render() {
    if (!listEl) return;
    listEl.innerHTML = '';
    Object.keys(items).forEach(id => {
      listEl.appendChild(createEntry(id, items[id]));
    });
  }

  function init() {
    if (!listEl || !inputEl) return;
    inputEl.addEventListener('keydown', onInputKey);
    addItem('plates');
    addItem('mugs');
    addItem('mixer');
  }

  window.InventoryPalette = {
    addItem,
    placeItem,
    getItem
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
