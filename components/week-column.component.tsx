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

  return (
    <div className="min-w-[1460px] flex">
      {/* Date headers and grid */}
      <div className="flex-1 overflow-x-auto">
        <div className="grid grid-cols-7 min-w-[1400px]">
          {weekDates.map((date, i) => (
            <div key={i} className="border-r h-20 flex items-center justify-center text-sm font-medium bg-white">
              {date.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "2-digit",
                month: "short",
              })}
            </div>
          ))}
        </div>

        <CalendarGrid weekDates={weekDates} appointments={appointments} />
      </div>
    </div>
  );
}
