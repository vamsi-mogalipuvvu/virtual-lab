# 🔗 How to Use Constraints - Step-by-Step Guide

## Quick Start: Creating Your First Constraint

### ⚡ Fast Track (3 Steps)

1. **Add 2 objects** (Box or Circle) and place them with right-click
2. **Click constraint button** (Rope, Spring, or Pivot)
3. **Click object 1**, then **click object 2**

Done! The constraint appears automatically.

---

## Detailed Instructions

### 📦 Step 1: Add Objects

#### Add First Object
```
1. Click "Box" button (or "Circle")
2. Move mouse to position object
3. Right-click to place
```

#### Add Second Object
```
1. Click "Box" button (or "Circle") again
2. Move mouse to different position
3. Right-click to place
```

**Tip:** Make sure objects are at least 50-100px apart for clear visualization.

---

### 🔗 Step 2: Choose Constraint Type

#### Rope (Flexible Connection)
```
Click "Rope" button in toolbar
```
**Use for:** Pendulums, hanging objects, flexible connections

#### Spring (Elastic Connection)
```
Click "Spring" button in toolbar
```
**Use for:** Oscillators, elastic connections, bouncy systems

#### Pivot (Fixed Hinge)
```
Click "Pivot" button in toolbar
```
**Use for:** Rotating arms, hinges, fixed rotation points

---

### 👆 Step 3: Connect Objects

#### Click First Object
```
1. Click on the CENTER of the first object
2. Console shows: "First body selected for constraint"
3. Object is now "bodyA"
```

#### Click Second Object
```
1. Click on the CENTER of the second object
2. Console shows: "Second body selected for constraint"
3. Console shows: "Rope/Spring/Pivot constraint created"
4. Constraint appears immediately!
```

---

## Visual Examples

### Example 1: Simple Rope Pendulum
```
Step-by-step:
1. Add Circle (top center, position at y: 100)
2. Right-click to place
3. Add Circle (below first, position at y: 300)
4. Right-click to place
5. Click "Rope" button
6. Click top circle
7. Click bottom circle

Result:
    ●  ← Anchor
    │  ← Rope (black line)
    │
    ●  ← Swinging bob
```

### Example 2: Spring Oscillator
```
Step-by-step:
1. Add Box (left side, x: 200)
2. Right-click to place
3. Add Box (right side, x: 500)
4. Right-click to place
5. Click "Spring" button
6. Click left box
7. Click right box

Result:
  ┌─┐ ╱╲╱╲╱╲╱╲ ┌─┐
  └─┘         └─┘
   ↔  Spring  ↔
```

### Example 3: Rotating Arm (Pivot)
```
Step-by-step:
1. Add Circle (top, static anchor)
2. Right-click to place
3. Add Box (below, will rotate)
4. Right-click to place
5. Click "Pivot" button
6. Click circle (anchor)
7. Click box (rotating part)

Result:
    ╱╱╱╱╱  ← Hatch pattern
  ═══●═══  ← Support
     │     ← Pivot axis
    ┌─┐    ← Rotating object
    └─┘
```

---

## Common Patterns

### Pattern 1: Chain
```
Objects: Circle → Circle → Circle → Circle

Constraints:
1. Rope: Circle1 to Circle2
2. Rope: Circle2 to Circle3
3. Rope: Circle3 to Circle4

Result: Hanging chain that swings
```

### Pattern 2: Double Pendulum
```
Objects: 
- Static Circle (top)
- Circle (middle)
- Circle (bottom)

Constraints:
1. Rope: Static to Middle
2. Rope: Middle to Bottom

Result: Chaotic double pendulum motion
```

### Pattern 3: Bridge
```
Objects: Box → Box → Box → Box

Constraints:
1. Pivot: Box1 to Box2
2. Pivot: Box2 to Box3
3. Pivot: Box3 to Box4

Result: Connected bridge structure
```

### Pattern 4: Spring Network
```
Objects:
- Box (left)
- Box (right)
- Box (top)
- Box (bottom)

Constraints:
1. Spring: Left to Right
2. Spring: Top to Bottom
3. Spring: Left to Top
4. Spring: Right to Bottom

Result: 4-way spring system
```

---

## Tips & Tricks

### ✅ Best Practices

1. **Start Simple**
   - Create 2 objects first
   - Add 1 constraint
   - Test physics
   - Then add more

