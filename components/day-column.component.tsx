import AppointmentCard from "./appointment-card.component";
import { Appointment } from "@/models/appointment.model";

interface Props {
  day: Date;
  appointments: Appointment[];
}

export default function DayColumn({ day, appointments }: Props) {
  return (
    <div className="relative flex-1 border-l">
      <div className="absolute inset-0">
        {appointments.map((appt) => {
          const top = (new Date(appt.start).getHours() + new Date(appt.start).getMinutes() / 60 - 6) * 60; // 6am start
          const height = (new Date(appt.end).getTime() - new Date(appt.start).getTime()) / (1000 * 60); // minutes
          return (
            <div key={appt.id} style={{ top: `${top}px`, height: `${height}px` }}>
              <AppointmentCard appointment={appt} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
