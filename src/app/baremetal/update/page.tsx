import BareMetalUpdateTable from "@/components/baremetal/BareMetalUpdateTable";
import { fetchBareMetalHosts } from "@/lib/api";
import { mockHosts } from "@/lib/mock";
import { BareMetalHost } from "@/types/bareMetal";
import { USE_MOCK } from "@/lib/config";

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
      <BareMetalUpdateTable hosts={hosts} />
    </div>
  );
}
