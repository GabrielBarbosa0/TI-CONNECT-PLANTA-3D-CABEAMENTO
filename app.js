import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";

const FLOOR_HEIGHT = 3.4;
const WALL_HEIGHT = 0.52;
const BUILDING = { width: 22, depth: 9 };

const COLORS = {
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

const floors = [
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
      { type: "firewall", name: "FW-01", x: 0.65, z: 2.75 },
      { type: "ap", name: "AP-CORP-T", x: -3.6, z: -1.7 },
      { type: "guestAp", name: "AP-VIS-01", x: 9.25, z: 1.0 },
      { type: "endpoint", name: "CLI-01", x: 10.2, z: 1.9 },
      { type: "endpoint", name: "PT-EST-01", x: 3.65, z: 0.0 }
    ],
    cables: [
      { from: [0.65, 2.75], to: [2.15, 2.2], type: "copper" },
      { from: [2.15, 2.2], to: [3.55, 2.75], type: "copper" },
      { from: [2.15, 2.2], to: [3.65, 0.0], type: "copper" },
      { from: [2.15, 2.2], to: [-3.6, -1.7], type: "copper" },
      { from: [0.65, 2.75], to: [9.25, 1.0], type: "guest" },
      { from: [9.25, 1.0], to: [10.2, 1.9], type: "guest" },
      { from: [2.15, 2.2], to: [0.2, 0.0], type: "backbone" }
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
      { type: "ap", name: "AP-1-01", x: 2.2, z: -2.6 },
      ...namedDevices("N3", n3Points())
    ],
    cables: [
      { from: [-3.9, 2.4], to: [-8.2, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [-6.3, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [2.2, -2.6], type: "copper" },
      { from: [-3.9, 2.4], to: [0.2, 0.0], type: "backbone" },
      { from: [-3.9, 2.4], to: [0.8, -0.85], type: "copper" },
      { from: [0.8, -0.85], to: [4.3, -0.85], type: "copper", bus: true },
      ...dropCablesToBus(n3Points(), -0.85)
    ]
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
      { type: "ap", name: "AP-2-01", x: 4.0, z: 0.8 },
      ...gridDevices("TMK", 14, -5.4, -2.4, 1.85, 1.35)
    ],
    cables: [
      { from: [-7.6, 2.8], to: [0.2, 0.0], type: "backbone" },
      { from: [-7.6, 2.8], to: [4.0, 0.8], type: "copper" },
      { from: [-7.6, 2.8], to: [-5.6, -0.8], type: "copper" },
      { from: [-5.6, -0.8], to: [6.2, -0.8], type: "copper", bus: true },
      ...dropCablesToBus(gridPoints(14, -5.4, -2.4, 1.85, 1.35), -0.8)
    ]
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
      { type: "ap", name: "AP-3-01", x: -5.9, z: 2.8 },
      { type: "endpoint", name: "VG-01", x: -7.8, z: 2.55 },
      { type: "endpoint", name: "REU-01", x: -8.2, z: -1.2 },
      { type: "endpoint", name: "CHF-01", x: 8.1, z: -2.5 },
      ...sectorDevices()
    ],
    cables: [
      { from: [-8.2, -3.2], to: [0.2, 0.0], type: "backbone" },
      { from: [-8.2, -3.2], to: [-5.9, 2.8], type: "copper" },
      { from: [-8.2, -3.2], to: [-7.8, 2.55], type: "copper" },
      { from: [-8.2, -3.2], to: [-8.2, -1.2], type: "copper" },
      { from: [-8.2, -3.2], to: [8.1, -2.5], type: "copper" },
      { from: [-8.2, -3.2], to: [-3.9, -0.95], type: "copper" },
      { from: [-3.9, -0.95], to: [1.8, -0.95], type: "copper", bus: true },
      ...dropCablesToBus(sectorPoints(), -0.95)
    ]
  }
];

const container = document.querySelector("#scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f2ec);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(18, 18, 22);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.inset = "0";
labelRenderer.domElement.style.pointerEvents = "none";
container.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, FLOOR_HEIGHT * 1.4, 0);
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 12;
controls.maxDistance = 54;

const floorGroups = new Map();
const layerGroups = {
  cables: new THREE.Group(),
  devices: new THREE.Group(),
  labels: new THREE.Group()
};
let activeFloor = "all";

