"use client";
import TermineBarComponent from '@/components/termine-bar.component';
import CalendarGrid from "@/components/calendar-grid.component";
import ListView from '@/components/list-view.component';
import { ViewEnum } from '@/enums/view-type.enum';
import { Appointment } from "@/models/appointment.model";
import { useState, useEffect, useRef } from 'react';
import WeekColumn from '@/components/week-column.component';
import HourColumn from '@/components/hour-column.component';

interface Props {
  appointments: Appointment[];
}

export default function AppointmentsClient({ appointments }: Props) {
  const [view, setView] = useState<ViewEnum>(ViewEnum.WEEK);
  const [visibleWeeks, setVisibleWeeks] = useState<number[]>(() =>
    Array.from({ length: 5 }, (_, i) => i - 2) // start with [-2, -1, 0, 1, 2]
  );

  const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth, scrollWidth } = scrollEl;

      const nearRight = scrollLeft + clientWidth > scrollWidth - 200;
      const nearLeft = scrollLeft < 200;

      if (nearRight) {
        setVisibleWeeks((prev) => {
          const max = Math.max(...prev);
          return [...prev, max + 1];
        });
      }

      if (nearLeft) {
        setVisibleWeeks((prev) => {
          const min = Math.min(...prev);
          return [min - 1, ...prev];
        });
      }
    };

    scrollEl.addEventListener("scroll", handleScroll);
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="p-4">
      <TermineBarComponent view={view} setView={setView} />
      {view === ViewEnum.LIST && (
        <ListView appointments={appointments} selectedDate={new Date()} />
      )}
      {view === ViewEnum.WEEK &&  (
        <div ref={scrollRef} className="overflow-auto border rounded-lg w-full h-[1100px] relative scroll-smooth">
          <div className="flex min-w-max">
            {/* Sticky Hour Column */}
            <div className="sticky left-0 z-10 bg-white w-[60px] flex-shrink-0">
              <div className="h-20" />
              <HourColumn />
            </div>

            {/* Scrollable Day Columns */}
            {visibleWeeks.map((offset) => (
              <WeekColumn
                key={offset}
                weekOffset={offset}
                appointments={appointments}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
