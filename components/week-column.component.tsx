import { Appointment } from "@/models/appointment.model";
import CalendarGrid from "./calendar-grid.component";

interface Props {
  weekOffset: number;
  appointments: Appointment[];
}

export default function WeekColumn({ weekOffset, appointments }: Props) {
  const getWeekDates = (offset: number) => {
    const start = new Date();
    start.setDate(start.getDate() + offset * 7);
    const week = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
    return week;
  };

  const weekDates = getWeekDates(weekOffset);
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="min-w-[1400px] border-l">
      <div className="grid grid-cols-7 text-xs font-medium border-b mb-2 h-10">
        {weekDates.map((date, i) => (
          <div 
            key={i} 
            className={`border-r h-full flex items-center justify-center ${
              isToday(date)
                ? "bg-secondary"
                : "bg-transparent"
            }`}
          >
            {date.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "2-digit",
                month: "long",
            })}
          </div>
        ))}
      </div>

      <CalendarGrid weekDates={weekDates} appointments={appointments} />
    </div>
  );
}
