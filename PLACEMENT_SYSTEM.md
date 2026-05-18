# 🎯 Object Placement System Documentation

## Overview

VIRTUAL-LAB features a sophisticated **floating preview placement system** that gives users precise control over object positioning before finalizing placement.

## How It Works

### 1. Floating Preview Mode

When you click any tool button (Box, Circle, Ground, etc.):

- ✅ **Semi-transparent preview** appears at your cursor
- ✅ **Follows mouse movement** smoothly in real-time
- ✅ **Visual feedback** with glowing white outline
- ✅ **No physics** - preview objects don't interact with the simulation
- ✅ **Reduced opacity** (50%) to distinguish from placed objects

### 2. Positioning

While in preview mode:

- **Move your mouse** to position the object anywhere in the workspace
- The object **smoothly follows** your cursor
- **No collisions** occur during preview
- Preview object is **always visible** above other objects

### 3. Finalizing Placement

To place the object permanently:

- **Right-click** anywhere in the workspace
- Object is **locked** at current position
- **Physics enabled** - object now interacts with simulation
- **Full opacity** restored
- Object becomes part of the scene

### 4. Canceling Placement

To cancel without placing:

- Press **ESC** key
- Preview object is removed
- No object is added to the scene

## Visual Indicators

### Preview State
```
Appearance:
- 50% opacity
- White outline (3px)
- Follows cursor
- No shadow
```

### Fixed State
```
Appearance:
- 100% opacity
- No outline
- Full physics
- Normal rendering
```

### On-Screen Instructions

When in placement mode, you'll see:
```
┌─────────────────────────────────────────────────┐
│  PLACEMENT MODE                                  │
│  Move mouse to position • Right-click to place  │
│  ESC to cancel                                   │
└─────────────────────────────────────────────────┘
```

## Supported Objects

All objects follow this placement system:

| Object | Preview | Physics After Placement |
|--------|---------|------------------------|
| 🟥 **Box** | Semi-transparent red | Dynamic rigid body |
| 🔵 **Circle** | Semi-transparent blue | Dynamic rigid body |
| ⬛ **Ground** | Semi-transparent gray | Static platform (full width) |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **ESC** | Cancel current placement |
| **Right-Click** | Finalize placement |

## Technical Details

### Preview Implementation

```typescript
Preview Object Properties:
- isStatic: true (no gravity)
- isSensor: true (no collisions)
- opacity: 0.5
- strokeStyle: '#ffffff'
- lineWidth: 3
- collisionFilter: disabled
```

### Finalization Process

1. **Capture** current mouse position
2. **Remove** preview object from physics world
3. **Create** new object at same position
4. **Enable** physics interactions
5. **Add** to permanent objects collection

### Performance

- **60 FPS** preview updates
- **Zero lag** cursor tracking
- **Instant** finalization
- **No jitter** during movement

## Ground Placement Fix

### Issue (Before)
Ground appeared half-sized or cut off at screen edges.

### Solution (After)
- **Full workspace width** automatically calculated
- **Centered** at x = canvas.width / 2
- **Responsive** to window resizing
- **Always visible** across entire bottom

```typescript
Ground Dimensions:
- Width: Full canvas width
- Height: 60px
- Position: Bottom of workspace - 30px
- Static: Always
```

## Best Practices

### For Users

1. **Take your time** - preview mode has no time limit
2. **Position carefully** - right-click only when satisfied
3. **Use ESC freely** - cancel and try again if needed
4. **Check placement** - ensure object is where you want it

### For Educators

1. **Demonstrate first** - show students the placement flow
2. **Encourage precision** - emphasize careful positioning
3. **Explain physics** - discuss why preview has no gravity
4. **Practice sessions** - let students get comfortable

## Troubleshooting

### Preview Not Appearing
**Solution:** Make sure no other preview is active. Press ESC to clear.

### Object Placed in Wrong Spot
**Solution:** Can't undo yet - use the Clear button or delete individually.

### Preview Stuck
**Solution:** Press ESC to cancel, then try again.

### Right-Click Opens Menu
**Solution:** This should be prevented. If it happens, make sure you're clicking inside the canvas area.

## Future Enhancements

- [ ] **Rotation** during preview (mouse wheel)
- [ ] **Scaling** during preview (shift + mouse wheel)
- [ ] **Snap to grid** option
- [ ] **Alignment guides** when near other objects
- [ ] **Undo/Redo** for placements
- [ ] **Clone** existing object into preview
- [ ] **Multi-select** and group placement

## Comparison: Old vs New

### Old System ❌
```
1. Click tool button
2. Object instantly placed
3. Random position
4. Physics immediately active
5. Hard to position precisely
```

### New System ✅
```
1. Click tool button
2. Preview appears
3. Move to exact position
4. Right-click to confirm
5. Perfect placement every time
```

## Code Example

### Starting a Preview
```typescript
const handleAddBox = () => {
  const obj: PhysicsObject = {
    id: uuidv4(),
    type: 'box',
    x: 400,  // Initial position (overridden by mouse)
    y: 300,
    width: 80,
    height: 80,
    color: '#e74c3c',
    label: `box-${Date.now()}`
  };
  startPreview(obj);  // Enters preview mode
};
```

### Finalizing Placement
```typescript
// Right-click handler
const handleRightClick = (e: MouseEvent) => {
  if (hasPreview) {
    e.preventDefault();
    finalizePreview();  // Converts preview to real object
  }
};
```

### Canceling Preview
```typescript
// ESC key handler
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && hasPreview) {
    cancelPreview();  // Removes preview
  }
};
```

## Educational Value

This placement system teaches important concepts:

1. **Planning** - Think before placing
2. **Precision** - Exact positioning matters
3. **Reversibility** - Can cancel and retry
4. **State Management** - Preview vs final states
5. **User Control** - Explicit confirmation required

## Accessibility

- ✅ Clear visual feedback
- ✅ Keyboard alternative (ESC to cancel)
- ✅ On-screen instructions
- ⚠️ No screen reader support yet (planned)

---

**The placement system makes VIRTUAL-LAB more intuitive and precise, enabling better experimental design and learning outcomes.**