scene.add(layerGroups.cables, layerGroups.devices, layerGroups.labels);
addLights();
addContext();
buildFloors();
resize();
animate();

window.addEventListener("resize", resize);

document.querySelectorAll(".floor-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".floor-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showFloor(button.dataset.floor);
  });
});

document.querySelectorAll("[data-layer]").forEach((input) => {
  input.addEventListener("change", () => {
    syncLayerVisibility();
  });
});

document.querySelector("#export-png").addEventListener("click", () => {
  renderer.render(scene, camera);
  const link = document.createElement("a");
  link.download = "ti-connect-planta-3d.png";
  link.href = renderer.domElement.toDataURL("image/png");
  link.click();
});

function buildFloors() {
  floors.forEach((floor) => {
    const y = floor.id * FLOOR_HEIGHT;
    const baseGroup = new THREE.Group();
    baseGroup.userData.floor = floor.id;
    floorGroups.set(floor.id, baseGroup);
    scene.add(baseGroup);

    addFloorPlate(baseGroup, y, floor.id);
    addOuterWalls(baseGroup, y, floor.id);

    floor.rooms.forEach((room) => addRoom(baseGroup, room, y, floor.id));
    addRoomWalls(
      baseGroup,
      floor.rooms.filter((room) => room.walls !== false),
      y,
      floor.id,
      floor.doors ?? [],
      floor.omitWalls ?? []
    );
    addCustomWalls(baseGroup, floor.customWalls ?? [], y);
    floor.zones?.forEach((zone) => addZone(baseGroup, zone, y, floor.id));
    floor.devices.forEach((device) => addDevice(device, y, floor.id));
    floor.cables.forEach((cable) => addCable(cable, y, floor.id));

    addFloorLabel(floor.name, y, floor.id);
  });

  addBackboneShaft();
}

function addFloorPlate(group, y, id) {
  const slab = new THREE.Mesh(
    new THREE.BoxGeometry(BUILDING.width, 0.22, BUILDING.depth),
    new THREE.MeshStandardMaterial({
      color: id === 0 ? 0xd7d1c6 : COLORS.floor,
      roughness: 0.78
    })
  );
  slab.position.set(0, y, 0);
  slab.receiveShadow = true;
  group.add(slab);

  const top = new THREE.Mesh(
    new THREE.PlaneGeometry(BUILDING.width - 0.5, BUILDING.depth - 0.5),
    new THREE.MeshStandardMaterial({ color: COLORS.floorTop, roughness: 0.9 })
  );
  top.rotation.x = -Math.PI / 2;
  top.position.set(0, y + 0.12, 0);
  group.add(top);
}

function addOuterWalls(group, y, floorId) {
  const wallMat = new THREE.MeshStandardMaterial({ color: COLORS.wall, roughness: 0.7 });
  const specs = floorId === 0
    ? [
        [BUILDING.width, 0.22, 0, -BUILDING.depth / 2],
        [BUILDING.width, 0.22, 0, BUILDING.depth / 2],
        [0.22, BUILDING.depth, -BUILDING.width / 2, 0],
        [0.22, 0.25, BUILDING.width / 2, -4.375],
        [0.22, 2.8, BUILDING.width / 2, -0.75],
        [0.22, 2.65, BUILDING.width / 2, 3.175]
      ]
    : [
        [BUILDING.width, 0.22, 0, -BUILDING.depth / 2],
        [BUILDING.width, 0.22, 0, BUILDING.depth / 2],
        [0.22, BUILDING.depth, -BUILDING.width / 2, 0],
        [0.22, BUILDING.depth, BUILDING.width / 2, 0]
      ];
  specs.forEach(([w, d, x, z]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, WALL_HEIGHT, d), wallMat);
    wall.position.set(x, y + 0.45, z);
    wall.castShadow = true;
    group.add(wall);
  });
}

function addRoom(group, room, y, floorId) {
  const roomMat = new THREE.MeshStandardMaterial({
    color: room.color,
    transparent: true,
    opacity: 0.28,
    roughness: 0.85
  });
  const area = new THREE.Mesh(new THREE.BoxGeometry(room.w, 0.08, room.d), roomMat);
  area.position.set(room.x, y + (room.walls === false ? 0.12 : 0.18), room.z);
  group.add(area);

  if (room.stairs) {
    addStairSteps(group, room, y);
  }

  if (room.label !== false) {
    addLabel(
      room.name,
      room.x,
      y + 0.72,
      room.z,
      room.name.length > 14 ? "room-label" : "",
      floorId
    );
  }
}

