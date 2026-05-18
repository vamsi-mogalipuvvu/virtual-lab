# 🔧 Constraint Troubleshooting Guide

## Issue: Constraints Not Visible

If you're clicking Rope, Spring, or Pivot buttons but can't see the constraints, follow this guide.

---

## Quick Fix: Enabled Default Rendering

I've temporarily **enabled default Matter.js rendering** for all constraints so you can see them immediately.

**Current Status:**
- ✅ Ropes: Now visible (black lines with anchors)
- ✅ Springs: Now visible (spring coils)
- ✅ Pivots: Now visible (thick black lines)

---

## How to Create Constraints

### Step-by-Step Process

#### 1. **Add Two Objects First**
```
1. Click "Box" or "Circle"
2. Position first object
3. Right-click to place
4. Click "Box" or "Circle" again
5. Position second object
6. Right-click to place
```

**Important:** You need TWO objects before creating a constraint!

#### 2. **Create Rope**
```
1. Click "Rope" button (toolbar highlights)
2. Click on FIRST object (console shows selection)
3. Click on SECOND object
4. Rope appears connecting them
```

#### 3. **Create Spring**
```
1. Click "Spring" button
2. Click on FIRST object
3. Click on SECOND object
4. Spring appears connecting them
```

#### 4. **Create Pivot**
```
1. Click "Pivot" button
2. Click on FIRST object (should be static/anchor)
3. Click on SECOND object (dynamic)
4. Pivot appears connecting them
```

---

## Debugging Checklist

### ✅ Before Creating Constraint

1. **Open Browser Console** (F12)
2. **Check for objects:**
   ```
   Look for logs like:
   ✅ Body added: { id: "...", type: "box", ... }
   ```

3. **Verify at least 2 objects exist:**
   - Click bug icon (bottom-right)
   - Check "Bodies" count (should be ≥ 2)

### ✅ During Constraint Creation

1. **Click constraint button** (Rope/Spring/Pivot)
2. **Console should show:**
   ```
   Tool selected: rope/spring/pivot
   ```

3. **Click first object:**
   ```
   🖱️ Body selected: { id: "...", label: "box-123..." }
   🔗 First body selected for constraint: box-123...
   ```

4. **Click second object:**
   ```
   🖱️ Body selected: { id: "...", label: "circle-456..." }
   🔗 Second body selected for constraint: circle-456...
   🔗 Creating constraint between: box-123... and circle-456...
   ```

5. **Constraint created:**
   ```
   🔗 Attempting to create constraint: { type: "rope", ... }
   ✅ Found bodies: { bodyA: {...}, bodyB: {...} }
   🟡 Rope constraint created: { length: 100, stiffness: 0.7 }
   ✅ Constraint added to world: { id: "...", type: "rope", totalConstraints: 1 }
   ```

### ✅ After Constraint Created

1. **Check Debug Panel:**
   - Click bug icon (bottom-right)
   - "Constraints" count should increase
   - Should show connection in list

2. **Visual Check:**
   - Rope: Black line between objects
   - Spring: Coiled line between objects
   - Pivot: Thick black line between objects

---

## Common Issues & Solutions

### Issue 1: "Can't see constraint after clicking"

**Possible Causes:**
- Only clicked one object
- Clicked same object twice
- Objects too close together

**Solution:**
```
1. Check console for error messages
2. Make sure you clicked TWO DIFFERENT objects
3. Try creating objects farther apart
4. Check constraint count in debug panel
```

### Issue 2: "Constraint button doesn't highlight"

**Possible Causes:**
- Button click not registering
- State not updating

**Solution:**
```
1. Click button again
2. Check console for tool selection log
3. Try different constraint type
```

### Issue 3: "Clicking object doesn't select it"

**Possible Causes:**
- Clicking empty space
- Object in preview mode (not placed yet)

**Solution:**
```
1. Make sure objects are PLACED (right-clicked)
2. Click center of object, not edges
3. Check console for selection log
4. Try clicking different objects
```

### Issue 4: "No logs in console"

