import DayColumn from "./day-column.component";
import HourColumn from "./hour-column.component";
import { Appointment } from "@/models/appointment.model";
import { useEffect, useState, useRef } from "react";

interface Props {
  weekDates: Date[];
  appointments: Appointment[];
}

export default function CalendarGrid({ weekDates, appointments }: Props) {

  const startHour = 0;
  const endHour = 23;
  const hourHeight = 120;
  const [nowTop, setNowTop] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const minutesFromStart = totalMinutes - startHour * 60;

      if (minutesFromStart < 0 || minutesFromStart > (endHour - startHour) * 60) {
        setNowTop(null);
      } else {
        setNowTop((minutesFromStart / 60) * hourHeight);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      sourceRefs.current.length !== weekDates.length ||
      sourceRefs.current.some((el) => !el)
    ) {
      return;
    }

    const observer = new ResizeObserver(() => {
      weekDates.forEach((_, i) => {
        const sourceEl = sourceRefs.current[i];
        const targetEl = targetRefs.current[i];
        if (sourceEl && targetEl) {
          const width = sourceEl.getBoundingClientRect().width;
          targetEl.style.width = `${width}px`;
        }
      });
    });

    sourceRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [weekDates]);



  return (
    <div className="overflow-x-scroll w-[100vw] h-[1020px]">
      {/* Header + Grid */}
      <div className="min-w-max">
        {/* Date Headers */}
        <div className="flex w-full border-b text-sm font-medium">
          {/* Hour column spacer */}
          <div className="w-[80px] flex-shrink-0 bg-white" />
          {/* Scrollable day headers */}
          {weekDates.map((d, i) => {
            const isToday = new Date().toDateString() === d.toDateString();
            return (
              <div
                key={i}
                ref={(el) => {
                  targetRefs.current[i] = el;
                }}
                className={`h-16 flex items-center justify-center border-r whitespace-nowrap bg-white ${
                  isToday ? "bg-secondary" : ""
                }`}
              >
                {d.toLocaleDateString("de-DE", {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                })}
              </div>
            );
          })}
        </div>

        {/* Time + Day Columns */}
        <div className="flex w-full relative">
          {/* Hour labels */}
          <div className="w-[80px] flex-shrink-0 relative">
            <HourColumn />
          </div>

          {nowTop !== null && (
            <div
              className="absolute left-[60px] right-0 h-[2px] bg-red-500 z-20 flex items-center"
              style={{ top: `${nowTop}px` }}
            >
              <div className="absolute -left-[30px] -top-[10px] px-1 py-0.5 text-xs font-medium text-white bg-red-500 rounded-md shadow">
                {new Date().toLocaleTimeString("de-DE", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          )}


          {/* Day columns */}
          {weekDates.map((date, i) => {
          const dayStart = new Date(date);
          dayStart.setHours(0, 0, 0, 0);

          const dayEnd = new Date(date);
          dayEnd.setHours(23, 59, 59, 999);

          const dayAppointments = appointments.flatMap((appt) => {
            const apptStart = new Date(appt.start);
            const apptEnd = new Date(appt.end);

            // Does it overlap this day at all?
            if (apptEnd < dayStart || apptStart > dayEnd) return [];

            // If it starts on this day: pass as is
            if (apptStart >= dayStart && apptStart <= dayEnd) {
              return [appt];
            }

            // If it started before but ends during or after this day: clone with start = 00:00
            if (apptStart < dayStart && apptEnd > dayStart) {
              return [
                {
                  ...appt,
                  start: dayStart.toISOString(), // starts at 00:00
                },
              ];
            }

            return [];
          });

          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <div
              key={i}
              ref={(el) => {
                  sourceRefs.current[i] = el;
                }}
                className="day-column-measurable flex-shrink-0 w-[400px] border-l h-full"
            >
              <DayColumn
                day={date}
                appointments={dayAppointments}
                isToday={isToday}
              />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}