function addStairSteps(group, room, y) {
  const stepMat = new THREE.MeshStandardMaterial({
    color: 0x6f7d84,
    roughness: 0.68
  });
  const railMat = new THREE.MeshStandardMaterial({
    color: 0x4f5a60,
    roughness: 0.5
  });
  const count = 8;
  const stepW = room.w * 0.76;
  const stepD = room.d / count;

  for (let i = 0; i < count; i += 1) {
    const step = new THREE.Mesh(
      new THREE.BoxGeometry(stepW, 0.08 + i * 0.012, stepD * 0.72),
      stepMat
    );
    step.position.set(
      room.x,
      y + 0.27 + i * 0.018,
      room.z - room.d / 2 + stepD * (i + 0.5)
    );
    step.castShadow = true;
    group.add(step);
  }

  [-1, 1].forEach((side) => {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, room.d * 0.84),
      railMat
    );
    rail.position.set(room.x + side * room.w * 0.43, y + 0.52, room.z);
    rail.castShadow = true;
    group.add(rail);
  });
}

function addRoomWalls(group, rooms, y, floorId, doors, omitWalls) {
  const horizontal = new Map();
  const vertical = new Map();

  rooms.forEach((room) => {
    const left = room.x - room.w / 2;
    const right = room.x + room.w / 2;
    const bottom = room.z - room.d / 2;
    const top = room.z + room.d / 2;

    addSegment(horizontal, bottom, left, right);
    addSegment(horizontal, top, left, right);
    addSegment(vertical, left, bottom, top);
    addSegment(vertical, right, bottom, top);
  });

  doors.forEach((door) => {
    if (door.orientation === "horizontal") {
      subtractOpening(horizontal, door.line, door.start, door.end);
      if (door.marker !== false) {
        addDoorMarker(group, door, y, floorId);
      }
    }
    if (door.orientation === "vertical") {
      subtractOpening(vertical, door.line, door.start, door.end);
      if (door.marker !== false) {
        addDoorMarker(group, door, y, floorId);
      }
    }
  });

  omitWalls.forEach((wall) => {
    if (wall.orientation === "horizontal") {
      subtractOpening(horizontal, wall.line, wall.start, wall.end);
    }
    if (wall.orientation === "vertical") {
      subtractOpening(vertical, wall.line, wall.start, wall.end);
    }
  });

  const wallMat = new THREE.MeshStandardMaterial({
    color: COLORS.wall,
    roughness: 0.76
  });
  const thickness = 0.1;

  mergeSegments(horizontal).forEach(({ line, start, end }) => {
    const length = end - start;
    const wall = new THREE.Mesh(new THREE.BoxGeometry(length, 0.44, thickness), wallMat);
    wall.position.set(start + length / 2, y + 0.5, line);
    wall.castShadow = true;
    group.add(wall);
  });

  mergeSegments(vertical).forEach(({ line, start, end }) => {
    const length = end - start;
    const wall = new THREE.Mesh(new THREE.BoxGeometry(thickness, 0.44, length), wallMat);
    wall.position.set(line, y + 0.5, start + length / 2);
    wall.castShadow = true;
    group.add(wall);
  });
}

function addSegment(collection, line, start, end) {
  const key = line.toFixed(3);
  const span = [Math.min(start, end), Math.max(start, end)];
  if (!collection.has(key)) {
    collection.set(key, []);
  }
  collection.get(key).push(span);
}

function subtractOpening(collection, line, start, end) {
  const keys = [...collection.keys()].filter((key) => Math.abs(Number(key) - line) < 0.02);
  if (keys.length === 0) {
    return;
  }

  const openingStart = Math.min(start, end);
  const openingEnd = Math.max(start, end);

  keys.forEach((key) => {
    const next = [];
    const spans = collection.get(key) ?? [];

    spans.forEach(([spanStart, spanEnd]) => {
      if (openingEnd <= spanStart || openingStart >= spanEnd) {
        next.push([spanStart, spanEnd]);
        return;
      }

      if (openingStart > spanStart) {
        next.push([spanStart, openingStart]);
      }
      if (openingEnd < spanEnd) {
        next.push([openingEnd, spanEnd]);
      }
    });

    collection.set(key, next);
  });
}

