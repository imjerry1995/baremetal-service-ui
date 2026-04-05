import { ColumnDef } from "@tanstack/react-table";
import { BareMetalHost } from "@/types/bareMetal";

export const columns: ColumnDef<BareMetalHost>[] = [
  { accessorKey: "name", header: "Hostname" },
  { accessorKey: "serial_number", header: "Serial Number" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "pool", header: "Pool" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "purchase_order", header: "PO Number" },
  { accessorKey: "cpu_cores", header: "CPU (Cores)" },
  { accessorKey: "memory_mib", header: "Memory (MiB)" },
  { accessorKey: "storage_gb", header: "Storage (GB)" },
  { accessorKey: "max_utilization", header: "Virtualization" },
  { accessorKey: "fab", header: "Fab" },
  { accessorKey: "phase", header: "Phase" },
  { accessorKey: "data_center", header: "Data Center" },
  { accessorKey: "room", header: "Room" },
  { accessorKey: "rack", header: "Rack" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "ag", header: "AG" },
  { accessorKey: "as_number", header: "ASN" },
  { accessorKey: "os_template", header: "OS Template" },
  {
    id: "admin_ip",
    header: "Admin IP",
    accessorFn: (h) => h.networks.admin_network.ip,
  },
  {
    id: "admin_mac",
    header: "Admin MAC",
    accessorFn: (h) => h.networks.admin_network.mac,
  },
  {
    id: "admin_mask",
    header: "Admin Mask",
    accessorFn: (h) => h.networks.admin_network.mask,
  },
  {
    id: "admin_vlan",
    header: "Admin VLAN",
    accessorFn: (h) => h.networks.admin_network.vlan ?? "—",
  },
  {
    id: "provision_ip",
    header: "Provision IP",
    accessorFn: (h) => h.networks.provision_network.ip,
  },
  {
    id: "provision_mac",
    header: "Provision MAC",
    accessorFn: (h) => h.networks.provision_network.mac,
  },
  {
    id: "provision_mask",
    header: "Provision Mask",
    accessorFn: (h) => h.networks.provision_network.mask,
  },
];
