import { budget } from "./budget-data.mjs";

export const COLORS = {
  floor: 0xe7e2d6,
  floorTop: 0xf5f0e5,
  wall: 0xc9c3b7,
  glass: 0x8ac3c0,
  parking: 0x9da7ad,
  stock: 0xb77b49,
  server: 0x4761a6,
  switch: 0x138f72,
  firewall: 0xb8414b,
  endpoint: 0xc97832,
  ap: 0x7f579e,
  guestAp: 0x18a8b8,
  copper: 0xe07a2f,
  guest: 0x18a8b8,
  backbone: 0x2458d8,
  bath: 0x77a6be,
  leisure: 0x74a86f,
  meeting: 0x8a70a8,
  office: 0xd2a14a,
  archive: 0xa79670,
  stair: 0x96a2a8
};

const originalFloors = [
  {
    id: 0,
    name: "Térreo",
    rooms: [
      { name: "Estacionamento", x: -4.1, z: 0, w: 13.3, d: 8.5, color: COLORS.parking, walls: false },
      { name: "Entrada veículos", x: 6.2, z: -3.2, w: 9.6, d: 2.1, color: COLORS.parking, walls: false },
      { name: "Recepção", x: 8.75, z: 1.55, w: 4.4, d: 5.3, color: COLORS.glass },
      { name: "Banheiro M T", x: 5.45, z: 0.225, w: 2.2, d: 2.65, color: COLORS.bath },
      { name: "Banheiro F T", x: 5.45, z: 2.875, w: 2.2, d: 2.65, color: COLORS.bath },
      { name: "Estoque", x: 2.15, z: 1.55, w: 4.4, d: 5.3, color: COLORS.stock },
      { name: "Escada", x: -1.3, z: 3.05, w: 2.5, d: 2.4, color: COLORS.stair, stairs: true }
    ],
    doors: [
      { name: "Porta recepção", orientation: "vertical", line: 10.95, start: 0.65, end: 1.85 },
      { name: "Saída escada", orientation: "horizontal", line: 1.85, start: -2.1, end: -0.45, marker: false },
      { name: "Acesso banheiro M", orientation: "vertical", line: 6.55, start: -0.35, end: 0.85, marker: false },
      { name: "Acesso banheiro F", orientation: "vertical", line: 6.55, start: 2.25, end: 3.45, marker: false },
      { name: "Acesso estoque", orientation: "horizontal", line: -1.1, start: 1.45, end: 2.65, marker: false }
    ],
    devices: [
      { type: "rack", name: "RACK-T", x: 3.55, z: 2.75 },
      { type: "switch", name: "SW-T-01", x: 2.15, z: 2.2 },
      { type: "switch", name: "SW-BB-T", x: 0.75, z: 0.35 },
      { type: "firewall", name: "FW-01", x: 0.65, z: 2.75 },
      { type: "ap", name: "AP-CORP-T", x: -3.6, z: -1.7 },
      { type: "guestAp", name: "AP-VIS-01", x: 9.25, z: 1.0 },
      { type: "endpoint", name: "PT-EST-01", x: 3.65, z: 0.0 }
    ],
    zones: [
      {
        name: "SSID Visitantes\nVLAN 30",
        x: 9.25,
        z: 1.0,
        radius: 2.05,
        color: COLORS.guest
      }
    ]
  },
  {
    id: 1,
    name: "1º andar",
    rooms: [
      { name: "Suporte Técnico N3", x: 0, z: -1.2, w: 21.5, d: 6.1, color: COLORS.office },
      { name: "Sala Servidores", x: -6.65, z: 3.05, w: 8.2, d: 2.4, color: COLORS.server },
      { name: "Escada", x: -1.3, z: 3.05, w: 2.5, d: 2.4, color: COLORS.stair, stairs: true },
      { name: "Apoio Técnico N3", x: 1.35, z: 3.05, w: 2.8, d: 2.4, color: COLORS.office },
      { name: "Banheiro M 1", x: 4.75, z: 3.05, w: 4.0, d: 2.4, color: COLORS.bath },
      { name: "Banheiro F 1", x: 8.75, z: 3.05, w: 4.0, d: 2.4, color: COLORS.bath }
    ],
    doors: [
      { name: "Porta servidores", orientation: "horizontal", line: 1.85, start: -4.35, end: -3.2, marker: false },
      { name: "Saída escada", orientation: "horizontal", line: 1.85, start: -2.1, end: -0.45, marker: false },
      { name: "Acesso apoio N3", orientation: "horizontal", line: 1.85, start: 0.8, end: 1.9, marker: false },
      { name: "Acesso banheiro M", orientation: "horizontal", line: 1.85, start: 4.1, end: 5.3, marker: false },
      { name: "Acesso banheiro F", orientation: "horizontal", line: 1.85, start: 8.1, end: 9.3, marker: false }
    ],
    customWalls: [
      { orientation: "vertical", line: -3.05, start: -4.25, end: 0.7 }
    ],
    devices: [
      { type: "server", name: "SRV-01", x: -8.2, z: 2.4 },
      { type: "server", name: "BKP-01", x: -6.3, z: 2.4 },
      { type: "rack", name: "RACK-CPD", x: -4.7, z: 2.4 },
      { type: "switch", name: "SW-N3-01", x: -3.9, z: 2.4 },
      { type: "switch", name: "SW-BB-1", x: 0.75, z: 0.35 },
      { type: "ap", name: "AP-1-01", x: 2.2, z: -2.6 },
      ...namedDevices("N3", n3Points())
    ],
  },
  {
    id: 2,
    name: "2º andar",
    rooms: [
      { name: "Telemarketing", x: 0, z: -1.2, w: 21.5, d: 6.1, color: COLORS.office },
      { name: "Bancadas Telemarketing", x: -6.65, z: 3.05, w: 8.2, d: 2.4, color: COLORS.office },
      { name: "Escada", x: -1.3, z: 3.05, w: 2.5, d: 2.4, color: COLORS.stair, stairs: true },
      { name: "Banheiro M 2", x: 4.75, z: 3.05, w: 4.0, d: 2.4, color: COLORS.bath },
      { name: "Banheiro F 2", x: 8.75, z: 3.05, w: 4.0, d: 2.4, color: COLORS.bath }
    ],
    doors: [
      { name: "Saída escada", orientation: "horizontal", line: 1.85, start: -2.1, end: -0.45, marker: false },
      { name: "Porta bancadas", orientation: "horizontal", line: 1.85, start: -6.2, end: -5.0, marker: false },
      { name: "Porta banheiro M", orientation: "horizontal", line: 1.85, start: 4.1, end: 5.3, marker: false },
      { name: "Porta banheiro F", orientation: "horizontal", line: 1.85, start: 8.1, end: 9.3, marker: false }
    ],
    devices: [
      { type: "rack", name: "RACK-2", x: -8.4, z: 2.8 },
      { type: "switch", name: "SW-TMK-01", x: -7.6, z: 2.8 },
      { type: "switch", name: "SW-BB-2", x: 0.75, z: 0.35 },
      { type: "ap", name: "AP-2-01", x: 4.0, z: 0.8 },
      ...gridDevices("TMK", 14, -5.4, -2.4, 1.85, 1.35)
    ],
  },
  {
    id: 3,
    name: "3º andar",
    rooms: [
      { name: "Reunião", x: -8.1, z: -1.75, w: 5.3, d: 5.0, color: COLORS.meeting },
      { name: "Setores", x: -1.4, z: -1.2, w: 8.1, d: 6.1, color: COLORS.office },
      { name: "Sala Chefe", x: 8.25, z: -1.75, w: 4.9, d: 5.0, color: COLORS.meeting },
      { name: "Descompressão", x: -8.125, z: 3.05, w: 5.25, d: 2.4, color: COLORS.leisure },
      { name: "Copa", x: -4.0, z: 3.05, w: 2.8, d: 2.4, color: COLORS.stock },
      { name: "Escada", x: -1.3, z: 3.05, w: 2.5, d: 2.4, color: COLORS.stair, stairs: true },
      { name: "Arquivo RH", x: 1.975, z: 3.05, w: 4.05, d: 2.4, color: COLORS.archive },
      { name: "Banheiro M 3", x: 5.7, z: 3.05, w: 3.4, d: 2.4, color: COLORS.bath },
      { name: "Banheiro F 3", x: 9.05, z: 3.05, w: 3.3, d: 2.4, color: COLORS.bath }
    ],
    doors: [
      { name: "Saída escada", orientation: "horizontal", line: 1.85, start: -2.1, end: -0.45, marker: false },
      { name: "Porta reunião", orientation: "vertical", line: -5.45, start: -2.25, end: -1.05, marker: false },
      { name: "Porta copa", orientation: "horizontal", line: 1.85, start: -4.65, end: -3.55, marker: false },
      { name: "Porta descomp.", orientation: "horizontal", line: 1.85, start: -7.05, end: -5.85, marker: false },
      { name: "Porta arquivo", orientation: "horizontal", line: 1.85, start: 2.05, end: 3.2, marker: false },
      { name: "Porta banheiro M", orientation: "horizontal", line: 1.85, start: 5.05, end: 6.2, marker: false },
      { name: "Porta banheiro F", orientation: "horizontal", line: 1.85, start: 8.1, end: 9.25, marker: false },
      { name: "Porta chefe", orientation: "vertical", line: 5.8, start: -2.3, end: -1.1, marker: false }
    ],
    omitWalls: [
      { orientation: "vertical", line: -5.45, start: 0.75, end: 1.85 },
      { orientation: "vertical", line: 2.65, start: -4.25, end: 1.85 }
    ],
    devices: [
      { type: "rack", name: "RACK-3", x: -9.0, z: -3.2 },
      { type: "switch", name: "SW-3-01", x: -8.2, z: -3.2 },
      { type: "switch", name: "SW-BB-3", x: 0.75, z: 0.35 },
      { type: "ap", name: "AP-3-01", x: -5.9, z: 2.8 },
      { type: "endpoint", name: "VG-01", x: -7.8, z: 2.55 },
      { type: "endpoint", name: "REU-01", x: -8.2, z: -1.2 },
      { type: "endpoint", name: "CHF-01", x: 8.1, z: -2.5 },
      ...sectorDevices()
    ],
  }
];