function mergeSegments(collection) {
  const merged = [];
  collection.forEach((spans, key) => {
    const sorted = spans.sort((a, b) => a[0] - b[0]);
    let current = null;

    sorted.forEach(([start, end]) => {
      if (!current) {
        current = [start, end];
        return;
      }

      if (start <= current[1] + 0.01) {
        current[1] = Math.max(current[1], end);
        return;
      }

      merged.push({ line: Number(key), start: current[0], end: current[1] });
      current = [start, end];
    });

    if (current) {
      merged.push({ line: Number(key), start: current[0], end: current[1] });
    }
  });
  return merged;
}

function addCustomWalls(group, walls, y) {
  const wallMat = new THREE.MeshStandardMaterial({
    color: COLORS.wall,
    roughness: 0.76
  });
  const thickness = 0.1;

  walls.forEach((wallSpec) => {
    const length = wallSpec.end - wallSpec.start;
    const wall = new THREE.Mesh(
      wallSpec.orientation === "horizontal"
        ? new THREE.BoxGeometry(length, 0.44, thickness)
        : new THREE.BoxGeometry(thickness, 0.44, length),
      wallMat
    );

    if (wallSpec.orientation === "horizontal") {
      wall.position.set(wallSpec.start + length / 2, y + 0.5, wallSpec.line);
    } else {
      wall.position.set(wallSpec.line, y + 0.5, wallSpec.start + length / 2);
    }

    wall.castShadow = true;
    group.add(wall);
  });
}

function addDoorMarker(group, door, y, floorId) {
  const width = door.end - door.start;
  const marker = new THREE.Mesh(
    door.orientation === "horizontal"
      ? new THREE.BoxGeometry(width, 0.05, 0.12)
      : new THREE.BoxGeometry(0.12, 0.05, width),
    new THREE.MeshStandardMaterial({ color: 0x8f673f, roughness: 0.6 })
  );

  if (door.orientation === "horizontal") {
    marker.position.set(door.start + width / 2, y + 0.28, door.line);
    addLabel(door.name, door.start + width / 2, y + 0.72, door.line - 0.25, "device-label", floorId);
  } else {
    marker.position.set(door.line, y + 0.28, door.start + width / 2);
    addLabel(door.name, door.line - 0.25, y + 0.72, door.start + width / 2, "device-label", floorId);
  }

  group.add(marker);
}

function addZone(group, zone, y, floorId) {
  const geometry = new THREE.CircleGeometry(zone.radius, 48);
  const material = new THREE.MeshStandardMaterial({
    color: zone.color,
    transparent: true,
    opacity: 0.18,
    roughness: 0.9
  });
  const marker = new THREE.Mesh(geometry, material);
  marker.rotation.x = -Math.PI / 2;
  marker.position.set(zone.x, y + 0.23, zone.z);
  group.add(marker);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(zone.radius, 0.025, 8, 72),
    new THREE.MeshStandardMaterial({
      color: zone.color,
      transparent: true,
      opacity: 0.72
    })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.set(zone.x, y + 0.26, zone.z);
  group.add(ring);

  addLabel(zone.name, zone.x, y + 0.92, zone.z + zone.radius * 0.52, "device-label", floorId);
}

function addDevice(device, y, floorId) {
  const group = new THREE.Group();
  group.userData.floor = floorId;
  layerGroups.devices.add(group);

  const color = COLORS[device.type] || COLORS.endpoint;
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
  let mesh;

  if (device.type === "ap" || device.type === "guestAp") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 24), mat);
    mesh.position.set(device.x, y + 0.95, device.z);
  } else if (device.type === "firewall") {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.38, 0.5), mat);
    mesh.position.set(device.x, y + 0.5, device.z);
  } else if (device.type === "server") {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.95, 0.55), mat);
    mesh.position.set(device.x, y + 0.75, device.z);
  } else if (device.type === "rack" || device.type === "switch") {
    const h = device.type === "rack" ? 0.9 : 0.32;
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0.62, h, 0.46), mat);
    mesh.position.set(device.x, y + 0.35 + h / 2, device.z);
  } else {
    mesh = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.34), mat);
    mesh.position.set(device.x, y + 0.36, device.z);
  }

  mesh.castShadow = true;
  group.add(mesh);
  addLabel(device.name, device.x, y + 1.18, device.z, "device-label", floorId);
}

