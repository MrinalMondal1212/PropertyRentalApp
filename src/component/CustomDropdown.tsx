import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomDropdown = ({
  label,
  options,
  value,
  setValue,
}: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[220px] relative">
      
      {/* Label */}
      <p className="text-[#E7A837] text-[25px] mt-3">{label}</p>

      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className="mt-4 flex justify-between items-center cursor-pointer text-white text-2xl border-b border-white/30 pb-2 group"
      >
        <span className="font-thin">{value}</span>

        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Options */}
      {open && (
        <div className="absolute top-[90px] left-0 w-full bg-[#111] border border-[#E7A837]/30 rounded-xl shadow-xl z-50 overflow-hidden">
          {options.map((item: string) => (
            <div
              key={item}
              onClick={() => {
                setValue(item);
                setOpen(false);
              }}
              className="px-4 py-3 text-white hover:bg-[#E7A837] hover:text-black cursor-pointer transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;