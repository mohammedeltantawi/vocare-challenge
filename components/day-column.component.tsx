import AppointmentCard from "./appointment-card.component";
import { Appointment } from "@/models/appointment.model";
import { useEffect, useRef, useState } from "react";

interface Props {
  day: Date;
  appointments: Appointment[];
}

export default function DayColumn({ day, appointments }: Props) {
  const startHour = 6;
  const endHour = 22;
  const hourHeight = 120; // px

  const [nowTop, setNowTop] = useState<number | null>(null);

  // Position current time red line
  useEffect(() => {
    const update = () => {
      const now = new Date();
      if (now.toDateString() !== day.toDateString()) {
        setNowTop(null);
        return;
      }
      const minutesFromStart = (now.getHours() - startHour) * 60 + now.getMinutes();
      setNowTop(minutesFromStart);
    };
    update();
    const interval = setInterval(update, 60000); // every minute
    return () => clearInterval(interval);
  }, [day]);

  return (
    <div className="relative flex-1 border-l bg-white">
      {/* hour lines */}
      {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full border-t text-xs text-gray-400 px-1"
          style={{
            top: `${i * hourHeight}px`,
            height: `${hourHeight}px`,
          }}
        >
        </div>
      ))}

      {/* current time line */}
      {nowTop !== null && (
        <div
          className="absolute left-0 right-0 h-[2px] bg-red-500 z-10"
          style={{ top: `${nowTop}px` }}
        />
      )}

      {/* appointments */}
      {appointments.map((appt) => {
        const start = new Date(appt.start);
        const end = new Date(appt.end);
        const minutesFromStart = (start.getHours() - startHour) * 60 + start.getMinutes();
        const durationInMinutes = (end.getTime() - start.getTime()) / 60000;

        return (
          <div
            key={appt.id}
            className="absolute px-1"
            style={{
              top: `${minutesFromStart}px`,
              height: `${durationInMinutes}px`,
              left: "2px",
              right: "2px",
            }}
          >
            <AppointmentCard appointment={appt} />
          </div>
        );
      })}
    </div>
  );
}
