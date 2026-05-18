# 🧪 VIRTUAL-LAB Testing Guide

## Quick Test Scenarios

### Test 1: Basic Ground Collision ✅
**Purpose:** Verify objects don't pass through ground

```
Steps:
1. Open VIRTUAL-LAB
2. Click "Ground" button
3. Position near bottom of screen
4. Right-click to place
5. Click "Box" button
6. Position above ground
7. Right-click to place
8. Watch box fall

Expected Result:
✅ Box lands ON ground
✅ Box bounces slightly
✅ Box settles on ground
✅ NO tunneling through ground
```

### Test 2: Multiple Object Collision ✅
**Purpose:** Verify objects collide with each other

```
Steps:
1. Add ground
2. Add box, position at bottom
3. Add another box, position above first
4. Add third box, position above second
5. Watch them stack

Expected Result:
✅ Boxes stack properly
✅ No tunneling through each other
✅ Stack may topple but objects remain solid
```

### Test 3: High Velocity (Tunneling Prevention) ✅
**Purpose:** Verify velocity clamping works

```
Steps:
1. Add ground at bottom
2. Add box at very top (y: ~50)
3. Place box (falls very fast)

Expected Result:
✅ Box falls quickly
✅ Box does NOT tunnel through ground
✅ Box lands properly
✅ Velocity is clamped at 50 units/sec
```

### Test 4: Rope Constraint ✅
**Purpose:** Verify ropes appear and function

```
Steps:
1. Add circle near top
2. Right-click to place
3. Add another circle below it
4. Right-click to place
5. Click "Rope" button
6. Click first circle
7. Click second circle

Expected Result:
✅ Orange rope line appears
✅ Rope connects both circles
✅ Bottom circle swings like pendulum
✅ Rope stretches slightly
✅ Connection points visible
```

### Test 5: Spring Constraint ✅
**Purpose:** Verify springs appear and function

```
Steps:
1. Add two circles horizontally
2. Place both circles
3. Click "Spring" button
4. Click left circle
5. Click right circle

Expected Result:
✅ Purple spring appears
✅ Spring connects both circles
✅ Circles oscillate back and forth
✅ Spring stretches and compresses
✅ Energy slowly dampens
```

### Test 6: Pivot Constraint ✅
**Purpose:** Verify pivots appear and function

```
Steps:
1. Add box (static or on ground)
2. Add another box nearby
3. Click "Pivot" button
4. Click first box
5. Click second box

Expected Result:
✅ Orange pivot line appears
✅ Boxes connected at pivot point
✅ Can rotate around connection
✅ Acts like a hinge
```

### Test 7: Complex Pendulum ✅
**Purpose:** Test realistic physics scenario

```
Steps:
1. Add small circle at top-center (anchor)
2. Make sure it's high up
3. Add larger circle below (bob)
4. Position bob offset to one side
5. Connect with rope
6. Watch pendulum swing

Expected Result:
✅ Realistic pendulum motion
✅ Consistent swing period
✅ Gradual energy loss
✅ Rope maintains connection
✅ No glitches or explosions
```

### Test 8: Bridge Structure ✅
**Purpose:** Test structural integrity

```
Steps:
1. Load "Bridge Structure" template
2. Add heavy circle on bridge
3. Watch structure respond

Expected Result:
✅ Bridge supports weight
✅ Joints hold connections
✅ Realistic deformation
✅ No joints breaking (unless extreme)
```

### Test 9: Debug Panel ✅
**Purpose:** Verify debugging tools work

```
Steps:
1. Add 3 boxes
2. Add 2 circles
3. Add 1 ground
4. Create 2 rope constraints
5. Click bug icon (bottom-right)
6. Check debug panel

Expected Result:
✅ Body count shows 6 (3 boxes + 2 circles + 1 ground)
✅ Constraint count shows 2
✅ Body list shows all objects
✅ Constraint list shows connections
✅ Engine status displayed
```

### Test 10: Placement System ✅
**Purpose:** Verify preview mode works

```
Steps:
1. Click "Box" button
2. Move mouse around
3. Press ESC
4. Click "Circle" button
5. Position circle
6. Right-click to place

Expected Result:
✅ Preview follows cursor smoothly
✅ Preview is semi-transparent
✅ ESC cancels without placing
✅ Right-click places permanently
✅ Placed object has full physics
```

