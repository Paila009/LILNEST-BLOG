import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const formIcon = (form) => {
  const f = (form || "").toLowerCase();
  if (f.includes("tablet") || f.includes("capsule")) return "Pill";
  if (f.includes("syrup") || f.includes("solution")) return "Beaker";
  if (f.includes("drop")) return "Droplet";
  if (f.includes("cream") || f.includes("gel") || f.includes("ointment")) return "FlaskConical";
  if (f.includes("inhaler")) return "Wind";
  if (f.includes("spray")) return "SprayCan"; // may fallback to HelpCircle
  return "Package";
};

const MedicineCard = ({ item, kind = 'mother', onView, onAdd }) => {
  const accent = kind === 'mother' ? "#FDECF4" : "#F8FBFF";
  const badgeBg = kind === 'mother' ? "bg-pink-500/15 dark:bg-pink-500/20" : "bg-blue-500/15 dark:bg-blue-500/20";
  const badgeText = kind === 'mother' ? "text-pink-700 dark:text-pink-300" : "text-blue-700 dark:text-blue-300";
  return (
    <div
      className="rounded-xl border border-border p-4 shadow-soft hover-lift transition-all duration-200 bg-card"
      aria-label={`${item.name} card`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white dark:bg-background border border-border flex items-center justify-center">
            <Icon name={formIcon(item.form)} size={20} className="text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{item.name}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {item.form} • {kind === 'mother' ? 'Pregnant Mother' : 'Baby / Child'}
            </div>
          </div>
        </div>

        <span
          className={`text-[10px] px-2 py-1 rounded border ${badgeBg} ${badgeText} border-transparent`}
          aria-label="Doctor approval required"
        >
          {item.safety_level || 'Doctor Required'}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-100">{item.category}</span>
        <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-100">{item.condition}</span>
        {kind === 'baby' && (
          <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-100">Min age: {item.minimum_age}</span>
        )}
        {kind === 'mother' && item.trimester_safety && (
          <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-100">{item.trimester_safety}</span>
        )}
      </div>

      <div className="mt-3 text-xs text-gray-700 dark:text-gray-300">
        Use only with a doctor-approved prescription. LILNEST does not provide doses.
      </div>

      <div className="mt-4 flex gap-2">
        <Button size="sm" onClick={() => onView?.(item)} aria-label={`View details for ${item.name}`}>View Details</Button>
        <Button size="sm" variant="secondary" onClick={() => onAdd?.(item)} aria-label={`Add ${item.name} to prescription`}>
          Add to Prescription
        </Button>
      </div>
    </div>
  );
};

export default MedicineCard;
