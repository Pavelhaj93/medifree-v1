"use client";

import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  max: number;
  onChange: (value: number) => void;
  label?: string;
};

export default function QuantityStepper({ value, max, onChange, label = "Počet kusů" }: Props) {
  return (
    <div className="inline-flex items-center border border-gray-200 rounded-full bg-white" role="group" aria-label={label}>
      <button
        type="button"
        className="p-2 hover:bg-gray-100 rounded-l-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Odebrat kus"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="px-4 text-sm tabular-nums min-w-10 text-center" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="p-2 hover:bg-gray-100 rounded-r-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Přidat kus"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
