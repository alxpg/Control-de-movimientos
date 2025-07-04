import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale'; // Para soporte en español

interface CalendarInputProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
}

export default function CalendarInput({ label, value, onChange }: CalendarInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    onChange(selectedDate.toISOString().split('T')[0]);
    setShowCalendar(false);
  };

  const renderDays = () => {
    const days = [];
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <button
          key={i}
          type="button"
          className={`p-2 rounded-full ${
            date.getDate() === i
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
          onClick={() =>
            handleDateChange(
              new Date(date.getFullYear(), date.getMonth(), i)
            )
          }
        >
          {i}
        </button>
      );
    }

    return days;
  };

  const handleMonthChange = (increment: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth() + increment, 1));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        readOnly
        value={value ? format(new Date(value), 'PPP', { locale: es }) : ''}
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        placeholder="Selecciona una fecha"
      />

      {showCalendar && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <button
              type="button"
              onClick={() => handleMonthChange(-1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              &lt;
            </button>
            <span className="font-medium">
              {format(date, 'MMMM yyyy', { locale: es })}
            </span>
            <button
              type="button"
              onClick={() => handleMonthChange(1)}
              className="p-1 rounded hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map((day) => (
              <div key={day} className="text-center text-sm font-medium">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  );
}