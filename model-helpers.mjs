// Routes are schematic cable-tray runs, not an installation plan.
export function routeCable(from, to, { via = [] } = {}) {
  const stops = [from, ...via, to];
  const points = [[...from]];

  for (let index = 1; index < stops.length; index += 1) {
    const [endX, endZ] = stops[index];
    const [startX, startZ] = points.at(-1);
    if (startX !== endX && startZ !== endZ) {
      const midZ = (startZ + endZ) / 2;
      points.push([startX, midZ], [endX, midZ]);
    }
    if (points.at(-1)[0] !== endX || points.at(-1)[1] !== endZ) {
      points.push([endX, endZ]);
    }
  }

  return points;
}

// Translate the camera and its orbit target equally: no change to view direction.
export function moveViewOnAxis(position, target, axis, nextTarget) {
  const delta = nextTarget - target[axis];
  position[axis] += delta;
  target[axis] = nextTarget;
}
