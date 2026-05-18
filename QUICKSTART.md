# 🚀 VIRTUAL-LAB Quick Start Guide

Get up and running with VIRTUAL-LAB in 5 minutes!

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

## First Steps

### 1. Welcome Screen
When you first open VIRTUAL-LAB, you'll see a welcome screen with 4 options:

- **Start Building**: Jump right into creating experiments
- **Browse Templates**: Explore pre-built physics scenarios
- **Collaborate**: Join or create a multiplayer room
- **Learn How**: View detailed instructions

### 2. Try Your First Experiment

1. Click **"Start Building"**
2. Click the **"Box"** button
3. Move your mouse to position the box
4. **Right-click** to place it
5. Click the **"Circle"** button
6. Move your mouse to position the circle
7. **Right-click** to place it
8. Watch them fall and interact with physics!

> 💡 **New Placement System**: Objects now appear as semi-transparent previews that follow your cursor. Right-click to place, ESC to cancel.

### 3. Create a Pendulum

1. Click **"Circle"** to add a ball
2. Move your mouse to position it
3. **Right-click** to place the ball
4. Click **"Circle"** again for the pivot point
5. Position near the top of the screen
6. **Right-click** to place
7. Click **"Rope"** in the toolbar
8. Click on the first circle
9. Click on the second circle
10. Watch your pendulum swing!

### 4. View Analytics

1. Click on any moving object
2. The analytics dashboard appears on the right
3. See real-time velocity, energy, and position data
4. Watch the energy transformation graphs

### 5. Try a Template

1. Click the **"Load"** button
2. Select **"Simple Pendulum"** from the templates
3. Click **"Load Experiment"**
4. Explore the pre-built scenario!

## Keyboard Shortcuts

- `ESC`: Cancel object placement preview
- `Space`: Play/Pause (coming soon)
- `R`: Reset (coming soon)
- `C`: Clear all (coming soon)
- `S`: Save (coming soon)
- `L`: Load (coming soon)
- `H`: Help (coming soon)

## Basic Controls

| Button | Function | How to Use |
|--------|----------|------------|
| 🟥 Box | Add rectangular object | Click → Move mouse → Right-click to place |
| 🔵 Circle | Add circular object | Click → Move mouse → Right-click to place |
| ⬛ Ground | Add static platform | Click → Move mouse → Right-click to place |
| 🟡 Rope | Create flexible connection | Click → Select object 1 → Select object 2 |
| 🟣 Spring | Create elastic connection | Click → Select object 1 → Select object 2 |
| 🟠 Pivot | Create rotation point | Click → Select object 1 → Select object 2 |
| ▶️ Play/Pause | Control simulation | Click to pause/resume physics |
| 🔄 Reset | Return to initial state | Click to restart current experiment |
| 🗑️ Clear | Remove all objects | Click to delete everything |
| 💾 Save | Store experiment | Click to save your setup |
| 📂 Load | Open experiments | Click to browse saved/template experiments |
| 👥 Room | Multiplayer mode | Click to join/create collaboration room |
| ❓ Help | View instructions | Click for detailed help |

### Mouse Controls

| Action | Result |
|--------|--------|
| **Left-Click** | Select object or start constraint |
| **Right-Click** | Finalize object placement |
| **Click + Drag** | Move objects around (after placement) |
| **ESC Key** | Cancel current placement preview |

## Multiplayer Setup (Optional)

To enable real-time collaboration:

### Start the Server

```bash
# In a separate terminal
node server/index.js
```

The WebSocket server will start on port 3001.

### Create a Room

1. Click the **"Room"** button
2. Enter your name
3. Click **"Create Room"**
4. Share the Room ID with collaborators

### Join a Room

1. Click the **"Room"** button
2. Enter your name
3. Enter the Room ID
4. Click **"Join Room"**

Now you can build experiments together in real-time!

## Example Experiments to Try

### 1. Pendulum Energy Conservation
```
Goal: Observe energy transformation
1. Load "Simple Pendulum" template
2. Click on the ball to select it
3. Watch the energy graphs
4. Notice how total energy stays constant
```

### 2. Bridge Structural Test
```
Goal: Test structural integrity
1. Load "Bridge Structure" template
2. Drop heavy boxes on the bridge
3. Observe how forces distribute
4. See if the structure holds or collapses
```

### 3. Spring Catapult
```
Goal: Study elastic energy
1. Load "Spring Catapult" template
2. Add a ball on the platform
3. Watch it launch!
4. Analyze the energy transfer
```

### 4. Custom Rube Goldberg Machine
```
Goal: Build a chain reaction
1. Start with a ground platform
2. Add boxes and circles
3. Connect with ropes and springs
4. Create a complex mechanism
5. Watch the cascade of events!
```

## Tips & Tricks

### 🎯 Creating Good Experiments

1. **Start with Ground**: Always add a ground/platform first
2. **Layer Objects**: Stack objects for complex structures
3. **Use Constraints Wisely**: Too many can slow things down
4. **Save Often**: Don't lose your work!

### 📊 Understanding Analytics

- **Velocity**: Shows how fast the object is moving
- **Kinetic Energy**: Energy of motion (increases with speed)
- **Potential Energy**: Energy of position (increases with height)
- **Total Energy**: Should stay constant (conservation law!)

### 🔗 Constraint Tips

- **Rope**: Great for pendulums and hanging objects
- **Spring**: Perfect for bouncy, elastic connections
- **Pivot**: Best for hinges and rotating platforms

### 👥 Collaboration Best Practices

1. Communicate before adding objects
2. Use different areas of the canvas
3. Take turns building sections
4. Save your collaborative work

## Troubleshooting

### Objects Fall Through the Ground
**Solution**: Make sure you added a "Ground" platform first

### Can't See Analytics
**Solution**: Click on an object to select it

### Multiplayer Not Working
**Solution**: 
1. Check if server is running: `node server/index.js`
2. Verify both users have same Room ID
3. Check browser console for errors

### Simulation is Laggy
**Solution**: 
1. Clear some objects (click "Clear" button)
2. Reduce number of constraints
3. Close analytics dashboard if not needed

### Build Errors
**Solution**:
```bash
rm -rf node_modules
npm install
npm run dev
```

## Next Steps

1. **Explore Templates**: Try all 3 pre-built experiments
2. **Create Your Own**: Build custom physics scenarios
3. **Learn Physics**: Use Help button to understand concepts
4. **Collaborate**: Invite friends to build together
5. **Save & Share**: Create a library of experiments

## Learning Resources

### Physics Concepts
- Conservation of Energy
- Newton's Laws of Motion
- Simple Harmonic Motion
- Elastic vs Inelastic Collisions
- Structural Mechanics

### In-App Help
Click the **"Help"** button for detailed instructions on:
- Adding objects
- Creating constraints
- Using analytics
- Multiplayer collaboration
- Physics concepts

## Production Build

When ready to deploy:

```bash
npm run build
```

This creates an optimized `dist/index.html` file ready for deployment.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Need More Help?

- 📖 Read the [README.md](README.md) for full documentation
- 🎨 Check [FEATURES.md](FEATURES.md) for feature details
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting guide
- 💬 Open an issue on GitHub
- 📧 Contact support

---

**Have fun building and experimenting! 🔬🎉**
