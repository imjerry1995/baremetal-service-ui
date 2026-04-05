interface NavItem {
  label: string;
  href: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "General",
    items: [{ label: "Home", href: "/" }],
  },
  {
    label: "Bare Metal",
    items: [
      { label: "Query", href: "/baremetal/query" },
      { label: "Update", href: "/baremetal/update" },
    ],
  },
];
