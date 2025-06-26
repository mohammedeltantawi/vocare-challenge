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

  return (
    <div className="relative flex-1 border-l bg-white min-h-[1920px]">
      {/* hour lines */}
      {Array.from({ length: endHour - startHour + 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full border-t border-dotted text-xs text-gray-400 px-1"
          style={{
            top: `${i * hourHeight}px`,
            height: `${hourHeight}px`,
          }}
        >
        </div>
      ))}

      {/* appointments */}
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
            <AppointmentCard appointment={appt} />
          </div>
        );
      })}

    </div>
  );
}
