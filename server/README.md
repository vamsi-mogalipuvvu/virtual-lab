# VIRTUAL-LAB WebSocket Server

This is the real-time collaboration server for VIRTUAL-LAB.

## Starting the Server

```bash
node server/index.js
```

The server will start on port 3001 by default.

## Features

- Room-based collaboration
- Real-time object synchronization
- User presence tracking
- Physics state broadcasting

## Environment Variables

- `PORT`: Server port (default: 3001)

## API Events

### Client → Server

- `join-room`: Join a collaboration room
  ```javascript
  { roomId: string, userName: string }
  ```

- `object-added`: Broadcast new object
  ```javascript
  { roomId: string, object: PhysicsObject }
  ```

- `constraint-added`: Broadcast new constraint
  ```javascript
  { roomId: string, constraint: PhysicsConstraint }
  ```

- `physics-update`: Sync physics state
  ```javascript
  { roomId: string, data: any }
  ```

### Server → Client

- `room-state`: Initial room state on join
- `room-users`: Updated list of users in room
- `object-added`: New object from another user
- `constraint-added`: New constraint from another user
- `physics-update`: Physics state from another user

## Notes

- Rooms are automatically cleaned up when empty
- Each user gets a random color for identification
- State is only synchronized while users are connected (no persistence)
