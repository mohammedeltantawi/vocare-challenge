import AppointmentCard from "./appointment-card.component";
import { Appointment } from "@/models/appointment.model";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import AppointmentEditForm from "./appointment-edit.component";
interface Props {
  day: Date;
  appointments: Appointment[];
  isToday?: boolean;
}

export default function DayColumn({ appointments, isToday }: Props) {
  const startHour = 6;
  const endHour = 22;
  const hourHeight = 120; // px

  return (
    <div className={`relative flex-1 border-l min-h-[1920px] ${isToday ? "bg-secondary" : "bg-white"}`}>
      {/* hour lines */}
      {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full border-t border-dotted text-xs text-gray-400 px-1"
          style={{
            top: `${i * hourHeight}px`,
            height: `${hourHeight}px`,
          }}
        />
      ))}

      {appointments.map((appt) => {
        const start = new Date(appt.start);
        const end = new Date(appt.end);
        const minutesFromStart = (start.getHours() - startHour) * 60 + start.getMinutes();
        const durationInMinutes = (end.getTime() - start.getTime()) / 60000;

        const top = (minutesFromStart / 60) * hourHeight;
        const height = (durationInMinutes / 60) * hourHeight;

        return (
          <div
            key={appt.id}
            className="absolute left-[2px] right-[2px] px-1"
            style={{
              top: `${top}px`,
              height: `${height}px`,
            }}
          >
            <Dialog key={appt.id} >
              <DialogTrigger asChild>
                <div className="w-full">
                  <AppointmentCard appointment={appt} />
                </div>
              </DialogTrigger>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <DialogContent>
                <AppointmentEditForm
                  appointment={appt}
                  onSuccess={() => window.location.reload()}
                />
              </DialogContent>
            </Dialog>
    </div>
        );
      })}
    </div>
  );
}
