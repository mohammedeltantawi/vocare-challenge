"use client";
import TermineBarComponent from '@/components/termine-bar.component';
import CalendarGrid from "@/components/calendar-grid.component";
import ListView from '@/components/list-view.component';
import { ViewEnum } from '@/enums/view-type.enum';
import { Appointment } from "@/models/appointment.model";
import { useState } from 'react';

interface Props {
  appointments: Appointment[];
}

export default function AppointmentsClient({ appointments }: Props) {
  const [view, setView] = useState<ViewEnum>(ViewEnum.WEEK);

  const startOfWeek = new Date();
  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <main className="p-4">
      <TermineBarComponent view={view} setView={setView} />
      
      <div className="grid grid-cols-7 text-center text-sm border-b font-medium">
        {weekDates.map((d, i) => (
          <div key={i} className="py-2">
            {d.toLocaleDateString("de-DE", {
              weekday: "long",
              day: "2-digit",
              month: "short",
            })}
          </div>
        ))}
      </div>

      {view === ViewEnum.LIST && (
        <ListView appointments={appointments} selectedDate={new Date()} />
      )}
      {view === ViewEnum.WEEK && (
        <CalendarGrid weekDates={weekDates} appointments={appointments} />
      )}
    </main>
  );
}