**Possible Causes:**
- Console not open
- Logs being filtered

**Solution:**
```
1. Press F12 to open console
2. Clear any filters
3. Look for emoji prefixes (🔗 ✅ 🖱️)
4. Refresh page and try again
```

---

## Expected Console Output

### Successful Constraint Creation:
```
🔗 Attempting to create constraint: {
  type: "rope",
  bodyA: "box-1234567890",
  bodyB: "circle-9876543210",
  length: 100
}

✅ Found bodies: {
  bodyA: { label: "box-1234567890", pos: {x: 300, y: 200} },
  bodyB: { label: "circle-9876543210", pos: {x: 400, y: 300} }
}

🟡 Rope constraint created: {
  length: 141.42,
  stiffness: 0.7
}

✅ Constraint added to world: {
  id: "abc-123-def-456",
  type: "rope",
  totalConstraints: 1,
  matterConstraint: {
    length: 141.42,
    stiffness: 0.7,
    renderType: "line",
    visible: true
  }
}

🌍 Total constraints in world: 1
```

### Every 60 frames:
```
🎨 AfterRender called - Frame: 60
🔗 Drawing constraint: {
  type: "rope",
  length: 141.42,
  stiffness: 0.7,
  renderType: "line",
  from: "box-1234567890",
  to: "circle-9876543210"
}
```

---

## Visual Examples

### Rope Appearance
```
  ●─────────────●
  (black line connecting two objects)
```

### Spring Appearance
```
  ●╱╲╱╲╱╲╱╲╱╲●
  (coiled spring pattern)
```

### Pivot Appearance
```
    ╱ ╱ ╱
  ═══════
     ●
     │
    ●●●
  (hatch pattern with thick line)
```

---

## Testing Workflow

### Test 1: Simple Rope
```
1. Add ground (position at bottom, right-click)
2. Add circle (position top-left, right-click)
3. Add circle (position top-right, right-click)
4. Click "Rope"
5. Click left circle
6. Click right circle
7. ✅ Should see black line connecting them
8. ✅ Circles should swing when physics runs
```

### Test 2: Spring System
```
1. Add box (left side, right-click)
2. Add box (right side, right-click)
3. Click "Spring"
4. Click left box
5. Click right box
6. ✅ Should see spring coils connecting them
7. ✅ Boxes should oscillate back and forth
```

### Test 3: Pendulum with Pivot
```
1. Add small circle at top (right-click) - this is anchor
2. Add larger circle below (right-click) - this is bob
3. Click "Pivot"
4. Click top circle (anchor)
5. Click bottom circle (bob)
6. ✅ Should see thick line with hatch pattern
7. ✅ Bottom circle should swing
```

---

## Current Rendering Mode

**Mode: DEFAULT MATTER.JS RENDERING**

I've enabled the default Matter.js rendering temporarily so constraints are visible immediately. This means:

- ✅ Ropes show as black lines
- ✅ Springs show with spring coils
- ✅ Pivots show as thick lines
- ✅ Anchor points visible

**Custom Engineering Rendering:**
The custom black-and-white engineering diagram rendering with:
- Zig-zag springs
- Hatch pattern pivots
- Clean black ropes

...is implemented in the `afterRender` hook and will also draw on top of the default rendering.

---

## Debug Panel Usage

### Open Debug Panel
1. Click **bug icon** (bottom-right corner)
2. Panel shows:
   - Body count
   - Constraint count
   - List of all bodies
   - List of all constraints

### Check Constraints
```
Constraints Section:
─────────────────────
box-123 ↔ circle-456
Length: 141.4

box-789 ↔ circle-012
Length: 100.0
```

If constraint count is 0 after clicking:
- Constraint creation failed
- Check console for error logs

---

## Next Steps

1. **Try creating a constraint** using the steps above
2. **Check console logs** for any errors
3. **Look for visual constraint** between objects
4. **Verify in debug panel** that constraint was added

If you still don't see constraints:
- Copy and paste the console output
- Let me know which step failed
- I'll help debug further

---

**The constraints should now be visible with default rendering enabled!** 🎉
