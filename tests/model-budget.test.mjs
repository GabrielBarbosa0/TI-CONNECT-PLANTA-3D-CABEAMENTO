import test from 'node:test';
import assert from 'node:assert/strict';
import { floors, backboneLinks } from '../model-data.mjs';
import { budget } from '../budget-data.mjs';
import { routeCable } from '../model-helpers.mjs';

test('matches all budgeted equipment quantities and placement per floor', () => {
  for (const floor of floors) {
    for (const allocation of floor.budget.items) {
      const item = budget.items.find((entry) => entry.id === allocation.id);
      if (item.group !== 'Equipamentos') continue;
      const actual = floor.devices.filter((device) => device.budgetId === item.id);
      assert.equal(actual.length, allocation.quantity, `${floor.name}: ${item.model}`);
      actual.forEach((device) => assert.equal(device.model, item.model));
    }
  }
  assert.deepEqual(floors.map((floor) => floor.devices.filter((device) => device.type === 'endpoint').length), [1, 6, 14, 10]);
  assert.deepEqual(floors.map((floor) => floor.devices.filter((device) => device.type === 'ups').length), [1, 2, 1, 1]);
  assert.equal(Math.round(floors.reduce((sum, floor) => sum + floor.budget.total, 0) * 100), Math.round(budget.total * 100));
});

test('each terminal and AP has a dedicated cable to the appropriate switch', () => {
  for (const floor of floors) {
    const access = floor.devices.find((device) => device.type === 'switch' && !device.name.includes('BB'));
    const distribution = floor.devices.find((device) => device.name.includes('SW-BB'));
    const rack = floor.devices.find((device) => device.type === 'rack');
    [access, distribution].forEach((device) => {
      assert.equal(device.x, rack.x);
      assert.equal(device.z, rack.z + 0.06);
    });
    const terminals = floor.devices.filter((device) => device.type === 'endpoint');
    const servers = floor.devices.filter((device) => device.type === 'server');
    assert.ok(terminals.length + servers.length + 1 <= access.ports);
    floor.devices.filter((device) => ['endpoint', 'server', 'ap', 'guestAp'].includes(device.type)).forEach((device) => {
      const cable = floor.cables.filter((entry) => entry.toName === device.name);
      assert.equal(cable.length, 1, `${device.name} must have its own cable`);
      assert.equal(cable[0].fromName, ['ap', 'guestAp'].includes(device.type) ? distribution.name : access.name);
    });
    assert.ok(!floor.devices.some((device) => device.name.startsWith('CLI')));
    assert.equal(distribution.sfpUsed, [1, 2, 2, 1][floor.id]);
    floor.cables.forEach((cable) => {
      const path = routeCable(cable.from, cable.to, {via: cable.via});
      for (let i = 1; i < path.length; i++) assert.ok(path[i][0] === path[i-1][0] || path[i][1] === path[i-1][1]);
    });
  }
});


test('backbone has three adjacent duplex links and six SFP ends', () => {
  assert.deepEqual(backboneLinks.map((link) => [link.fromFloor, link.toFloor]), [[0, 1], [1, 2], [2, 3]]);
  for (const floor of floors) {
    const ends = backboneLinks.filter((link) => link.fromFloor === floor.id || link.toFloor === floor.id).length;
    assert.equal(ends, floor.devices.find((device) => device.name.includes('SW-BB')).sfpUsed);
  }
  assert.equal(backboneLinks.length * 2, budget.items.find((item) => item.id === 22).quantity);
});
