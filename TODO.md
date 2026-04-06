# baremetal-service-ui TODO

## 已完成

### 專案初始化

- [x] Dev Container（含 SSH key mount）
- [x] Next.js + TypeScript + Tailwind v3
- [x] 資料夾結構
- [x] 型別定義（`src/types/bareMetal.ts`）
- [x] API 函式（`src/lib/api.ts`）
- [x] Mock 資料（`src/lib/mock.ts`，200 筆，含 F12/F14/F15/F18/F23）
- [x] 環境變數設定（`NEXT_PUBLIC_USE_MOCK`、`NEXT_PUBLIC_API_URL`）
- [x] `src/lib/config.ts`（`USE_MOCK` 共用設定）

### Layout

- [x] Sidebar（`src/components/layout/Sidebar.tsx`）
- [x] BrandIcon（`src/components/icons/BrandIcon.tsx`）
- [x] 頁面路由結構（`src/app/layout.tsx`）
- [x] favicon（`src/app/icon.svg`）

### Query 頁面（`src/app/baremetal/query/`）

- [x] AG Grid 表格（`src/components/baremetal/BareMetalTable.tsx`）
- [x] 欄位定義（`src/components/baremetal/BareMetalTable.columns.tsx`）
- [x] Topbar 搜尋 + Pool filter（`src/components/baremetal/BareMetalTopbar.tsx`）
- [x] 搜尋元件抽離（`src/components/baremetal/BareMetalSearch.tsx`）
- [x] 共用 Hook（`src/hooks/useBareMetalGrid.ts`）
- [x] 欄位排序
- [x] 欄位過濾（AG Grid 內建）
- [x] 分頁（AG Grid 內建）
- [x] 複製欄位文字（`enableCellTextSelection`）
- [x] Loading 畫面（`src/app/baremetal/query/loading.tsx`）
- [x] Drawer 詳情面板（`src/components/baremetal/BareMetalDrawer.tsx`）
  - [x] 點擊 Info 按鈕從右側展開
  - [x] 顯示完整資訊（基本資訊、資源、位置、網路、外部系統、使用者群組）
  - [x] 關閉 Drawer

### Update 頁面（`src/app/baremetal/update/`）

- [x] 表格（`src/components/baremetal/BareMetalUpdateTable.tsx`）
- [x] 欄位定義（`src/components/baremetal/BareMetalUpdateTable.columns.ts`）
- [x] Topbar（搜尋 + Pool filter + Export + Import 按鈕）
- [x] 多選 checkbox（AG Grid 內建）
- [x] Export CSV（AG Grid 內建 `exportDataAsCsv`）
  - 識別欄位：`serial_number`（唯讀，僅用來識別機器）
  - 可更新欄位：`as_number`, `admin_ip`, `admin_mac`, `admin_mask`, `admin_vlan`, `provision_ip`, `provision_mac`, `provision_mask`

---

## 待完成

### Project level

- [ ] 安裝公司 UI 套件
- [ ] React Compiler warning 確認（目前已關閉）

### Layout

- [ ] 換成公司 UI 套件提供的佈局
- [ ] Dark mode

### Sidebar

- [ ] 登出按鈕
- [ ] 收合功能

### Query 頁面

- [ ] StatusPill 樣式（等公司 UI 套件）
- [ ] 樣式整體調整（等公司 UI 套件）

### Home 頁面（`src/app/page.tsx`）

- [ ] 統計卡（total / active / error / unknown）
- [ ] Host 列表

### Update 頁面

- [ ] Import CSV 解析（`src/lib/csvParser.ts`）
- [ ] 預覽變更 Modal（`src/components/baremetal/BareMetalImportModal.tsx`）
- [ ] 表格顯示鎖定狀態（`locked_by`, `locked_at`）
- [ ] 已鎖定的機器無法勾選，顯示鎖定者和鎖定時間
- [ ] Export 時鎖定機器（呼叫 `POST /baremetal/lock`）
- [ ] 批次送出 PATCH API（`PATCH /baremetal/batch`），成功後自動解鎖
- [ ] 成功／失敗提示（顯示哪些成功、哪些失敗及原因）
- [ ] 鎖定超時提示（TTL 1 小時，提醒使用者重新 export）

### Admin 功能（`src/app/admin/`）

- [ ] 顯示所有目前被鎖定的機器列表（`locked_by`, `locked_at`）
- [ ] 強制解鎖按鈕（呼叫 `POST /baremetal/unlock/force`）

### API 串接

- [ ] 等後端支援後，將 `NEXT_PUBLIC_USE_MOCK` 改為 `false`
- [ ] 後端分頁（等後端支援 `page`、`limit` 參數）
- [ ] Error handling — API 失敗時顯示錯誤訊息
- [ ] 登入串 OAuth

---

## 備註

- Mock 資料開關：`.env.local` 的 `NEXT_PUBLIC_USE_MOCK`
- 後端 API base URL：`.env.local` 的 `NEXT_PUBLIC_API_URL`
- 後端 API 規格：`backend-api-spec.md`
- Redis 悲觀鎖 TTL：3600 秒（1 小時）
- Lock key 格式：`lock:{serial_number}`
