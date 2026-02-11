import { motion } from "framer-motion";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleSwitch({
  checked,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors
        ${checked ? "bg-blue-600" : "bg-gray-300"}
      `}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 bg-white rounded-full shadow-md"
        style={{
          marginLeft: checked ? 20 : 0,
        }}
      />
    </button>
  );
}
