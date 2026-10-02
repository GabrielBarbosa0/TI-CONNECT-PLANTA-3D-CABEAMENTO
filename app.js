import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { routeCable } from "./model-helpers.mjs";

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
      { type: "switch", name: "SW-BB-T", x: 0.75, z: 0.35 },
      { type: "firewall", name: "FW-01", x: 0.65, z: 2.75 },
      { type: "ap", name: "AP-CORP-T", x: -3.6, z: -1.7 },
      { type: "guestAp", name: "AP-VIS-01", x: 9.25, z: 1.0 },
      { type: "endpoint", name: "CLI-01", x: 10.2, z: 1.9 },
      { type: "endpoint", name: "PT-EST-01", x: 3.65, z: 0.0 }
    ],
    cables: [
      { from: [0.65, 2.75], to: [2.15, 2.2], type: "copper" },
      { from: [2.15, 2.2], to: [3.55, 2.75], type: "copper" },
      { from: [2.15, 2.2], to: [0.75, 0.35], type: "copper" },
      { from: [2.15, 2.2], to: [3.65, 0.0], type: "copper" },
      { from: [2.15, 2.2], to: [-3.6, -1.7], type: "copper" },
      { from: [0.65, 2.75], to: [9.25, 1.0], type: "guest" },
      { from: [9.25, 1.0], to: [10.2, 1.9], type: "guest" },
      { from: [0.75, 0.35], to: [0.2, 0.0], type: "backbone" }
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
    cables: [
      { from: [-3.9, 2.4], to: [-8.2, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [-6.3, 2.4], type: "copper" },
      { from: [-3.9, 2.4], to: [2.2, -2.6], type: "copper" },
      { from: [0.75, 0.35], to: [0.2, 0.0], type: "backbone" },
      { from: [0.75, 0.35], to: [-3.9, 2.4], type: "copper" },
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
      { type: "switch", name: "SW-BB-2", x: 0.75, z: 0.35 },
      { type: "ap", name: "AP-2-01", x: 4.0, z: 0.8 },
      ...gridDevices("TMK", 14, -5.4, -2.4, 1.85, 1.35)
    ],
    cables: [
      { from: [0.75, 0.35], to: [0.2, 0.0], type: "backbone" },
      { from: [0.75, 0.35], to: [-7.6, 2.8], type: "copper" },
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
      { type: "switch", name: "SW-BB-3", x: 0.75, z: 0.35 },
      { type: "ap", name: "AP-3-01", x: -5.9, z: 2.8 },
      { type: "endpoint", name: "VG-01", x: -7.8, z: 2.55 },
      { type: "endpoint", name: "REU-01", x: -8.2, z: -1.2 },
      { type: "endpoint", name: "CHF-01", x: 8.1, z: -2.5 },
      ...sectorDevices()
    ],
    cables: [
      { from: [0.75, 0.35], to: [0.2, 0.0], type: "backbone" },
      { from: [0.75, 0.35], to: [-8.2, -3.2], type: "copper" },
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
camera.position.set(27, 24, 29);

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
controls.maxDistance = 72;

const floorGroups = new Map();
const layerGroups = {
  cables: new THREE.Group(),
  devices: new THREE.Group(),
  labels: new THREE.Group()
};
let activeFloor = "all";
const labelItems = [];

scene.add(layerGroups.cables, layerGroups.devices, layerGroups.labels);
addLights();
addContext();
buildFloors();
resize();
animate();

window.addEventListener("resize", resize);

document.querySelectorAll(".floor-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".floor-button").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    showFloor(button.dataset.floor);
  });
});

document.querySelectorAll("[data-layer]").forEach((input) => {
  input.addEventListener("change", () => {
    syncLayerVisibility();
  });
});

document.querySelector("#export-png").addEventListener("click", () => {
  exportImage();
});

