"use client";
import TermineBarComponent from '@/components/termine-bar.component';
import CalendarGrid from "@/components/calendar-grid.component";
import ListView from '@/components/list-view.component';
import { ViewEnum } from '@/enums/view-type.enum';
import { Appointment } from "@/models/appointment.model";
import { useState } from 'react';
import { CategoryContext } from '@/context/category.context';

interface Props {
  appointments: Appointment[];
  categories: { id: string; label: string; color: string }[];
}

export default function AppointmentsClient({ appointments, categories }: Props) {
  const [view, setView] = useState<ViewEnum>(ViewEnum.WEEK);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get start of the week based on selectedDate
  const startOfWeek = new Date(selectedDate);
  const dayOfWeek = startOfWeek.getDay(); // Sunday = 0
  const diffToMonday = (dayOfWeek + 6) % 7; // Makes Monday the first day
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday);

  const weekDates = [...Array(7)].map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <CategoryContext.Provider value={categories}>
      <main className="p-4">
        <TermineBarComponent
          view={view}
          setView={setView}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {view === ViewEnum.LIST && (
          <ListView appointments={appointments} selectedDate={selectedDate} />
        )}
        {view === ViewEnum.WEEK && (
          <CalendarGrid weekDates={weekDates} appointments={appointments} />
        )}
      </main>
    </CategoryContext.Provider>
  );
}
