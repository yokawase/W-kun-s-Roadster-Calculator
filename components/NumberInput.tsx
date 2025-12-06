import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon?: LucideIcon;
  step?: number;
  min?: number;
  suffix?: string;
  description?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  icon: Icon,
  step = 1000,
  min = 0,
  suffix = "円",
  description
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-slate-500" />}
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type="number"
          min={min}
          step={step}
          value={value.toString()} // Handle leading zeros better by casting to string
          onFocus={(e) => e.target.select()} // UX improvement: select all on focus
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            onChange(isNaN(val) ? 0 : val);
          }}
          className="block w-full rounded-md border-gray-300 pl-3 pr-12 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm">{suffix}</span>
        </div>
      </div>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
    </div>
  );
};