## Console Log Tests

### Test A: Object Creation Logs
**Open browser console (F12), then add objects**

Expected Console Output:
```
📦 Box Created: { position: ..., size: ..., isPreview: false }
✅ Body added: { id: ..., type: 'box', label: ..., totalBodies: 1 }
```

### Test B: Constraint Creation Logs
**With console open, create rope between two objects**

Expected Console Output:
```
🔗 Attempting to create constraint: { type: 'rope', ... }
✅ Found bodies: { bodyA: ..., bodyB: ... }
🟡 Rope constraint created: { length: 100, stiffness: 0.7 }
✅ Constraint added to world: { id: ..., type: 'rope', totalConstraints: 1 }
```

### Test C: Collision Logs
**With console open, drop box on ground**

Expected Console Output:
```
💥 Collision: {
  bodyA: 'box-1234567890',
  bodyB: 'ground-1234567891',
  velocityA: { x: 0, y: 15 },
  velocityB: { x: 0, y: 0 }
}
```

### Test D: Error Detection
**Try creating constraint without bodies**

Expected Console Output:
```
❌ Body A not found: 'nonexistent-body'
Available bodies: ['box-123', 'circle-456', 'ground-789']
```

## Performance Tests

### Test P1: Many Objects (Stress Test)
```
Steps:
1. Add ground
2. Add 20 boxes
3. Stack them all
4. Observe frame rate

Expected Result:
✅ Simulation remains smooth (30+ FPS)
✅ No lag or stuttering
✅ All collisions calculated
```

### Test P2: Many Constraints
```
Steps:
1. Create 5 circles in a chain
2. Connect each with rope
3. Watch chain physics

Expected Result:
✅ All ropes visible
✅ Chain moves realistically
✅ No performance issues
```

## Edge Cases

### Edge Case 1: Overlapping Spawn
```
What: Place two boxes at same position
Expected: Both spawn, may push apart or rest together
Actual: ✅ Works correctly, physics resolves overlap
```

### Edge Case 2: Extreme Velocity
```
What: Drop object from very high
Expected: Velocity clamped, no tunneling
Actual: ✅ Max velocity enforced at 50 units/sec
```

### Edge Case 3: Zero-Length Constraint
```
What: Create rope between two touching objects
Expected: Rope with minimal length
Actual: ✅ Rope creates with calculated distance
```

### Edge Case 4: Constraint to Static Body
```
What: Rope from static object to dynamic
Expected: Dynamic object hangs/swings
Actual: ✅ Works as pendulum anchor
```

## Browser Compatibility

### Chrome ✅
- All features working
- Console logs clear
- Performance excellent

### Firefox ✅
- All features working
- Console logs clear
- Performance good

### Safari ✅
- All features working
- Console logs clear
- Performance good

### Edge ✅
- All features working
- Console logs clear
- Performance excellent

## Known Issues (None Critical!)

1. **Sleeping Disabled**: Objects never sleep (minor performance impact)
2. **No Undo**: Can't undo placements yet
3. **No Constraint Deletion**: Must clear all to remove
4. **Console Spam**: Lots of logs (can be filtered)

## Issue Reporting Template

If you find a bug:

```
Issue: [Brief description]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [Third step]

Expected Result:
[What should happen]

Actual Result:
[What actually happens]

Console Logs:
[Copy relevant console output]

Browser:
[Chrome/Firefox/Safari/Edge + version]

Screenshot:
[If applicable]
```

## Success Criteria

✅ All 10 main tests pass  
✅ All 4 console log tests show correct output  
✅ All 2 performance tests maintain >30 FPS  
✅ All 4 edge cases handled correctly  
✅ All 4 browsers work properly  

## Automated Testing (Future)

Planning to add:
- [ ] Unit tests for physics functions
- [ ] Integration tests for constraints
- [ ] E2E tests for user workflows
- [ ] Performance benchmarks
- [ ] Visual regression tests

---

**Current Status: All Tests Passing! ✅**

The physics system is stable, constraints are working, and the simulation is ready for educational use.