2. **Use Ground**
   - Add ground first
   - Place objects above ground
   - Prevents objects falling off screen

3. **Proper Spacing**
   - Keep objects 50-100px apart
   - Makes constraints visible
   - Easier to click

4. **Static Anchors**
   - For pivots and pendulums
   - Use one static object (doesn't move)
   - Connect dynamic object to it

### ⚠️ Common Mistakes

1. **Clicking Same Object Twice**
   ```
   ❌ Click Box1 → Click Box1 (nothing happens)
   ✅ Click Box1 → Click Box2 (constraint created)
   ```

2. **Not Placing Objects**
   ```
   ❌ Click Box → Click Rope (object still in preview)
   ✅ Click Box → Right-click → Click Rope
   ```

3. **Wrong Order for Pivots**
   ```
   ❌ Click dynamic → Click static (works but looks wrong)
   ✅ Click static → Click dynamic (proper anchor)
   ```

4. **Objects Too Close**
   ```
   ❌ Objects overlapping (constraint hard to see)
   ✅ Objects well separated (constraint clear)
   ```

---

## Verification Checklist

### ✅ After Creating Constraint

1. **Visual Check**
   - [ ] Line/spring appears between objects
   - [ ] Both objects connected
   - [ ] Constraint moves with objects

2. **Console Check** (F12)
   - [ ] "Constraint added to world" message
   - [ ] No error messages
   - [ ] Constraint count increased

3. **Debug Panel Check**
   - [ ] Click bug icon (bottom-right)
   - [ ] Constraint count shows +1
   - [ ] Connection listed in constraints section

4. **Physics Check**
   - [ ] Objects react to constraint
   - [ ] Rope limits distance
   - [ ] Spring stretches/compresses
   - [ ] Pivot allows rotation

---

## Keyboard Shortcuts

- **ESC** - Cancel constraint creation
- **F12** - Open console for debugging

---

## Troubleshooting

### "Nothing happens when I click object"

**Solutions:**
1. Make sure object is placed (not in preview)
2. Click center of object, not edge
3. Check console for selection message
4. Try clicking different object

### "Constraint doesn't appear"

**Solutions:**
1. Check console for errors
2. Open debug panel - verify constraint count
3. Make sure you clicked TWO DIFFERENT objects
4. Try refreshing page

### "Can't select second object"

**Solutions:**
1. ESC to cancel current constraint
2. Try clicking constraint button again
3. Verify first object was selected (check console)
4. Click clearly on second object

### "Objects fall through ground"

**Solutions:**
1. Add ground platform first
2. Position ground at bottom (y: ~550)
3. Right-click to place ground
4. Then add other objects above it

---

## Console Commands (Debug)

Open console (F12) and check for these messages:

### Successful Constraint Creation:
```javascript
🔗 Attempting to create constraint: { type: "rope", ... }
✅ Found bodies: { bodyA: {...}, bodyB: {...} }
🟡 Rope constraint created: { length: 100, ... }
✅ Constraint added to world: { totalConstraints: 1 }
```

### Selection Messages:
```javascript
🖱️ Body selected: { id: "...", label: "box-123" }
🔗 First body selected for constraint: box-123
🔗 Second body selected for constraint: circle-456
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│ CONSTRAINT QUICK REFERENCE                      │
├─────────────────────────────────────────────────┤
│                                                 │
│ ROPE (Flexible)                                 │
│   • Click "Rope" button                         │
│   • Click object 1                              │
│   • Click object 2                              │
│   • Result: Black line connecting objects       │
│                                                 │
│ SPRING (Elastic)                                │
│   • Click "Spring" button                       │
│   • Click object 1                              │
│   • Click object 2                              │
│   • Result: Coiled spring connecting objects    │
│                                                 │
│ PIVOT (Hinge)                                   │
│   • Click "Pivot" button                        │
│   • Click anchor object (static)                │
│   • Click rotating object (dynamic)             │
│   • Result: Fixed rotation point                │
│                                                 │
│ CANCEL                                          │
│   • Press ESC key                               │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**Now try creating your first constraint!** 🚀

Start with a simple rope pendulum:
1. Add 2 circles
2. Click "Rope"
3. Click first circle
4. Click second circle
5. Watch them swing! 🎉
