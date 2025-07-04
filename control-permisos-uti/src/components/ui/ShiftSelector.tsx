import React from 'react';

interface ShiftSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export default function ShiftSelector({
  value,
  onChange,
  label = 'Turno',
  className = ''
}: ShiftSelectorProps) {
  const shifts = [
    { value: 'matutino', label: 'Matutino' },
    { value: 'vespertino', label: 'Vespertino' },
    { value: 'nocturno_a', label: 'Nocturno A' },
    { value: 'nocturno_b', label: 'Nocturno B' },
    { value: 'especial', label: 'Especial' },
    { value: 'fin_semana', label: 'Sábados, Domingo y días Festivos' }
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {shifts.map((shift) => (
          <div key={shift.value} className="flex items-center">
            <input
              id={`shift-${shift.value}`}
              name="shift"
              type="radio"
              checked={value === shift.value}
              onChange={() => onChange(shift.value)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={`shift-${shift.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {shift.label}
            </label>
          </div>
        ))}