# 🎯 VIRTUAL-LAB Quick Reference Card

## Object Placement Workflow

```
┌─────────────────────────────────────────────────────────┐
│  1. CLICK TOOL         → Preview appears                │
│  2. MOVE MOUSE         → Position object                │
│  3. RIGHT-CLICK        → Place permanently              │
│  4. ESC (optional)     → Cancel without placing         │
└─────────────────────────────────────────────────────────┘
```

## Mouse Controls

| Action | Function |
|--------|----------|
| **Left-Click** | Select object / Start constraint |
| **Right-Click** | Finalize placement (in preview mode) |
| **Click + Drag** | Move objects (after placement) |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **ESC** | Cancel current placement preview |

## Visual States

### Preview Mode (Before Placement)
```
Appearance:
  • 50% transparent
  • White glowing outline
  • Follows cursor
  • No physics/collisions
```

### Placed Mode (After Right-Click)
```
Appearance:
  • 100% solid
  • No outline
  • Full physics enabled
  • Can be selected/dragged
```

## Objects

| Tool | Color | Preview | After Placement |
|------|-------|---------|-----------------|
| 🟥 Box | Red | Semi-transparent | Dynamic rigid body |
| 🔵 Circle | Blue | Semi-transparent | Dynamic rigid body |
| ⬛ Ground | Gray | Semi-transparent | Static platform |

## Constraints

| Type | Color | How to Create |
|------|-------|---------------|
| 🟡 Rope | Orange | Click tool → Click object 1 → Click object 2 |
| 🟣 Spring | Purple | Click tool → Click object 1 → Click object 2 |
| 🟠 Pivot | Orange | Click tool → Click object 1 → Click object 2 |

## Common Workflows

### Simple Pendulum
```
1. Box/Circle → Position top → Right-click
2. Circle → Position below → Right-click  
3. Rope → Click top → Click bottom
```

### Stack of Blocks
```
1. Ground → Position bottom → Right-click
2. Box → Position on ground → Right-click
3. Box → Position on first box → Right-click
4. Repeat as needed
```

### Spring System
```
1. Circle → Position left → Right-click
2. Circle → Position right → Right-click
3. Spring → Click left circle → Click right circle
```

## Toolbar Buttons

| Button | Function |
|--------|----------|
| 🟥 **Box** | Add rectangular object |
| 🔵 **Circle** | Add circular object |
| ⬛ **Ground** | Add floor/platform |
| 🟡 **Rope** | Connect with rope |
| 🟣 **Spring** | Connect with spring |
| 🟠 **Pivot** | Create hinge |
| ▶️ **Play** | Resume simulation |
| ⏸️ **Pause** | Pause simulation |
| 🔄 **Reset** | Restart experiment |
| 🗑️ **Clear** | Delete all objects |
| 💾 **Save** | Save experiment |
| 📂 **Load** | Load experiment |
| 👥 **Room** | Multiplayer |
| ❓ **Help** | Instructions |

## Analytics Metrics

When object is selected:

| Metric | Formula | Unit |
|--------|---------|------|
| **Velocity** | √(vx² + vy²) | m/s |
| **Kinetic Energy** | ½mv² | Joules |
| **Potential Energy** | mgh | Joules |
| **Total Energy** | KE + PE | Joules |
| **Angle** | Rotation | Degrees |

## Tips & Tricks

### 💡 Best Practices

1. **Start with Ground**: Always place a ground platform first
2. **Take Your Time**: Preview has no time limit
3. **Use ESC Freely**: Cancel and retry if position isn't perfect
4. **Check Before Right-Click**: Make sure object is where you want it
5. **Save Often**: Don't lose your work!

### ⚡ Quick Tips

- **Precise Placement**: Move slowly for exact positioning
- **Quick Placement**: Right-click immediately for random spot
- **Cancel Anytime**: ESC works even mid-drag
- **Multiple Objects**: Can place many in sequence

### 🎯 Common Mistakes

| Mistake | Solution |
|---------|----------|
| Forgot to right-click | Object still in preview - right-click to place |
| Context menu appears | Make sure you're inside the canvas |
| Object fell immediately | Was already placed - use preview for next one |
| Can't select object | It's still in preview mode - right-click first |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Preview stuck on screen | Press ESC to clear |
| Can't place object | Another preview active - ESC first |
| Object in wrong spot | ESC to cancel, try again |
| Ground too small | Fixed! Now uses full width automatically |

## Multiplayer Quick Guide

```
CREATE ROOM:
  1. Click "Room" button
  2. Enter your name
  3. Click "Create Room"
  4. Share Room ID with friends

JOIN ROOM:
  1. Click "Room" button
  2. Enter your name
  3. Enter Room ID
  4. Click "Join Room"
```

## Physics Concepts

| Concept | Demonstration |
|---------|---------------|
| **Gravity** | Objects fall downward |
| **Collisions** | Objects bounce off each other |
| **Energy Conservation** | Total energy stays constant |
| **Oscillation** | Pendulum/spring motion |
| **Friction** | Objects slow down |

## Export/Import

| Action | Location |
|--------|----------|
| **Save** | Stored in browser (LocalStorage) |
| **Load** | Retrieve from LocalStorage |
| **Templates** | Pre-built experiments |
| **Share** | Use multiplayer rooms |

## System Requirements

- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Canvas API support
- 1024x768 minimum resolution

## Performance

| Metric | Target |
|--------|--------|
| Physics FPS | 60 |
| Preview Update | 60 FPS |
| Analytics Refresh | 10 Hz |
| Input Lag | < 16ms |

---

**Print this card for quick reference while using VIRTUAL-LAB!**
