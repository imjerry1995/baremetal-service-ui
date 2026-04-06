import { ColDef } from "ag-grid-community";
import { BareMetalHost } from "@/types/bareMetal";

export const columnDefs: ColDef<BareMetalHost>[] = [
  { field: "name", headerName: "Hostname" },
  { field: "serial_number", headerName: "Serial Number" },
  { field: "model", headerName: "Model" },
  { field: "pool", headerName: "Pool" },
  { field: "status", headerName: "Status" },
  { field: "purchase_order", headerName: "PO Number" },
  { field: "cpu_cores", headerName: "CPU (Cores)" },
  { field: "memory_mib", headerName: "Memory (MiB)" },
  { field: "storage_gb", headerName: "Storage (GB)" },
  { field: "max_utilization", headerName: "Virtualization" },
  { field: "fab", headerName: "Fab" },
  { field: "phase", headerName: "Phase" },
  { field: "data_center", headerName: "Data Center" },
  { field: "room", headerName: "Room" },
  { field: "rack", headerName: "Rack" },
  { field: "unit", headerName: "Unit" },
  { field: "ag", headerName: "AG" },
  { field: "as_number", headerName: "ASN" },
  { field: "os_template", headerName: "OS Template" },
  {
    headerName: "Admin IP",
    valueGetter: (params) => params.data?.networks.admin_network.ip,
  },
  {
    headerName: "Admin MAC",
    valueGetter: (params) => params.data?.networks.admin_network.mac,
  },
  {
    headerName: "Admin Mask",
    valueGetter: (params) => params.data?.networks.admin_network.mask,
  },
  {
    headerName: "Admin VLAN",
    valueGetter: (params) => params.data?.networks.admin_network.vlan ?? "—",
  },
  {
    headerName: "Provision IP",
    valueGetter: (params) => params.data?.networks.provision_network.ip,
  },
  {
    headerName: "Provision MAC",
    valueGetter: (params) => params.data?.networks.provision_network.mac,
  },
  {
    headerName: "Provision Mask",
    valueGetter: (params) => params.data?.networks.provision_network.mask,
  },
];
