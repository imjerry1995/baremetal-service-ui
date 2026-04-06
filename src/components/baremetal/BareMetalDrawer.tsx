"use client";

import { X } from "lucide-react";
import { BareMetalHost } from "@/types/bareMetal";

interface BareMetalDrawerProps {
  host: BareMetalHost | null;
  onClose: () => void;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-1.5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2">
      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-xs font-medium text-gray-900 break-all">
        {value ?? "—"}
      </p>
    </div>
  );
}

function FieldFull({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 rounded-lg px-3 py-2 col-span-2">
      <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
      <p className="text-xs font-medium text-gray-900 break-all">
        {value ?? "—"}
      </p>
    </div>
  );
}

function NetBlock({
  title,
  net,
}: {
  title: string;
  net: BareMetalHost["networks"]["admin_network"];
}) {
  return (
    <div className="col-span-2 border border-gray-200 rounded-lg overflow-hidden">
      <div className="px-3 py-1.5 bg-gray-100 border-b border-gray-200">
        <p className="text-[10px] font-medium text-gray-500">{title}</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-1.5">
        <Field label="IP" value={net.ip} />
        <Field label="MAC" value={net.mac} />
        <Field label="Mask" value={net.mask} />
        <Field label="Gateway" value={net.gateway} />
        <Field label="VLAN" value={net.vlan} />
      </div>
    </div>
  );
}

export default function BareMetalDrawer({
  host,
  onClose,
}: BareMetalDrawerProps) {
  if (!host) return null;

  return (
    <div className="w-80 shrink-0 border-l border-gray-200 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 truncate">
            {host.name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{host.serial_number}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <Section title="基本資訊">
          <Field label="Status" value={host.status} />
          <Field label="Model" value={host.model} />
          <Field label="Purchase order" value={host.purchase_order} />
          <Field label="Purchase req." value={host.purchase_requisition} />
          <Field label="Max utilization" value={host.max_utilization} />
          <FieldFull label="OS template" value={host.os_template} />
        </Section>

        <Section title="資源">
          <Field
            label="CPU cores"
            value={`${host.cpu_cores} cores (${host.available_cpu_cores} avail)`}
          />
          <Field
            label="Memory"
            value={`${host.memory_mib} MiB (${host.available_memory_mib} avail)`}
          />
          <FieldFull
            label="Storage"
            value={`${host.storage_gb} GB (${host.available_storage_gb} avail)`}
          />
        </Section>

        <Section title="位置">
          <Field label="Fab" value={host.fab} />
          <Field label="Phase" value={host.phase} />
          <Field label="Data center" value={host.data_center} />
          <Field label="Room" value={host.room} />
          <Field label="Rack" value={host.rack} />
          <Field label="Unit" value={host.unit} />
          <Field label="AG" value={host.ag} />
          <Field label="Pool" value={host.pool} />
        </Section>

        <Section title="網路">
          <Field label="AS number" value={host.as_number} />
          <NetBlock title="Admin" net={host.networks.admin_network} />
          <NetBlock title="Provision" net={host.networks.provision_network} />
        </Section>

        <Section title="外部系統">
          <Field label="External model ID" value={host.external_model_id} />
          <Field label="External system ID" value={host.external_system_id} />
          <Field label="Max VM" value={host.max_virtual_machine} />
          <Field label="BM group" value={host.baremetal_group} />
          <Field label="Failure zone" value={host.failure_zone} />
          <FieldFull label="Labels" value={host.labels} />
        </Section>

        <Section title="使用者 / 群組">
          <FieldFull
            label="Suppliers"
            value={host.suppliers.length ? host.suppliers.join(", ") : null}
          />
          <FieldFull
            label="User"
            value={host.user.length ? host.user.join(", ") : null}
          />
          <FieldFull
            label="User group"
            value={host.user_group.length ? host.user_group.join(", ") : null}
          />
        </Section>
      </div>
    </div>
  );
}