function exportImage() {
  const previousVisibility = captureLayerVisibility();
  const exportLayers = getExportLayerSettings();
  applyLayerVisibility(exportLayers);

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  refreshLabelVisibility(exportLayers.labels);

  const image = composeExportCanvas(exportLayers);
  const link = document.createElement("a");
  link.download = "ti-connect-planta-3d.png";
  link.href = image.toDataURL("image/png");
  link.click();

  restoreLayerVisibility(previousVisibility);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  refreshLabelVisibility();
}

function getExportLayerSettings() {
  return Object.fromEntries(
    Object.keys(layerGroups).map((key) => {
      const input = document.querySelector(`[data-export-layer="${key}"]`);
      return [key, input?.checked ?? true];
    })
  );
}

function captureLayerVisibility() {
  return Object.fromEntries(
    Object.entries(layerGroups).map(([key, group]) => [
      key,
      {
        group: group.visible,
        children: group.children.map((child) => child.visible)
      }
    ])
  );
}

function restoreLayerVisibility(previousVisibility) {
  Object.entries(previousVisibility).forEach(([key, state]) => {
    const group = layerGroups[key];
    group.visible = state.group;
    group.children.forEach((child, index) => {
      child.visible = state.children[index] ?? child.visible;
    });
  });
}

function applyLayerVisibility(layerSettings) {
  const all = activeFloor === "all";
  const selected = Number(activeFloor);

  Object.entries(layerGroups).forEach(([key, group]) => {
    const layerEnabled = layerSettings[key] ?? true;
    group.visible = layerEnabled;

    group.children.forEach((child) => {
      const floor = child.userData.floor;
      const floorVisible = all || floor === undefined || floor === selected;
      child.visible = layerEnabled && floorVisible;
    });
  });
}

function composeExportCanvas(exportLayers) {
  const source = renderer.domElement;
  const image = document.createElement("canvas");
  image.width = source.width;
  image.height = source.height;

  const context = image.getContext("2d");
  context.drawImage(source, 0, 0);

  if (exportLayers.labels) {
    drawVisibleLabels(context, image);
  }

  return image;
}

function drawVisibleLabels(context, image) {
  const sceneRect = renderer.domElement.getBoundingClientRect();
  const scaleX = image.width / sceneRect.width;
  const scaleY = image.height / sceneRect.height;

  labelRenderer.domElement.querySelectorAll(".label").forEach((element) => {
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();

    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number(style.opacity) === 0 ||
      rect.width === 0 ||
      rect.height === 0
    ) {
      return;
    }

    const x = (rect.left - sceneRect.left) * scaleX;
    const y = (rect.top - sceneRect.top) * scaleY;
    const width = rect.width * scaleX;
    const height = rect.height * scaleY;
    const radius = parseFloat(style.borderRadius) * scaleX || 5 * scaleX;
    const paddingX = parseFloat(style.paddingLeft) * scaleX || 4 * scaleX;
    const paddingY = parseFloat(style.paddingTop) * scaleY || 3 * scaleY;
    const fontSize = parseFloat(style.fontSize) * scaleY || 12 * scaleY;
    const lineHeight = parseFloat(style.lineHeight) * scaleY || fontSize * 1.15;

    context.save();
    context.fillStyle = style.backgroundColor;
    context.strokeStyle = style.borderColor;
    context.lineWidth = Math.max(1, scaleX);
    roundRect(context, x, y, width, height, radius);
    context.fill();
    context.stroke();

    context.fillStyle = style.color;
    context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
    context.textAlign = "center";
    context.textBaseline = "top";

    const lines = wrapLabelText(context, element.textContent ?? "", width - paddingX * 2);
    const blockHeight = lines.length * lineHeight;
    const textStartY = y + paddingY + Math.max(0, (height - paddingY * 2 - blockHeight) / 2);

    lines.forEach((line, index) => {
      context.fillText(line, x + width / 2, textStartY + index * lineHeight);
    });

    context.restore();
  });
}

function wrapLabelText(context, text, maxWidth) {
  return text
    .split("\n")
    .flatMap((line) => {
      const words = line.split(/\s+/).filter(Boolean);
      const lines = [];
      let current = "";

      words.forEach((word) => {
        const next = current ? `${current} ${word}` : word;
        if (context.measureText(next).width <= maxWidth || !current) {
          current = next;
          return;
        }

        lines.push(current);
        current = word;
      });

      if (current) {
        lines.push(current);
      }

      return lines.length ? lines : [line];
    });
}

function roundRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

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
      y + 0.46,
      room.z,
      "room-label",
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
    addLabel(door.name, door.start + width / 2, y + 0.72, door.line - 0.25, "context-label", floorId);
  } else {
    marker.position.set(door.line, y + 0.28, door.start + width / 2);
    addLabel(door.name, door.line - 0.25, y + 0.72, door.start + width / 2, "context-label", floorId);
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

  addLabel(zone.name, zone.x, y + 0.92, zone.z + zone.radius * 0.52, "zone-label", floorId);
}

function addDevice(device, y, floorId) {
  const group = new THREE.Group();
  group.userData.floor = floorId;
  group.position.set(device.x, y, device.z);
  layerGroups.devices.add(group);

  const accent = COLORS[device.type] || COLORS.endpoint;
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x25343c, metalness: 0.38, roughness: 0.48 });
  const faceMat = new THREE.MeshStandardMaterial({ color: accent, metalness: 0.18, roughness: 0.48 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111c23, roughness: 0.55 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xb8c9ca, metalness: 0.6, roughness: 0.36 });
  const lightMat = new THREE.MeshStandardMaterial({ color: 0xb7f5d7, emissive: 0x47bd91, emissiveIntensity: 0.55 });
  const isInfrastructure = device.type !== "endpoint";
  const plinth = new THREE.Mesh(
    new THREE.CylinderGeometry(isInfrastructure ? 0.48 : 0.30, isInfrastructure ? 0.48 : 0.30, 0.035, 28),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.82 })
  );
  plinth.position.y = 0.235;
  plinth.receiveShadow = true;
  group.add(plinth);

  if (device.type === "rack") {
    addDeviceBox(group, 0.68, 1.04, 0.58, 0, 0.78, 0, caseMat);
    addDeviceBox(group, 0.54, 0.89, 0.025, 0, 0.78, 0.305, darkMat);
    [-0.30, 0.30].forEach((x) => addDeviceBox(group, 0.035, 0.94, 0.04, x, 0.78, 0.32, metalMat));
    [0.48, 0.70, 0.92, 1.14].forEach((height, index) => {
      addDeviceBox(group, 0.48, 0.14, 0.035, 0, height, 0.33, index % 2 ? faceMat : caseMat);
      addDeviceBox(group, 0.05, 0.035, 0.016, 0.18, height, 0.355, lightMat);
    });
  } else if (device.type === "switch" || device.type === "firewall") {
    const width = device.type === "switch" ? 0.72 : 0.68;
    addDeviceBox(group, width, 0.24, 0.50, 0, 0.42, 0, caseMat);
    addDeviceBox(group, width - 0.07, 0.15, 0.025, 0, 0.43, 0.263, faceMat);
    for (let index = 0; index < (device.type === "switch" ? 6 : 4); index += 1) {
      addDeviceBox(group, 0.064, 0.045, 0.018, -0.22 + index * 0.085, 0.43, 0.282, darkMat);
    }
    addDeviceBox(group, 0.032, 0.032, 0.02, 0.27, 0.44, 0.285, lightMat);
  } else if (device.type === "server") {
    addDeviceBox(group, 0.56, 0.92, 0.54, 0, 0.70, 0, caseMat);
    addDeviceBox(group, 0.48, 0.82, 0.026, 0, 0.70, 0.286, faceMat);
    [0.49, 0.61, 0.73, 0.85, 0.97].forEach((height) =>
      addDeviceBox(group, 0.37, 0.035, 0.018, 0, height, 0.306, darkMat)
    );
    addDeviceBox(group, 0.04, 0.04, 0.019, 0.18, 1.02, 0.31, lightMat);
  } else if (device.type === "ap" || device.type === "guestAp") {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.34, 0.11, 32), faceMat);
    disc.position.y = 0.94;
    disc.castShadow = true;
    group.add(disc);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.018, 32), metalMat);
    cap.position.y = 1.005;
    group.add(cap);
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), lightMat);
    led.position.set(0, 1.025, 0);
    group.add(led);
  } else if (device.name.startsWith("PT-")) {
    addDeviceBox(group, 0.32, 0.28, 0.10, 0, 0.42, 0, faceMat);
    addDeviceBox(group, 0.11, 0.07, 0.015, 0, 0.43, 0.061, darkMat);
  } else if (device.name.startsWith("CLI-")) {
    addDeviceBox(group, 0.39, 0.035, 0.28, 0, 0.35, 0, caseMat);
    addDeviceBox(group, 0.39, 0.27, 0.035, 0, 0.50, -0.11, faceMat);
    addDeviceBox(group, 0.33, 0.20, 0.014, 0, 0.50, -0.088, darkMat);
  } else {
    addDeviceBox(group, 0.25, 0.12, 0.27, 0, 0.34, 0, caseMat);
    addDeviceBox(group, 0.035, 0.18, 0.035, 0, 0.51, 0, metalMat);
    addDeviceBox(group, 0.44, 0.30, 0.055, 0, 0.64, 0, caseMat);
    addDeviceBox(group, 0.37, 0.23, 0.015, 0, 0.64, 0.036, faceMat);
  }

  const labelClass = isInfrastructure ? "device-label" : "endpoint-label";
  const labelHeight = device.type === "rack" ? 1.55
    : device.type === "switch" && !device.name.includes("BB") ? 1.35
    : device.name.startsWith("BKP") ? 1.28
    : device.type === "ap" || device.type === "guestAp" ? 1.28 : 1.02;
  addLabel(device.name, device.x, y + labelHeight, device.z, labelClass, floorId);
}

