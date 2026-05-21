// _components/StatusBadge.jsx
// Server Component

import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const statusConfig = {
  pending: {
    icon: FaClock,
    label: "Pending",
    className:
      "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900",
  },
  confirmed: {
    icon: FaCheckCircle,
    label: "Confirmed",
    className:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900",
  },
  cancelled: {
    icon: FaTimesCircle,
    label: "Cancelled",
    className:
      "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900",
  },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${config.className}`}
    >
      <Icon className="text-xs" />
      {config.label}
    </span>
  );
}
