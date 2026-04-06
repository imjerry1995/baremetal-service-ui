# baremetal-service-ui TODO

## 已完成

### 專案初始化

- [x] Dev Container
- [x] Next.js + TypeScript + Tailwind v3
- [x] 資料夾結構
- [x] 型別定義（`src/types/bareMetal.ts`）
- [x] API 函式（`src/lib/api.ts`）
- [x] Mock 資料（`src/lib/mock.ts`）

### Layout

- [x] Sidebar（`src/components/layout/Sidebar.tsx`）
- [x] BrandIcon（`src/components/icons/BrandIcon.tsx`）
- [x] 頁面路由結構（`src/app/layout.tsx`）
- [ ] 換 ui

### Query 頁面（`src/app/baremetal/query/`）

- [x] BareMetalTable — TanStack Table（`src/components/baremetal/BareMetalTable.tsx`）
- [x] BareMetalTopbar — 搜尋 + Pool filter（`src/components/baremetal/BareMetalTopbar.tsx`）
- [x] 欄位排序
- [x] 欄位過濾（放大鏡展開）
- [x] 分頁（`src/components/baremetal/BareMetalPagination.tsx`）
- [x] Loading 畫面（`src/app/baremetal/query/loading.tsx`）

---

## 待完成

### Query 頁面

- [ ] StatusPill 樣式（`src/components/baremetal/StatusPill.tsx`）
- [ ] Drawer 詳情面板（`src/components/baremetal/BareMetalDrawer.tsx`）
  - [ ] 點擊列從右側展開
  - [ ] 顯示完整資訊（可用資源、網路、外部系統、使用者群組）
  - [ ] 關閉 Drawer

### Home 頁面（`src/app/page.tsx`）

- [ ] 統計卡（total / active / error / unknown）
- [ ] Host 列表（最近的 hosts）

### Update 頁面（`src/app/baremetal/update/`）

- [ ] 選擇 Pool，列出該 Pool 的機器
- [ ] 表格顯示鎖定狀態（locked_by, locked_at）
- [ ] 勾選機器（已鎖定的機器無法勾選，顯示鎖定者和鎖定時間）
- [ ] Export CSV（鎖定機器 + 下載 CSV）
      識別欄位：serial_number（唯讀，僅用來識別機器）
      可更新欄位：as_number, admin_ip, admin_mac, admin_mask, admin_vlan,
      provision_ip, provision_mac, provision_mask
      規則：空白欄位代表不更新該欄位
- [ ] 上傳 CSV
- [ ] 解析 CSV，預覽變更內容（顯示新舊值對比）
- [ ] 批次送出 PATCH API，成功後自動解鎖
- [ ] 成功／失敗提示（顯示哪些成功、哪些失敗及原因）
- [ ] 鎖定超時提示（TTL 1小時，提醒使用者重新 export）

### Admin 功能（`src/app/admin/`）

- [ ] 顯示所有目前被鎖定的機器列表（locked_by, locked_at）
- [ ] 強制解鎖按鈕（呼叫 POST /baremetal/unlock/force）

### API 串接

- [ ] 等後端支援後，將 `NEXT_PUBLIC_USE_MOCK` 改為 `false`
- [ ] 確認後端支援分頁參數（`page`、`limit`）
- [ ] 換成後端分頁（目前為前端分頁）
- [ ] Error handling — API 失敗時顯示錯誤訊息

---

## 備註

- Mock 資料開關：`.env.local` 的 `NEXT_PUBLIC_USE_MOCK`
- 後端 API base URL：`.env.local` 的 `NEXT_PUBLIC_API_URL`
- 後端分頁 API 規格請參考後端工程師需求文件
- 預計功能
  - 登入串 oauth
  - update batch
