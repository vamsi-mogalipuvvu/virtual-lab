# VIRTUAL-LAB - Collaborative Physics Sandbox

A real-time, collaborative 2D physics simulation platform for teaching complex physics and engineering concepts online. Built with React, Matter.js, and Socket.io.

## Features

### 🎯 Interactive Physics Canvas
- Drag and drop physics objects (boxes, circles, ground)
- Real-time physics simulation using Matter.js
- Visual feedback and interaction

### 🔗 Physics Constraints System
- **Rope**: Flexible connection between objects
- **Spring**: Elastic connection with customizable stiffness
- **Pivot**: Fixed rotation point connection
- Multi-step constraint creation workflow

### 📊 Real-Time Analytics Dashboard
- Live velocity tracking
- Kinetic and potential energy monitoring
- Total energy conservation visualization
- Interactive line charts using Recharts
- Position and angle readouts

### 💾 Experiment Library
- Save and load custom physics scenarios
- Pre-configured templates:
  - Simple Pendulum
  - Bridge Structure
  - Spring Catapult
- Browse and manage saved experiments

### 👥 Multi-User Collaboration
- Real-time WebSocket synchronization
- Room-based collaboration
- User presence indicators
- Synchronized object creation across users

### 🎮 Simulation Controls
- Play/Pause simulation
- Reset to initial state
- Clear workspace
- Object selection and analytics

## Tech Stack

**Frontend:**
- React.js with TypeScript
- Matter.js (2D physics engine)
- Tailwind CSS (styling)
- Recharts (data visualization)
- Socket.io-client (real-time communication)
- Lucide React (icons)

**Backend:**
- Node.js
- Express.js
- Socket.io (WebSocket server)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. (Optional) Start the WebSocket server for multiplayer:
```bash
node server/index.js
```

4. Open your browser to `http://localhost:5173`

## Usage Guide

### Adding Objects
1. Click on **Box**, **Circle**, or **Ground** buttons in the toolbar
2. A semi-transparent preview appears and follows your cursor
3. Move your mouse to position the object precisely
4. **Right-click** to finalize placement and enable physics
5. Press **ESC** to cancel placement if needed
6. After placement, click and drag objects to move them around

### Creating Constraints
1. Click on **Rope**, **Spring**, or **Pivot** button
2. Click on the first object to connect
3. Click on the second object to complete the connection
4. The constraint will appear between the two objects

### Viewing Analytics
1. Click on any object in the simulation
2. The analytics dashboard will appear on the right
3. View real-time metrics:
   - Velocity
   - Kinetic Energy
   - Potential Energy
   - Position and Angle

### Saving Experiments
1. Click the **Save** button
2. Enter a name and description
3. Your experiment is saved to the library

### Loading Experiments
1. Click the **Load** button
2. Browse available experiments
3. Click **Load Experiment** on any template

### Multiplayer Mode
1. Click the **Room** button
2. Choose **Create Room** or **Join Room**
3. Enter your name
4. Share the Room ID with collaborators
5. Work together in real-time!

## Project Structure

```
virtual-lab/
├── src/
│   ├── components/
│   │   ├── Toolbar.tsx              # Main toolbar with controls
│   │   ├── PhysicsCanvas.tsx        # Canvas component
│   │   ├── AnalyticsDashboard.tsx   # Real-time analytics
│   │   ├── ExperimentLibrary.tsx    # Save/load interface
│   │   └── RoomManager.tsx          # Multiplayer room UI
│   ├── hooks/
│   │   ├── usePhysics.ts            # Matter.js integration
│   │   └── useWebSocket.ts          # Socket.io client
│   ├── types/
│   │   └── physics.ts               # TypeScript definitions
│   ├── App.tsx                      # Main application
│   └── main.tsx                     # Entry point
├── server/
│   └── index.js                     # WebSocket server
└── public/                          # Static assets
```

## Physics Concepts Demonstrated

- **Conservation of Energy**: Total energy remains constant in isolated systems
- **Kinetic vs Potential Energy**: Energy transformation during motion
- **Elastic Collisions**: Objects bounce realistically
- **Structural Mechanics**: Bridge and connection stability
- **Simple Harmonic Motion**: Pendulum and spring oscillations
- **Force and Acceleration**: Newton's laws in action

## Educational Use Cases

1. **Pendulum Experiments**: Study period, amplitude, and energy transfer
2. **Projectile Motion**: Analyze trajectories and landing points
3. **Structural Engineering**: Test bridge designs and failure points
4. **Spring Mechanics**: Explore Hooke's law and oscillations
5. **Collision Analysis**: Study momentum conservation
6. **Machine Design**: Build complex mechanisms with multiple constraints

## Future Enhancements

- [ ] MongoDB integration for cloud storage
- [ ] More object types (polygons, custom shapes)
- [ ] Motor constraints with controllable speed
- [ ] Force vector visualization
- [ ] Slow-motion and replay features
- [ ] Export simulation data
- [ ] Mobile touch support
- [ ] Collaborative annotations
- [ ] Assignment submission system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for educational purposes.

## Acknowledgments

- Matter.js for the excellent physics engine
- Recharts for beautiful data visualization
- Socket.io for seamless real-time communication