function addDeviceBox(group, width, height, depth, x, y, z, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  group.add(mesh);
  return mesh;
}

function addCable(cable, y, floorId) {
  const cableColors = {
    backbone: COLORS.backbone,
    guest: COLORS.guest,
    copper: COLORS.copper
  };
  const color = cableColors[cable.type] || COLORS.copper;
  const path = routeCable(cable.from, cable.to, { via: cable.via });
  const group = new THREE.Group();
  group.userData.floor = floorId;
  const radius = cable.bus ? 0.055 : cable.type === "backbone" ? 0.048 : 0.028;
  const material = new THREE.MeshStandardMaterial({ color, metalness: 0.12, roughness: 0.43 });
  const points = path.map(([x, z]) => new THREE.Vector3(x, y + 0.30, z));
  for (let index = 1; index < points.length; index += 1) {
    const start = points[index - 1];
    const end = points[index];
    const direction = new THREE.Vector3().subVectors(end, start);
    const segment = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 8), material);
    segment.position.copy(start).add(end).multiplyScalar(0.5);
    segment.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    group.add(segment);
  }
  points.slice(1, -1).forEach((point) => {
    const join = new THREE.Mesh(new THREE.SphereGeometry(radius, 8, 6), material);
    join.position.copy(point);
    group.add(join);
  });
  layerGroups.cables.add(group);
}

