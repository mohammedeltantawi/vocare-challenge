import DayColumn from "./day-column.component";
import { Appointment } from "@/models/appointment.model";

interface Props {
  weekDates: Date[];
  appointments: Appointment[];
}

export default function CalendarGrid({ weekDates, appointments }: Props) {
  return (
    <div className="grid grid-cols-7 border-t border-r text-sm h-[1000px] relative">
      {weekDates.map((date, idx) => (
        <DayColumn
          key={idx}
          day={date}
          appointments={appointments.filter(
            (appt) =>
              new Date(appt.start).toDateString() === date.toDateString()
          )}
        />
      ))}
    </div>
  );
}
