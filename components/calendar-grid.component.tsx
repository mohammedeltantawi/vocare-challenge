import DayColumn from "./day-column.component";
import HourColumn from "./hour-column.component";
import { Appointment } from "@/models/appointment.model";
import { useEffect, useState } from "react";

interface Props {
  weekDates: Date[];
  appointments: Appointment[];
}

export default function CalendarGrid({ weekDates, appointments }: Props) {

  const startHour = 6;
  const endHour = 22;
  const hourHeight = 120; // px
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

  return (
    <div className="overflow-x-auto w-full h-[1020px]">
      {/* Header + Grid */}
      <div className="min-w-max">
        {/* Date Headers */}
        <div className="flex w-full border-b text-sm font-medium">
          {/* Hour column spacer */}
          <div className="w-[60px] flex-shrink-0 bg-white" />
          {/* Scrollable day headers */}
          {weekDates.map((d, i) => {
            const isToday = new Date().toDateString() === d.toDateString();
            return(
              <div
                key={i}
                className={`min-w-[300px] h-16 flex items-center justify-center border-r ${
                  isToday ? "bg-secondary" : "bg-white"
                }`}            >
                {d.toLocaleDateString("de-DE", {
                  weekday: "long",
                  day: "2-digit",
                  month: "short",
                })}
              </div>
            )
          })}
        </div>

        {/* Time + Day Columns */}
        <div className="flex w-full relative">
          {/* Hour labels */}
          <div className="w-[60px] flex-shrink-0 relative">
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
          {weekDates.map((date, idx) => { 
            const isToday = new Date().toDateString() === date.toDateString();
            return (
              <DayColumn
                key={idx}
                day={date}
                isToday={isToday}
                appointments={appointments.filter(
                  (appt) =>
                    new Date(appt.start).toDateString() === date.toDateString()
                )}
              />
            )})}
        </div>
      </div>
    </div>
  );
}
