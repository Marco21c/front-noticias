import { useState } from "react";
import ToggleSwitch from "../../../components/ui/ToggleSiwutch";
import type { NewsletterOption } from "@/types/Newsletters.type";

interface Props {
  options: NewsletterOption[];
  isAuthenticated: boolean;
  onRequireLogin?: () => void;
  onChange?: (selected: string[]) => void;
}

export default function NewsletterCards({
  options,
  isAuthenticated,
  onRequireLogin,
  onChange,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string, value: boolean) => {
    if (!isAuthenticated) {
      onRequireLogin?.();
      return;
    }

    const updated = value
      ? [...selected, id]
      : selected.filter((x) => x !== id);

    setSelected(updated);
    onChange?.(updated);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((opt) => {
        const active = selected.includes(opt._id);

        return (
          <div key={opt._id} className="p-6 rounded-2xl border bg-white shadow-sm flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
               <img src={opt.img} alt={opt.title} className="w-8 h-8" />
                <h3 className="font-semibold">{opt.title}</h3>
              </div>

              <p className="text-sm text-gray-600">
                {opt.description}
              </p>
            </div>

            <ToggleSwitch
              checked={active}
              onChange={(v) => toggle(opt._id, v)}
            />
          </div>
        );
      })}
    </div>
  );
}