function gridDevices(prefix, count, startX, startZ, stepX, stepZ) {
  return gridPoints(count, startX, startZ, stepX, stepZ).map((point, index) => ({
    type: "endpoint",
    name: `${prefix}-${String(index + 1).padStart(2, "0")}`,
    x: point[0],
    z: point[1]
  }));
}

function namedDevices(prefix, points) {
  return points.map((point, index) => ({
    type: "endpoint",
    name: `${prefix}-${String(index + 1).padStart(2, "0")}`,
    x: point[0],
    z: point[1]
  }));
}

function gridPoints(count, startX, startZ, stepX, stepZ) {
  return Array.from({ length: count }, (_, index) => {
    const col = index % 7;
    const row = Math.floor(index / 7);
    return [startX + col * stepX, startZ + row * stepZ];
  });
}

function n3Points() {
  return [
    [1.2, -0.35],
    [2.55, -0.35],
    [3.9, -0.35],
    [1.2, -1.35],
    [2.55, -1.35],
    [3.9, -1.35]
  ];
}

function sectorPoints() {
  return [
    [-3.55, -1.55],
    [-2.25, -1.55],
    [-0.95, -1.55],
    [0.35, -1.55],
    [1.55, -1.55],
    [-2.25, -2.55],
    [-0.95, -2.55]
  ];
}

