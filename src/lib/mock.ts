import { BareMetalHost } from "@/types/bareMetal";

const pools = ["F12", "F14", "F15", "F18", "F23"];
const statuses: BareMetalHost["status"][] = ["active", "unknown", "error"];
const models = [
  "PowerEdge R750",
  "PowerEdge R640",
  "ProLiant DL380",
  "ProLiant DL360",
  null,
];
const osTemplates = ["Ubuntu_22.04_SDA", "Ubuntu_20.04_SDA", "CentOS_7_SDA"];
const datacenters = ["DC1", "DC2", "DC3"];

function pad(n: number, width: number = 4): string {
  return String(n).padStart(width, "0");
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateHost(index: number): BareMetalHost {
  const pool = randomItem(pools);
  const fab = pool;
  const dc = randomItem(datacenters);
  const room = `R${Math.floor(Math.random() * 10) + 1}`;
  const rack = `R${Math.floor(Math.random() * 30) + 1}`;
  const unit = Math.floor(Math.random() * 48) + 1;
  const status = randomItem(statuses);
  const model = randomItem(models);
  const ag = Math.floor(Math.random() * 8) + 1;
  const phase = String(Math.floor(Math.random() * 3) + 1);
  const cpuCores = randomItem([32, 64, 128]);
  const memoryMib = randomItem([128, 256, 512, 1024]);
  const storageGb = randomItem([3600, 7500, 15000]);
  const serialPrefix = pool.replace("F", "");
  const serialNumber = `${serialPrefix}${pad(index, 5)}`;
  const asNumber = 56000 + index;
  const adminOctet3 = Math.floor(index / 254) + 1;
  const adminOctet4 = (index % 254) + 1;
  const provOctet3 = Math.floor(index / 254) + 1;
  const provOctet4 = (index % 254) + 1;
  const macSuffix = pad(index, 4);
  const adminMac = `aa:bb:cc:${macSuffix.slice(0, 2)}:${macSuffix.slice(2)}:ff`;
  const provMac = `bb:cc:dd:${macSuffix.slice(0, 2)}:${macSuffix.slice(2)}:ff`;
  const hasPR = Math.random() > 0.5;
  const hasVlan = Math.random() > 0.5;

  const name = `${fab.toLowerCase()}-${rack.toLowerCase()}-k8s${ag}-mi-${pad(index)}`;

  return {
    id: null,
    name,
    serial_number: serialNumber,
    model,
    external_model_id: String(1500 + index),
    suppliers: [],
    unit,
    status,
    cpu_cores: cpuCores,
    memory_mib: memoryMib,
    storage_gb: storageGb,
    available_cpu_cores:
      status === "error" ? 0 : Math.floor(cpuCores * Math.random()),
    available_memory_mib:
      status === "error" ? 0 : Math.floor(memoryMib * 1024 * Math.random()),
    available_storage_gb:
      status === "error" ? storageGb : Math.floor(storageGb * Math.random()),
    baremetal_group: null,
    purchase_requisition: hasPR ? `PR-2024-${pad(index, 4)}` : null,
    purchase_order: `44s${80000 + index}`,
    user: [],
    user_group: [],
    external_system_id: String(2000 + index),
    max_virtual_machine: -1,
    max_utilization: 1,
    labels: null,
    failure_zone: null,
    fab,
    phase,
    data_center: dc,
    room,
    rack,
    as_number: asNumber,
    os_template: randomItem(osTemplates),
    ag,
    pool,
    networks: {
      admin_network: {
        network_type: "admin",
        ip: `11.2.${adminOctet3}.${adminOctet4}`,
        mac: adminMac,
        mask: "255.255.255.0",
        gateway: `11.2.${adminOctet3}.1`,
        vlan: hasVlan ? String(100 + (index % 50)) : null,
      },
      provision_network: {
        network_type: "provision",
        ip: `192.168.${provOctet3}.${provOctet4}`,
        mac: provMac,
        mask: "255.255.255.0",
        gateway: null,
        vlan: null,
      },
    },
  };
}

export const mockHosts: BareMetalHost[] = Array.from({ length: 200 }, (_, i) =>
  generateHost(i + 1),
);
