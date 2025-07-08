# start-sorting
Kitchen Sorter is a simple, visual tool to organise your kitchen layout. Quickly design your kitchen’s grid and place appliances, utensils, and items into cabinets, drawers, shelves and worktops to keep track of where everything goes.

When you first load the application you’ll see a splash screen introducing the tool and describing the basic controls.
Click **Start Sorting** to open the layout editor.
The main page then shows a responsive 8×4 grid that displays layout slots for your units. Use the item sidebar to add items and drag them onto units; each placement lowers the available count and lists the item inside the unit. Use the home button in the corner to return to the splash screen at any time.

## JavaScript Files

1. [grid.js](#grid-js)
2. [dnd.js](#dnd-js)
3. [inventory.js](#inventory-js)
4. [placement.js](#placement-js)
5. [main.js](#main-js)
6. [splash.js](#splash-js)

### 1. grid.js <a name="grid-js"></a>
Manages the kitchen grid layout and unit placement.

### 2. dnd.js <a name="dnd-js"></a>
Enables drag and resize interactions for units.

### 3. inventory.js <a name="inventory-js"></a>
Tracks item counts and handles palette operations.

### 4. placement.js <a name="placement-js"></a>
Links dropped items to units and updates lists.

### 5. main.js <a name="main-js"></a>
Wire-up for toolbar actions and bootstrapping.

### 6. splash.js <a name="splash-js"></a>
Controls the splash screen visibility and instructions.
