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
  endpoint: 0xc97832,
  ap: 0x7f579e,
  copper: 0xe07a2f,
  backbone: 0x2458d8,
  bath: 0x77a6be,
  leisure: 0x74a86f,
  meeting: 0x8a70a8,
  office: 0xd2a14a
};

const floors = [
  {
    id: 0,
    name: "Térreo",
    rooms: [
      { name: "Estacionamento", x: -5.6, z: 0.1, w: 10.6, d: 8.2, color: COLORS.parking },
      { name: "Estoque", x: 5.3, z: 1.9, w: 7.1, d: 4.5, color: COLORS.stock },
      { name: "Recepção", x: 6.8, z: -3.0, w: 4.0, d: 2.6, color: COLORS.glass },
      { name: "Banheiro T", x: 9.2, z: 2.9, w: 2.5, d: 2.0, color: COLORS.bath }
    ],
    devices: [
      { type: "rack", name: "RACK-T", x: 2.8, z: 2.6 },
      { type: "switch", name: "SW-T-01", x: 3.3, z: 2.6 },
      { type: "ap", name: "AP-T-01", x: -3.6, z: -1.7 },
      { type: "endpoint", name: "PT-EST-01", x: 7.6, z: 0.6 }
    ],
    cables: [
      { from: [3.3, 2.6], to: [7.6, 0.6], type: "copper" },
      { from: [3.3, 2.6], to: [-3.6, -1.7], type: "copper" },
      { from: [3.3, 2.6], to: [0.2, 0.0], type: "backbone" }
    ]
  },
  {
    id: 1,
    name: "1º andar",
    rooms: [
      { name: "Sala Servidores", x: -6.7, z: 1.9, w: 5.8, d: 4.5, color: COLORS.server },
      { name: "Suporte Técnico N3", x: 3.1, z: -0.2, w: 11.5, d: 8.2, color: COLORS.office },
      { name: "Banheiro 1", x: 8.9, z: 2.9, w: 2.8, d: 2.0, color: COLORS.bath }
    ],
    devices: [
      { type: "server", name: "SRV-01", x: -8.2, z: 2.4 },
      { type: "server", name: "BKP-01", x: -6.3, z: 2.4 },
      { type: "rack", name: "RACK-CPD", x: -4.7, z: 2.4 },
      { type: "switch", name: "SW-N3-01", x: -3.9, z: 2.4 },
      { type: "ap", name: "AP-1-01", x: 2.2, z: -2.6 },
      ...gridDevices("N3", 6, 2.0, -1.6, 1.7, 1.7)
    ],
    cables: [
      { from: [-3.9, 2.4], to: [-8.2, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [-6.3, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [2.2, -2.6], type: "copper" },
      { from: [-3.9, 2.4], to: [0.2, 0.0], type: "backbone" },
      ...busCables([-1.6, -1.2], gridPoints(6, 2.0, -1.6, 1.7, 1.7))
    ]
  },
  {
    id: 2,
    name: "2º andar",
    rooms: [
      { name: "Telemarketing", x: -1.2, z: -0.2, w: 17.4, d: 8.2, color: COLORS.office },
      { name: "Banheiro 2", x: 8.9, z: 2.9, w: 2.8, d: 2.0, color: COLORS.bath }
    ],
    devices: [
      { type: "rack", name: "RACK-2", x: -8.4, z: 2.8 },
      { type: "switch", name: "SW-TMK-01", x: -7.6, z: 2.8 },
      { type: "ap", name: "AP-2-01", x: 1.8, z: 2.8 },
      ...gridDevices("TMK", 14, -5.4, -2.4, 1.85, 1.35)
    ],
    cables: [
      { from: [-7.6, 2.8], to: [0.2, 0.0], type: "backbone" },
      { from: [-7.6, 2.8], to: [1.8, 2.8], type: "copper" },
      { from: [-7.6, 1.1], to: [7.4, 1.1], type: "copper", bus: true },
      ...busCables([-7.6, 1.1], gridPoints(14, -5.4, -2.4, 1.85, 1.35))
    ]
  },
  {
    id: 3,
    name: "3º andar",
    rooms: [
      { name: "Descompressão", x: -7.3, z: 2.1, w: 4.8, d: 3.8, color: COLORS.leisure },
      { name: "Copa", x: -2.2, z: 2.2, w: 3.2, d: 3.6, color: COLORS.stock },
      { name: "Reunião", x: 2.4, z: 2.2, w: 4.3, d: 3.6, color: COLORS.meeting },
      { name: "Setores", x: -2.4, z: -2.2, w: 12.5, d: 3.5, color: COLORS.office },
      { name: "Sala Chefe", x: 7.6, z: -2.0, w: 3.4, d: 3.8, color: COLORS.meeting },
      { name: "Banheiro 3", x: 8.9, z: 2.9, w: 2.8, d: 2.0, color: COLORS.bath }
    ],
    devices: [
      { type: "rack", name: "RACK-3", x: -9.0, z: -3.2 },
      { type: "switch", name: "SW-3-01", x: -8.2, z: -3.2 },
      { type: "ap", name: "AP-3-01", x: -5.9, z: 2.8 },
      { type: "endpoint", name: "VG-01", x: -7.8, z: 1.4 },
      { type: "endpoint", name: "REU-01", x: 2.4, z: 2.1 },
      { type: "endpoint", name: "CHF-01", x: 7.5, z: -2.5 },
      ...sectorDevices()
    ],
    cables: [
      { from: [-8.2, -3.2], to: [0.2, 0.0], type: "backbone" },
      { from: [-8.2, -3.2], to: [-5.9, 2.8], type: "copper" },
      { from: [-8.2, -3.2], to: [-7.8, 1.4], type: "copper" },
      { from: [-8.2, -3.2], to: [2.4, 2.1], type: "copper" },
      { from: [-8.2, -3.2], to: [7.5, -2.5], type: "copper" },
      { from: [-7.6, -0.7], to: [5.7, -0.7], type: "copper", bus: true },
      ...busCables([-7.6, -0.7], sectorPoints())
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
    layerGroups[input.dataset.layer].visible = input.checked;
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
    addOuterWalls(baseGroup, y);

    floor.rooms.forEach((room) => addRoom(baseGroup, room, y, floor.id));
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

function addOuterWalls(group, y) {
  const wallMat = new THREE.MeshStandardMaterial({ color: COLORS.wall, roughness: 0.7 });
  const specs = [
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
  area.position.set(room.x, y + 0.18, room.z);
  group.add(area);

  const wallMat = new THREE.MeshStandardMaterial({
    color: room.color,
    transparent: true,
    opacity: 0.65,
    roughness: 0.8
  });
  const walls = [
    [room.w, 0.08, room.x, room.z - room.d / 2],
    [room.w, 0.08, room.x, room.z + room.d / 2],
    [0.08, room.d, room.x - room.w / 2, room.z],
    [0.08, room.d, room.x + room.w / 2, room.z]
  ];
  walls.forEach(([w, d, x, z]) => {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(w, 0.42, d), wallMat);
    wall.position.set(x, y + 0.48, z);
    wall.castShadow = true;
    group.add(wall);
  });

  addLabel(
    room.name,
    room.x,
    y + 0.72,
    room.z,
    room.name.length > 14 ? "room-label" : "",
    floorId
  );
}

function addDevice(device, y, floorId) {
  const group = new THREE.Group();
  group.userData.floor = floorId;
  layerGroups.devices.add(group);

  const color = COLORS[device.type] || COLORS.endpoint;
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.45 });
  let mesh;

  if (device.type === "ap") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.16, 24), mat);
    mesh.position.set(device.x, y + 0.95, device.z);
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
  const color = cable.type === "backbone" ? COLORS.backbone : COLORS.copper;
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
    new THREE.PlaneGeometry(28, 13),
    new THREE.MeshStandardMaterial({ color: 0xdedbd2, roughness: 0.95 })
  );
  lot.rotation.x = -Math.PI / 2;
  lot.position.set(0, -0.14, 0);
  lot.receiveShadow = true;
  scene.add(lot);

  const street = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 2.7),
    new THREE.MeshStandardMaterial({ color: 0x9fb0bf, roughness: 0.88 })
  );
  street.rotation.x = -Math.PI / 2;
  street.position.set(0, -0.12, -7.1);
  scene.add(street);
  addLabel("R. Estela Mota", 0, 0.12, -7.1, "street-label");
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
  const all = value === "all";
  const selected = Number(value);

  floorGroups.forEach((group, id) => {
    group.visible = all || id === selected;
  });

  Object.values(layerGroups).forEach((group) => {
    group.children.forEach((child) => {
      const floor = child.userData.floor;
      child.visible = all || floor === undefined || floor === selected;
    });
  });

  if (all) {
    controls.target.set(0, FLOOR_HEIGHT * 1.4, 0);
    camera.position.set(18, 18, 22);
  } else {
    const y = selected * FLOOR_HEIGHT;
    controls.target.set(0, y + 0.4, 0);
    camera.position.set(16, y + 10, 17);
  }
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

function gridPoints(count, startX, startZ, stepX, stepZ) {
  return Array.from({ length: count }, (_, index) => {
    const col = index % 7;
    const row = Math.floor(index / 7);
    return [startX + col * stepX, startZ + row * stepZ];
  });
}

function busCables(busStart, points) {
  return points.map((point) => ({
    from: busStart,
    to: point,
    type: "copper"
  }));
}

function sectorPoints() {
  return [
    [-5.9, -2.0],
    [-4.2, -2.0],
    [-2.4, -2.0],
    [-0.7, -2.0],
    [1.0, -2.0],
    [2.8, -2.0],
    [4.5, -2.0]
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
