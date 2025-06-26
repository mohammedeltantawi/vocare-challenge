import { Appointment } from "@/models/appointment.model";
import { cn } from "@/lib/utils";

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
  onSelectDate?: (date: Date) => void;
}

export default function MonthView({ selectedDate, appointments, onSelectDate }: Props) {
  const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

  // Determine the start of the calendar grid (Monday of first week)
  const startDay = new Date(startOfMonth);
  startDay.setDate(startDay.getDate() - ((startDay.getDay() + 6) % 7));

  // Determine the end of the calendar grid (Sunday of last week)
  const endDay = new Date(endOfMonth);
  endDay.setDate(endDay.getDate() + (7 - ((endDay.getDay() + 6) % 7) - 1));

  // Generate all days for the grid
  const days: Date[] = [];
  let current = new Date(startDay);
  while (current <= endDay) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const isToday = (d: Date) => new Date().toDateString() === d.toDateString();
  const isSameMonth = (d: Date) => d.getMonth() === selectedDate.getMonth();

  const getAppointmentsForDay = (date: Date) =>
    appointments.filter((appt) => new Date(appt.start).toDateString() === date.toDateString());

  return (
    <div className="grid grid-cols-7 border-t border-l text-sm">
      {["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(
        (d) => (
          <div
            key={d}
            className="border-r border-b p-2 text-center font-medium bg-white sticky top-0 z-10"
          >
            {d}
          </div>
        )
      )}

      {days.map((day, i) => {
        const appts = getAppointmentsForDay(day);
        return (
          <div
            key={i}
            className={cn(
              "h-32 border-r border-b p-1 relative cursor-pointer transition-colors",
              "bg-white",
              isToday(day) && "bg-secondary"
            )}
            onClick={() => onSelectDate?.(day)}
          >
            <div
              className={cn(
                "text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full",
                isToday(day) ? "bg-primary text-white" : "text-gray-800"
              )}
            >
              {day.getDate()}
            </div>

            <div className="mt-1 space-y-1 overflow-hidden">
              {appts.slice(0, 2).map((appt) => (
                <div
                  key={appt.id}
                  className="truncate text-xs rounded px-1 py-0.5 bg-purple-100 text-purple-800 border-l-2 border-purple-600"
                >
                  {appt.title}
                </div>
              ))}
              {appts.length > 2 && (
                <div className="text-[10px] text-gray-500">+ weitere</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
