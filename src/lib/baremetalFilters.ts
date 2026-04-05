import { BareMetalHost } from '@/types/bareMetal'

export function filterHosts(
  hosts: BareMetalHost[],
  q: string,
  pool: string
): BareMetalHost[] {
  const query = q.toLowerCase()

  return hosts.filter((h) => {
    if (
      query &&
      !h.name.toLowerCase().includes(query) &&
      !h.serial_number.toLowerCase().includes(query) &&
      !(h.purchase_order ?? '').toLowerCase().includes(query) &&
      !h.networks.admin_network.ip.includes(query) &&
      !h.networks.admin_network.mac.includes(query) &&
      !h.networks.provision_network.ip.includes(query) &&
      !h.networks.provision_network.mac.includes(query)
    )
      return false

    if (pool && h.pool !== pool) return false

    return true
  })
}