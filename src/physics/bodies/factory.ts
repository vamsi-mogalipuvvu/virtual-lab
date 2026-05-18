import Matter from 'matter-js';
import { PhysicsObject } from '../../types/physics';
import { MATERIALS, KG_M2_TO_MATTER_DENSITY } from '../constants';

/**
 * Creates a Matter.js body with properties derived from physical laws and materials.
 */
export const createRigidBody = (obj: PhysicsObject): Matter.Body | null => {
  const material = MATERIALS.WOOD; // Default material

  const base: Matter.IBodyDefinition = {
    label: obj.label ?? obj.id,
    isStatic: !!obj.isStatic,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0,
    restitution: 0,
    density: material.density * KG_M2_TO_MATTER_DENSITY,
    slop: 0.05
  } as Matter.IChamferableBodyDefinition;

  let body: Matter.Body | null = null;

  if (obj.type === 'box') {
    body = Matter.Bodies.rectangle(obj.x, obj.y, obj.width ?? 80, obj.height ?? 80, base as Matter.IChamferableBodyDefinition);
  } else if (obj.type === 'circle') {
    body = Matter.Bodies.circle(obj.x, obj.y, obj.radius ?? 40, base as Matter.IChamferableBodyDefinition);
  } else if (obj.type === 'ground') {
    body = Matter.Bodies.rectangle(obj.x, obj.y, obj.width ?? 1200, obj.height ?? 80, {
      ...base,
      isStatic: true,
      friction: 0,
      frictionStatic: 0,
      restitution: 0
    } as Matter.IChamferableBodyDefinition);
  }

  if (body) {
    (body as any).physicalFriction = obj.type === 'ground' ? 0.8 : material.friction;
    (body as any).physicalRestitution = obj.type === 'ground' ? 0.1 : material.restitution;
  }

  if (body && obj.placementState === 'preview') {
    body.isSensor = true;
    (body as any).opacity = 0.5;
  }

  return body;
};

/**
 * Updates a body's mass in KG, automatically adjusting Matter.js density.
 */
export const applyMassKg = (body: Matter.Body, massKg: number) => {
  if (body.isStatic) return;
  
  // In Matter, Mass = Area * Density.
  // We want to set the mass directly but keep it consistent with the physical area.
  Matter.Body.setMass(body, massKg);
};
