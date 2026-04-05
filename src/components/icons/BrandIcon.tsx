// className 可以增加彈性
export default function BrandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={className ?? "w-4 h-4"}>
      <rect x="1" y="1" width="7" height="7" rx="1.5" fill="#185FA5" />
      <rect x="10" y="1" width="7" height="7" rx="1.5" fill="#185FA5" />
      <rect x="1" y="10" width="7" height="7" rx="1.5" fill="#185FA5" />
      <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#85B7EB" />
    </svg>
  );
}
