# AGENTS.md

## Overview

This document lists the current and planned agents for **Kitchen Sorter**. Each entry explains what the agent does, the data it expects, what it produces, and any design considerations.  
The goal is to keep responsibilities clear and avoid hard-wiring implementation details. Update this file whenever an agent is added or changed.

---

## Agent: GridUnitManager

**Purpose**  
Maintains the abstract kitchen grid and the storage units (cabinets, drawers, shelves, worktops) placed on it.

**Inputs**  
- Grid dimensions (rows, columns)  
- Commands to add, move, resize, or remove a unit  
- Optional label text per unit

**Outputs**  
- Updated layout state (`units` map)  
- Events: `unitAdded`, `unitMoved`, `unitResized`, `unitRemoved`

**Core Logic**  
Applies snap-to-grid arithmetic and prevents overlap through simple collision checks.

**Dependencies**  
None beyond in-browser state.

**Notes**  
Abstract sizes only; no real-world measurements.

---

## Agent: InventoryPalette

**Purpose**  
Keeps the catalogue of items (plates, mixer, bread knife, etc.), tracks total counts, and exposes drag-ready item tokens.

**Inputs**  
- Text commands to create a new item type  
- Drop events from placement actions  
- Optional manual count edits

**Outputs**
- `items` map with `total` and `placed[]` arrays
- Badge updates reflecting remaining quantity

**Core Logic**  
Decrements totals on placement, prevents negative counts, and re-increments on item removal.

**Dependencies**  
Relies on `GridUnitManager` events to stay in sync.

**Notes**
Free-text item names; duplicates are merged case-insensitively. When a count
drops to zero the palette entry is disabled until quantity increases.

---

## Agent: PlacementAssigner

**Purpose**  
Links items to storage units when a drop event occurs.

**Inputs**  
- `dragToken` containing `itemId`  
- `targetUnitId` from the drop location

**Outputs**  
- Mutation of `items[itemId].placed` array  
- Event `itemPlaced`

**Core Logic**  
Single responsibility layer that mediates between UI drag-and-drop and state mutation, keeping side effects isolated.

**Dependencies**  
Receives grid and item maps from `GridUnitManager` and `InventoryPalette`.

**Notes**
If an item has already reached its total count, further drops are blocked.
The view layer shows the placed item name inside the unit when placement
is successful.

---

## Agent: FindItemAssistant

**Purpose**  
Locates units containing a given item name and highlights them.

**Inputs**  
- Search string from the user

**Outputs**  
- Array of matching `unitIds`  
- Emits `highlight` instructions to the UI

**Core Logic**  
Simple case-insensitive substring match on item names.

**Dependencies**  
Reads combined state from all other agents.

**Notes**  
Flash animation handled by the view layer, not this agent.

---

## Agent: PersistenceWorker

**Purpose**  
Serialises and restores application state via `localStorage`.

**Inputs**  
- Debounced state snapshots from other agents

**Outputs**  
- State object on load

**Core Logic**  
Performs a shallow diff before writing to avoid unnecessary storage writes.

**Dependencies**  
Browser `localStorage` only.

**Notes**  
No external network calls; suitable for full offline use.

---

## Agent: DragResizeHandler

**Purpose**
Enables dragging and resizing of storage units on the grid while snapping to cell boundaries.

**Inputs**
- DOM elements representing units
- Pointer drag and resize events

**Outputs**
- Updated unit position and size via `GridUnitManager`

**Core Logic**
Uses a drag-and-drop library to map pointer movement to grid coordinates, clamping values so units remain within the grid.

**Dependencies**
Relies on `GridUnitManager` for dimension metrics and state updates.

**Notes**
Provides visual feedback during interaction for both mouse and touch input;
includes a visible resize handle element. No external services used.

---

## Agent: SplashScreen

**Purpose**
Displays an introductory splash screen with basic instructions and a button to begin sorting.

**Inputs**
- `localStorage` flag `splashSeen`
- User clicks on the "Start Sorting" button
- User toggles the "How to use this app" panel

**Outputs**
- Visibility toggle for the splash screen and main interface

**Core Logic**
Shows the splash screen on first load or until dismissed, then remembers the choice in `localStorage`.

**Dependencies**
Browser `localStorage` only.

**Notes**
Keep the instruction text accurate with the features that are actually available in the app. Future bug reports will be filed if the splash screen instructions fall out of sync with implemented functionality.

---

## Agent: HomeButton

**Purpose**
Provides a persistent navigation control to return to the splash screen.

**Inputs**
- User taps the home icon

**Outputs**
- Toggles visibility of the main interface and splash screen

**Core Logic**
Simple click handler that hides `#app`, shows `#splash-screen`, and hides itself.

**Dependencies**
Browser `localStorage` only.

**Notes**
Visible on every screen except the splash screen.

---

## Planned Agents

| Agent | Rationale | Status |
|-------|-----------|--------|
| **LayoutPlanner** | Optional AI suggestion engine to auto-arrange items logically. | Backlog |
| **ImportExportHandler** | Allows exporting and importing the full state as a JSON file. | Backlog |
| **VoiceCommandParser** | Processes voice input such as “add blender to left cabinet”. | Exploratory |

---

## Contributing

When adding or modifying an agent:

1. Append or update its entry above.  
2. State the clear purpose and boundaries of the agent.  
3. List expected inputs and outputs in plain language.  
4. Note any external services or APIs.  
5. Keep descriptions implementation-agnostic—avoid naming specific functions or classes.

---

## Project Structure & Navigation

- `index.html` bootstraps the entire app
- `css/` contains `style.css`
- `js/` holds each agent script (e.g. `grid.js`, `dnd.js`, `splash.js`)
- No build step; open `index.html` in a browser

## Coding Conventions & Style

- Use two-space indentation and semicolons
- Prefer plain ES6 without transpilers
- Keep functions self-contained inside IIFEs

## Testing Instructions

- No automated tests yet
- Manually verify behaviour by opening `index.html`

## Linting / Static Checks

- None configured
- Ensure code runs cleanly in modern browsers

## Pull Request & Commit Guidelines

- Use short, imperative commit messages; prefix with `fix:`, `feat:`, `docs:` when applicable
- Branch name format for docs updates: `codex/<topic>`

## CI / Build Steps

- None

## Hierarchical Overrides

- This file governs the entire repository; no nested overrides

## Self-Update Policy

- After repository changes, re-check this file for accuracy
- Submit a docs-only PR if updates are needed