function sectorDevices() {
  const names = ["N2-01", "N2-02", "INF-01", "INF-02", "FIN-01", "RH-01", "ADM-01"];
  return sectorPoints().map(([x, z], index) => ({
    type: "endpoint",
    name: names[index],
    x,
    z
  }));
}

const accessItem = [2, 3, 4, 3];
const accessPorts = [8, 16, 24, 16];
const item = (id) => budget.items.find((entry) => entry.id === id);
const position = (device) => [device.x, device.z];

export const floors = originalFloors.map((floor) => {
  const rack = floor.devices.find((device) => device.type === 'rack');
  const devices = floor.devices.map((original) => {
    const device = { ...original };
    if (device.type === 'rack') device.budgetId = 1;
    if (device.type === 'switch') {
      const distribution = device.name.includes('BB');
      device.budgetId = distribution ? 5 : accessItem[floor.id];
      device.ports = distribution ? 8 : accessPorts[floor.id];
      device.sfpPorts = distribution ? 2 : 0;
      device.sfpUsed = distribution ? [1, 2, 2, 1][floor.id] : 0;
      device.x = rack.x;
      device.z = rack.z + 0.06;
      device.height = distribution ? 0.77 : 0.60;
      device.inRack = true;
    }
    if (device.type === 'firewall') {
      device.budgetId = 6;
      device.ports = 5;
      device.x = rack.x;
      device.z = rack.z + 0.06;
      device.height = 0.43;
      device.inRack = true;
    }
    if (device.type === 'server') device.budgetId = device.name.startsWith('BKP') ? 10 : 9;
    if (device.type === 'ap' || device.type === 'guestAp') {
      device.budgetId = device.type === 'guestAp' ? 8 : 7;
      device.height = 0.94;
    }
    if (device.type === 'endpoint') device.model = 'Tomada RJ45 Cat6 · Central Cabos 3402';
    if (device.budgetId) device.model = item(device.budgetId).model;
    return device;
  });
  const upsLocations = floor.id === 1
    ? [[-8.2, 3.65, 'UPS-SRV-01'], [-6.3, 3.65, 'UPS-BKP-01']]
    : [[rack.x + 1.25, rack.z, `UPS-${floor.id === 0 ? 'T' : floor.id}`]];
  devices.push(...upsLocations.map(([x, z, name]) => ({
    type: 'ups', x, z, name, budgetId: floor.id === 1 ? 12 : 11,
    model: item(floor.id === 1 ? 12 : 11).model
  })));
  const distribution = devices.find((device) => device.name.includes('SW-BB'));
  const access = devices.find((device) => device.type === 'switch' && !device.name.includes('BB'));
  const gateway = devices.find((device) => device.type === 'firewall');
  const cables = [];
  const connect = (from, to, type, via = []) => cables.push({from: position(from), to: position(to), fromName: from.name, toName: to.name, type, via, fromHeight: from.height, toHeight: to.height});
  connect(distribution, access, 'copper');
  if (gateway) connect(gateway, distribution, 'copper');
  // The bus is a shared pathway: every RJ45 outlet has its own cable to the rack.
  const busZ = [0, -0.85, -0.8, -0.95][floor.id];
  devices.filter((device) => device.type === 'endpoint').forEach((device) =>
    connect(access, device, 'copper', [[rack.x, busZ], [device.x, busZ]])
  );
  devices.filter((device) => device.type === 'server').forEach((device) => connect(access, device, 'copper'));
  devices.filter((device) => ['ap', 'guestAp'].includes(device.type)).forEach((device) =>
    connect(distribution, device, device.type === 'guestAp' ? 'guest' : 'copper', [[rack.x, busZ], [device.x, busZ]])
  );
  cables.push({from: position(distribution), to: [0.2, 0], fromName: distribution.name, toName: 'SHAFT', type: 'backbone', fromHeight: distribution.height});
  return {...floor, devices, cables, budget: budget.floors[floor.id]};
});

// Three duplex point-to-point optical links, with two transceivers per link.
export const backboneLinks = floors.slice(0, -1).map((floor, index) => ({
  fromFloor: floor.id,
  toFloor: floors[index + 1].id,
  fromName: floor.devices.find((device) => device.name.includes('SW-BB')).name,
  toName: floors[index + 1].devices.find((device) => device.name.includes('SW-BB')).name
}));
