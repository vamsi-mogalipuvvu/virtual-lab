import Matter from 'matter-js';
import {
  MATTER_BASE_TIMESTEP_MS,
  WORLD_PIXELS_PER_METER
} from './constants';

const STEP_SECONDS = MATTER_BASE_TIMESTEP_MS / 1000;

export type DebugForceCategory = 'external' | 'internal';

export interface DebugForceVector {
  bodyId: number;
  name: string;
  category: DebugForceCategory;
  point: Matter.Vector;
  force: Matter.Vector;
}

export type DebugForceVectorMap = Map<number, DebugForceVector[]>;

interface DrawVectorOverlayOptions {
  showVelocities: boolean;
  showForces: boolean;
  bodies: Matter.Body[];
  externalForces: DebugForceVectorMap;
  internalForces: DebugForceVectorMap;
  pausedVelocityByBodyId: Map<number, Matter.Vector>;
  pausedDynamicKeys: Set<string>;
  gravityMps2: number;
  getBodyKey: (body: Matter.Body) => string;
  getBodyMass: (body: Matter.Body) => number;
}

const BLUE = '#2563eb';
const RED = '#dc2626';
const MIN_ARROW_LENGTH = 16;
const MAX_ARROW_LENGTH = 118;
const FORCE_PIXELS_PER_NEWTON = 0.08;
const VELOCITY_PIXELS_PER_MPS = 18;

export const createDebugForceVectorMap = (): DebugForceVectorMap => new Map();

export const addDebugForceVector = (
  target: DebugForceVectorMap,
  body: Matter.Body,
  name: string,
  force: Matter.Vector,
  point: Matter.Vector,
  category: DebugForceCategory
) => {
  if (!Number.isFinite(force.x) || !Number.isFinite(force.y)) return;
  if (Math.hypot(force.x, force.y) < 0.001) return;

  const vectors = target.get(body.id) ?? [];
  vectors.push({
    bodyId: body.id,
    name,
    category,
    point: { x: point.x, y: point.y },
    force: { x: force.x, y: force.y }
  });
  target.set(body.id, vectors);
};

export const worldVelocityToMetersPerSecond = (velocity: Matter.Vector): Matter.Vector => ({
  x: velocity.x / WORLD_PIXELS_PER_METER / STEP_SECONDS,
  y: velocity.y / WORLD_PIXELS_PER_METER / STEP_SECONDS
});

export const calculateSpringDebugForce = (
  bodyA: Matter.Body,
  bodyB: Matter.Body,
  pointA: Matter.Vector,
  pointB: Matter.Vector,
  config: { naturalLength: number; springConstant: number; dampingRatio: number },
  getWorldPoint: (body: Matter.Body, localPoint: Matter.Vector) => Matter.Vector
) => {
  const start = getWorldPoint(bodyA, pointA);
  const end = getWorldPoint(bodyB, pointB);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthWorld = Math.hypot(dx, dy);
  if (lengthWorld < 0.001) return null;

  const dirX = dx / lengthWorld;
  const dirY = dy / lengthWorld;
  const extensionMeters = (lengthWorld - config.naturalLength) / WORLD_PIXELS_PER_METER;
  const relVelocityWorld = {
    x: bodyB.velocity.x - bodyA.velocity.x,
    y: bodyB.velocity.y - bodyA.velocity.y
  };
  const relVelocityMps =
    ((relVelocityWorld.x * dirX + relVelocityWorld.y * dirY) / WORLD_PIXELS_PER_METER) / STEP_SECONDS;

  const massA = bodyA.isStatic ? Infinity : bodyA.mass;
  const massB = bodyB.isStatic ? Infinity : bodyB.mass;
  const effectiveMass =
    Number.isFinite(massA) && Number.isFinite(massB)
      ? (massA * massB) / (massA + massB)
      : Number.isFinite(massA) ? massA : Number.isFinite(massB) ? massB : 0;
  const dampingCoefficient = effectiveMass > 0
    ? config.dampingRatio * 2 * Math.sqrt(config.springConstant * effectiveMass)
    : 0;

  const forceNewtons = config.springConstant * extensionMeters + dampingCoefficient * relVelocityMps;
  return {
    start,
    end,
    forceOnA: { x: forceNewtons * dirX, y: forceNewtons * dirY },
    forceOnB: { x: -forceNewtons * dirX, y: -forceNewtons * dirY }
  };
};

const isInfrastructureBody = (body: Matter.Body) => {
  const label = (body.label || '').toLowerCase();
  return label.includes('ground') || label === 'mouse constraint';
};

