import { BareMetalHost } from "@/types/bareMetal";

export interface Column {
  header: string;
  render: (host: BareMetalHost) => React.ReactNode; // ✅ 字串和 JSX 都可以
}

export const columns: Column[] = [
  { header: "Hostname", render: (h) => h.name },
  { header: "Serial Number", render: (h) => h.serial_number },
  { header: "Model", render: (h) => h.model ?? "—" },
  { header: "Pool", render: (h) => h.pool },
  { header: "status", render: (h) => h.status },
  { header: "PO Number", render: (h) => h.purchase_order },
  { header: "CPU (Cores)", render: (h) => h.cpu_cores },
  { header: "Memory (MiB)", render: (h) => h.memory_mib },
  { header: "Storage (GB)", render: (h) => h.storage_gb },
  { header: "Virtualization", render: (h) => h.max_utilization ?? "—" },
  { header: "Fab", render: (h) => h.fab },
  { header: "Phase", render: (h) => h.phase },
  { header: "Data Center", render: (h) => h.data_center },
  { header: "Room", render: (h) => h.room },
  { header: "Rack", render: (h) => h.rack },
  { header: "Unit", render: (h) => h.unit },
  { header: "AG", render: (h) => h.ag },
  { header: "ASN", render: (h) => h.as_number },
  { header: "OS Template", render: (h) => h.os_template },
  { header: "Admin IP", render: (h) => h.networks.admin_network.ip },
  { header: "Admin MAC", render: (h) => h.networks.admin_network.mac },
  { header: "Admin mask", render: (h) => h.networks.admin_network.mask },
  { header: "Admin vlan", render: (h) => h.networks.admin_network.vlan },
  { header: "Provision IP", render: (h) => h.networks.provision_network.ip },
  { header: "Provision MAC", render: (h) => h.networks.provision_network.mac },
  {
    header: "Provision mask",
    render: (h) => h.networks.provision_network.mask,
  },
];
