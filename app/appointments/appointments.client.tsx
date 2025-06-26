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

  // Get start of current week (Monday)
  const startOfWeek = new Date();
  const dayOfWeek = startOfWeek.getDay(); // Sunday = 0, Monday = 1, ...
  const diffToMonday = (dayOfWeek + 6) % 7; // Makes Monday the first day
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);

  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <main className="p-4">
      <TermineBarComponent view={view} setView={setView} />

      {view === ViewEnum.LIST && (
        <ListView appointments={appointments} selectedDate={new Date()} />
      )}

      {view === ViewEnum.WEEK && (
        <CalendarGrid weekDates={weekDates} appointments={appointments} />
      )}
    </main>
  );
}