const formatMagnitude = (value: number, unit: string) => {
  const abs = Math.abs(value);
  if (abs >= 1000) return `${value.toExponential(2)} ${unit}`;
  if (abs >= 10) return `${value.toFixed(1)} ${unit}`;
  return `${value.toFixed(2)} ${unit}`;
};

const drawArrow = (
  ctx: CanvasRenderingContext2D,
  start: Matter.Vector,
  direction: Matter.Vector,
  magnitude: number,
  label: string,
  color: string,
  laneIndex: number,
  pixelsPerUnit: number
) => {
  if (!Number.isFinite(magnitude) || magnitude < 0.001) return;

  const directionLength = Math.hypot(direction.x, direction.y);
  if (directionLength < 0.001) return;

  const unitX = direction.x / directionLength;
  const unitY = direction.y / directionLength;
  const normalX = -unitY;
  const normalY = unitX;
  const laneOffset = laneIndex === 0 ? 0 : ((laneIndex % 2 === 0 ? -1 : 1) * Math.ceil(laneIndex / 2) * 8);
  const origin = {
    x: start.x + normalX * laneOffset,
    y: start.y + normalY * laneOffset
  };
  const length = Math.max(MIN_ARROW_LENGTH, Math.min(MAX_ARROW_LENGTH, magnitude * pixelsPerUnit));
  const end = {
    x: origin.x + unitX * length,
    y: origin.y + unitY * length
  };
  const headSize = 7;
  const angle = Math.atan2(unitY, unitX);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - Math.cos(angle - Math.PI / 6) * headSize, end.y - Math.sin(angle - Math.PI / 6) * headSize);
  ctx.lineTo(end.x - Math.cos(angle + Math.PI / 6) * headSize, end.y - Math.sin(angle + Math.PI / 6) * headSize);
  ctx.closePath();
  ctx.fill();

  ctx.font = '12px Arial';
  ctx.textBaseline = 'middle';
  const textX = end.x + unitX * 6 + normalX * 4;
  const textY = end.y + unitY * 6 + normalY * 4;
  ctx.fillStyle = color;
  ctx.fillText(label, textX, textY);
  ctx.restore();
};

export const drawDebugVectorOverlays = (
  ctx: CanvasRenderingContext2D,
  options: DrawVectorOverlayOptions
) => {
  const {
    showVelocities,
    showForces,
    bodies,
    externalForces,
    internalForces,
    pausedVelocityByBodyId,
    pausedDynamicKeys,
    gravityMps2,
    getBodyKey,
    getBodyMass
  } = options;

  if (!showVelocities && !showForces) return;

  bodies.forEach((body) => {
    if (isInfrastructureBody(body)) return;

    const wasDynamicBeforePause = pausedDynamicKeys.has(getBodyKey(body));
    const velocity = body.isStatic && wasDynamicBeforePause
      ? pausedVelocityByBodyId.get(body.id) ?? body.velocity
      : body.velocity;
    const velocityMps = worldVelocityToMetersPerSecond(velocity);
    const speedMps = Math.hypot(velocityMps.x, velocityMps.y);

    if (showVelocities && (speedMps > 0.001 || wasDynamicBeforePause || !body.isStatic)) {
      drawArrow(
        ctx,
        body.position,
        velocityMps,
        speedMps,
        formatMagnitude(speedMps, 'm/s'),
        BLUE,
        0,
        VELOCITY_PIXELS_PER_MPS
      );
    }

    if (!showForces) return;

    const forceVectors: DebugForceVector[] = [];
    if (!body.isStatic || wasDynamicBeforePause) {
      const mass = getBodyMass(body);
      if (gravityMps2 > 0 && Number.isFinite(mass)) {
        forceVectors.push({
          bodyId: body.id,
          name: 'Gravity',
          category: 'external',
          point: { x: body.position.x, y: body.position.y },
          force: { x: 0, y: mass * gravityMps2 }
        });
      }
    }
    forceVectors.push(...(externalForces.get(body.id) ?? []));
    forceVectors.push(...(internalForces.get(body.id) ?? []));

    forceVectors.forEach((forceVector, index) => {
      const magnitude = Math.hypot(forceVector.force.x, forceVector.force.y);
      drawArrow(
        ctx,
        forceVector.point,
        forceVector.force,
        magnitude,
        formatMagnitude(magnitude, 'N'),
        forceVector.category === 'external' ? BLUE : RED,
        index,
        FORCE_PIXELS_PER_NEWTON
      );
    });
  });
};