function addBackboneShaft() {
  const group = new THREE.Group();
  group.userData.floor = -1;
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.085, FLOOR_HEIGHT * 3 + 0.8, 16),
    new THREE.MeshStandardMaterial({ color: COLORS.backbone, metalness: 0.28, roughness: 0.4 })
  );
  shaft.position.set(0.2, FLOOR_HEIGHT * 1.5 + 0.3, 0);
  group.add(shaft);
  const sleeve = new THREE.Mesh(
    new THREE.CylinderGeometry(0.21, 0.21, FLOOR_HEIGHT * 3 + 0.8, 18),
    new THREE.MeshStandardMaterial({
      color: COLORS.backbone,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
  );
  sleeve.position.copy(shaft.position);
  group.add(sleeve);
  layerGroups.cables.add(group);
  addLabel("SHAFT / BACKBONE", 0.2, FLOOR_HEIGHT * 3 + 1.45, 0, "shaft-label", -1);
}

function addFloorLabel(text, y, floorId) {
  addLabel(text, -10.1, y + 0.48, 5.05, "floor-label", floorId);
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
  labelItems.push({ label, element, kind: extraClass });
  return label;
}

function refreshLabelVisibility(override = null) {
  const labelsEnabled = override ?? (document.querySelector('[data-layer="labels"]')?.checked ?? true);
  const candidates = labelItems.filter(({ label, kind }) => {
    const floor = label.userData.floor;
    const onFloor = activeFloor === "all" || floor === undefined || floor === Number(activeFloor);
    const quietInOverview = activeFloor === "all" && ["room-label", "endpoint-label", "context-label", "zone-label"].includes(kind);
    return labelsEnabled && onFloor && !quietInOverview && label.visible;
  });

  const priority = { "floor-label": 8, "device-label": 5, "shaft-label": 4, "endpoint-label": 2, "zone-label": 1, "room-label": 0, "context-label": 0, "street-label": 0 };
  const score = ({ kind, element }) => (priority[kind] ?? 0)
    + (kind === "device-label" && element.textContent.startsWith("RACK") ? 2 : 0)
    + (kind === "device-label" && element.textContent.startsWith("SW") ? 1 : 0);
  candidates.sort((a, b) => score(b) - score(a));

  const bounds = container.getBoundingClientRect();
  const topbar = document.querySelector(".topbar").getBoundingClientRect();
  const occupied = [];
  const shown = new Set();
  for (const { element, kind } of candidates) {
    const offsets = kind === "device-label"
      ? [[0, 0], [0, -30], [30, 0], [-30, 0], [30, -30], [-30, -30], [0, -60], [60, -30], [-60, -30], [30, -60], [-30, -60], [60, -60], [-60, -60], [0, -90]]
      : kind === "endpoint-label" ? [[0, 0], [0, -22], [20, 0], [-20, 0]] : [[0, 0]];
    for (const [dx, dy] of offsets) {
      const marginTop = `${dy}px`;
      const marginLeft = `${dx}px`;
      if (element.style.marginTop !== marginTop) element.style.marginTop = marginTop;
      if (element.style.marginLeft !== marginLeft) element.style.marginLeft = marginLeft;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.left < bounds.left || rect.right > bounds.right || rect.top < bounds.top || rect.bottom > bounds.bottom) continue;
      if (rect.left < topbar.right && rect.right > topbar.left && rect.top < topbar.bottom && rect.bottom > topbar.top) continue;
      const overlaps = occupied.some((taken) =>
        rect.left < taken.right + 3 && rect.right > taken.left - 3 && rect.top < taken.bottom + 3 && rect.bottom > taken.top - 3
      );
      if (overlaps) continue;
      shown.add(element);
      occupied.push(rect);
      break;
    }
  }
  labelItems.forEach(({ element }) => {
    const opacity = shown.has(element) ? "1" : "0";
    if (element.style.opacity !== opacity) element.style.opacity = opacity;
  });
}

function addContext() {
  const lot = new THREE.Mesh(
    new THREE.PlaneGeometry(32, 13),
    new THREE.MeshStandardMaterial({ color: 0xdedbd2, roughness: 0.95 })
  );
  lot.rotation.x = -Math.PI / 2;
  lot.position.set(0, -0.14, 0);
  lot.receiveShadow = false;
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
  document.querySelector(".viewer-note").textContent = all
    ? "Selecione um pavimento para ver ambientes e pontos individuais. Rotas de cabos indicativas."
    : "Rotas de cabos indicativas. Amplie a planta para ver os pontos individuais.";

  floorGroups.forEach((group, id) => {
    group.visible = all || id === selected;
  });

  syncLayerVisibility();

  if (all) {
    controls.target.set(0, FLOOR_HEIGHT * 1.4, 0);
    camera.position.set(27, 24, 29);
  } else {
    const y = selected * FLOOR_HEIGHT;
    controls.target.set(0, y + 0.4, 0);
    camera.position.set(23, y + 19, 25);
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
  refreshLabelVisibility();
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
