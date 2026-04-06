import { ColDef } from "ag-grid-community";
import { BareMetalHost } from "@/types/bareMetal";

export const updateColumnDefs: ColDef<BareMetalHost>[] = [
  { field: "name", headerName: "Hostname", pinned: "left" },
  { field: "pool", headerName: "Pool" },
  { field: "status", headerName: "Status" },
  { field: "as_number", headerName: "ASN" },
  { field: "os_template", headerName: "OS Template" },
  {
    colId: "admin_ip",
    headerName: "Admin IP",
    valueGetter: (params) => params.data?.networks.admin_network.ip,
  },
  {
    colId: "admin_mac",
    headerName: "Admin MAC",
    valueGetter: (params) => params.data?.networks.admin_network.mac,
  },
  {
    colId: "admin_mask",
    headerName: "Admin Mask",
    valueGetter: (params) => params.data?.networks.admin_network.mask,
  },
  {
    colId: "admin_vlan",
    headerName: "Admin VLAN",
    valueGetter: (params) => params.data?.networks.admin_network.vlan ?? "",
  },
  {
    colId: "provision_ip",
    headerName: "Provision IP",
    valueGetter: (params) => params.data?.networks.provision_network.ip,
  },
  {
    colId: "provision_mac",
    headerName: "Provision MAC",
    valueGetter: (params) => params.data?.networks.provision_network.mac,
  },
  {
    colId: "provision_mask",
    headerName: "Provision Mask",
    valueGetter: (params) => params.data?.networks.provision_network.mask,
  },
];

export const EXPORT_COLUMN_KEYS = [
  "name",
  "serial_number",
  "pool",
  "status",
  "os_template",
  "as_number",
  "admin_ip",
  "admin_mac",
  "admin_mask",
  "admin_vlan",
  "provision_ip",
  "provision_mac",
  "provision_mask",
];
