// 錯誤為甚麼不寫在這裡
// api.ts 的職責只有一件事：跟後端要資料。
// 錯誤在不同頁面元件去 handle

import { BareMetalHost, BareMetalListParams } from "@/types/bareMetal";

const BASE_URL =
  process.env.BAREMETAL_SERVICE_API_URL ?? "http://localhost:8000"; // localhost 拿掉或確認預設值

export async function fetchBareMetalHosts(
  params?: BareMetalListParams,
): Promise<BareMetalHost[]> {
  const url = new URL(`${BASE_URL}/baremetal`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch bare metal hosts: ${res.status}`);
  }

  return res.json();
}

export async function fetchBareMetalHost(name: string): Promise<BareMetalHost> {
  const res = await fetch(`${BASE_URL}/baremetal/${name}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch host ${name}: ${res.status}`);
  }

  return res.json();
}

export async function updateBareMetalHost(
  name: string,
  data: Partial<BareMetalHost>,
): Promise<BareMetalHost> {
  const res = await fetch(`${BASE_URL}/baremetal/${name}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to update host ${name}: ${res.status}`);
  }

  return res.json();
}
