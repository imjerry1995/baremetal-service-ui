export interface NetworkInfo {
  network_type: string;
  ip: string;
  mac: string;
  mask: string;
  gateway: string | null;
  vlan: string | null;
}

export interface Networks {
  admin_network: NetworkInfo;
  provision_network: NetworkInfo;
  other_network?: NetworkInfo; // ? 代表可選
}

export type BareMetalStatus = "active" | "unknown" | "error"; // 需討論最終定義

export interface BareMetalHost {
  id: number | null;
  name: string;
  serial_number: string;
  model: string | null;
  external_model_id: string | null; // 上 production 這邊應該不能是 null
  suppliers: string[];
  unit: number;
  status: BareMetalStatus;
  cpu_cores: number;
  memory_mib: number;
  storage_gb: number;
  available_cpu_cores: number;
  available_memory_mib: number;
  available_storage_gb: number;
  baremetal_group: string | null;
  purchase_requisition: string | null;
  purchase_order: string | null;
  user: string[];
  user_group: string[];
  external_system_id: string | null;
  max_virtual_machine: number;
  max_utilization: number;
  labels: string | null;
  failure_zone: string | null;
  fab: string;
  phase: string;
  data_center: string;
  room: string;
  rack: string;
  as_number: number;
  os_template: string;
  ag: number;
  pool: string;
  networks: Networks;
}

export interface BareMetalListParams {
  q?: string;
  data_center?: string;
  status?: BareMetalStatus | "";
  pool?: string;
}
