import BareMetalTable from "@/components/baremetal/BareMetalTable";
import { fetchBareMetalHosts } from "@/lib/api";
import { mockHosts } from "@/lib/mock";
import { BareMetalHost } from "@/types/bareMetal";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export default async function QueryPage() {
  let hosts: BareMetalHost[] = [];

  if (USE_MOCK) {
    hosts = mockHosts;
  } else {
    try {
      hosts = await fetchBareMetalHosts();
    } catch {
      // API 失敗時顯示空表格
    }
  }

  return (
    <div className="flex flex-col h-full">
      <BareMetalTable hosts={hosts} />
    </div>
  );
}
