import { ColDef, ICellRendererParams } from "ag-grid-community";
import { BareMetalHost } from "@/types/bareMetal";
import { Info } from "lucide-react";

export function createColumnDefs(
  // 傳進 onOpenDrawer : 因為按鈕需要在被點擊的時候「做某件事」，但那件事的邏輯不在
  onOpenDrawer: (host: BareMetalHost) => void,
): ColDef<BareMetalHost>[] {
  //一個陣列，裡面每個元素都是 BareMetalHost 表格的欄位設定物件
  return [
    { field: "name", headerName: "Hostname", pinned: "left" },
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
    {
      headerName: "Detailed",
      // width: 30,
      sortable: false,
      filter: false,
      resizable: false,
      pinned: "right",
      // cellRenderer 讓你可以自訂這個欄位要顯示什麼，不只是文字，可以是任何 JSX
      cellRenderer: (params: ICellRendererParams<BareMetalHost>) => (
        <button
          onClick={() => params.data && onOpenDrawer(params.data)}
          className="text-blue-400 hover:text-blue-600 text-base leading-none"
        >
          <Info />
        </button>
      ),
    },
  ];
}
