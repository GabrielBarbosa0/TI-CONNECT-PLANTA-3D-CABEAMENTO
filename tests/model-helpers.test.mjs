import test from 'node:test';
import assert from 'node:assert/strict';
import { routeCable } from '../model-helpers.mjs';

test('keeps cables on horizontal and vertical runs', () => {
  const points = routeCable([0.65, 2.75], [9.25, 1]);
  assert.deepEqual(points[0], [0.65, 2.75]);
  assert.deepEqual(points.at(-1), [9.25, 1]);
  assert.ok(points.length > 2);
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    assert.notDeepEqual(current, previous);
    assert.ok(previous[0] === current[0] || previous[1] === current[1]);
  }
});

test('preserves a shared straight bus without extra bends', () => {
  assert.deepEqual(routeCable([-5.6, -0.8], [6.2, -0.8]), [
    [-5.6, -0.8],
    [6.2, -0.8]
  ]);
});

test('routes explicit waypoints as orthogonal runs', () => {
  assert.deepEqual(routeCable([0, 0], [4, 3], { via: [[0, 2], [4, 2]] }), [
    [0, 0], [0, 2], [4, 2], [4, 3]
  ]);
});