function addCable(cable, y, floorId) {
  const cableColors = {
    backbone: COLORS.backbone,
    guest: COLORS.guest,
    copper: COLORS.copper
  };
  const color = cableColors[cable.type] || COLORS.copper;
  const points = [
    new THREE.Vector3(cable.from[0], y + 0.36, cable.from[1]),
    new THREE.Vector3(cable.to[0], y + 0.36, cable.to[1])
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color, linewidth: cable.bus ? 4 : 2 });
  const line = new THREE.Line(geometry, material);
  line.userData.floor = floorId;
  layerGroups.cables.add(line);
}

function addBackboneShaft() {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0.2, 0.4, 0),
    new THREE.Vector3(0.2, FLOOR_HEIGHT * 3 + 1.2, 0)
  ]);
  const line = new THREE.Line(
    geometry,
    new THREE.LineBasicMaterial({ color: COLORS.backbone, linewidth: 5 })
  );
  layerGroups.cables.add(line);

  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, FLOOR_HEIGHT * 3 + 0.8, 18),
    new THREE.MeshStandardMaterial({
      color: COLORS.backbone,
      transparent: true,
      opacity: 0.26
    })
  );
  shaft.position.set(0.2, FLOOR_HEIGHT * 1.5 + 0.3, 0);
  layerGroups.cables.add(shaft);
  addLabel("SHAFT / BACKBONE", 0.2, FLOOR_HEIGHT * 3 + 1.45, 0, "device-label");
}

function addFloorLabel(text, y, floorId) {
  addLabel(text, -10.8, y + 1.25, -5.2, "floor-label", floorId);
}

function addLabel(text, x, y, z, extraClass = "", floorId = null) {
  const element = document.createElement("div");
  element.className = `label ${extraClass}`.trim();
  element.textContent = text;
  const label = new CSS2DObject(element);
  label.position.set(x, y, z);
  if (floorId !== null) {
    label.userData.floor = floorId;
  }
  layerGroups.labels.add(label);
  return label;
}

function addContext() {
  const lot = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 13),
    new THREE.MeshStandardMaterial({ color: 0xdedbd2, roughness: 0.95 })
  );
  lot.rotation.x = -Math.PI / 2;
  lot.position.set(0, -0.14, 0);
  lot.receiveShadow = true;
  scene.add(lot);

  const street = new THREE.Mesh(
    new THREE.PlaneGeometry(2.7, 16),
    new THREE.MeshStandardMaterial({ color: 0x9fb0bf, roughness: 0.88 })
  );
  street.rotation.x = -Math.PI / 2;
  street.position.set(BUILDING.width / 2 + 1.9, -0.12, 0);
  scene.add(street);
  addLabel("R. Estela Mota", BUILDING.width / 2 + 1.9, 0.12, 0, "street-label");
  addLabel("Fachada / entrada", BUILDING.width / 2 + 0.2, 0.7, -2.8, "street-label");
}

function addLights() {
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb4aa98, 2.2));

  const sun = new THREE.DirectionalLight(0xffffff, 2.4);
  sun.position.set(8, 18, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;
  scene.add(sun);
}

function showFloor(value) {
  activeFloor = value;
  const all = value === "all";
  const selected = Number(value);

  floorGroups.forEach((group, id) => {
    group.visible = all || id === selected;
  });

  syncLayerVisibility();

  if (all) {
    controls.target.set(0, FLOOR_HEIGHT * 1.4, 0);
    camera.position.set(18, 18, 22);
  } else {
    const y = selected * FLOOR_HEIGHT;
    controls.target.set(0, y + 0.4, 0);
    camera.position.set(16, y + 10, 17);
  }
}

function syncLayerVisibility() {
  const all = activeFloor === "all";
  const selected = Number(activeFloor);

  Object.entries(layerGroups).forEach(([key, group]) => {
    const input = document.querySelector(`[data-layer="${key}"]`);
    const layerEnabled = input?.checked ?? true;
    group.visible = layerEnabled;

    group.children.forEach((child) => {
      const floor = child.userData.floor;
      const floorVisible = all || floor === undefined || floor === selected;
      child.visible = layerEnabled && floorVisible;
    });
  });
}

function resize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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

function busCables(busStart, points) {
  return points.map((point) => ({
    from: busStart,
    to: point,
    type: "copper"
  }));
}

function dropCablesToBus(points, busZ) {
  return points.map((point) => ({
    from: [point[0], busZ],
    to: point,
    type: "copper"
  }));
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
