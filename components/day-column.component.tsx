"use client";

import AppointmentCard from "./appointment-card.component";
import { Appointment } from "@/models/appointment.model";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentEditForm from "./appointment-edit.component";

interface Props {
  day: Date;
  appointments: Appointment[];
  isToday?: boolean;
}

export default function DayColumn({ appointments, isToday }: Props) {
  const startHour = 0;
  const endHour = 23;
  const hourHeight = 120; // px

  // --- Overlap detection helper ---
  function isOverlap(a: Appointment, b: Appointment) {
    const aStart = new Date(a.start).getTime();
    const aEnd = new Date(a.end).getTime();
    const bStart = new Date(b.start).getTime();
    const bEnd = new Date(b.end).getTime();
    return aStart < bEnd && bStart < aEnd;
  }

  // --- Sort and group overlapping appointments ---
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const groups: Appointment[][] = [];
  let currentGroup: Appointment[] = [];

  sortedAppointments.forEach((appt) => {
    if (currentGroup.length === 0) {
      currentGroup.push(appt);
      return;
    }
    const last = currentGroup[currentGroup.length - 1];
    if (isOverlap(last, appt)) {
      currentGroup.push(appt);
    } else {
      groups.push(currentGroup);
      currentGroup = [appt];
    }
  });
  if (currentGroup.length) {
    groups.push(currentGroup);
  }

  const dayHeight = hourHeight * (endHour - startHour + 1);

  return (
    <div
      className={`relative flex-1 border-l ${
        isToday ? "bg-secondary" : "bg-white"
      }`}
      style={{ minHeight: `${dayHeight}px` }}
    >
      {/* Hour lines */}
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

      {/* Render overlapping groups side-by-side */}
      {groups.map((group, groupIndex) => {
        const groupSize = group.length;
        return group.map((appt, i) => {
          const start = new Date(appt.start);
          const end = new Date(appt.end);
          const minutesFromStart = (start.getHours() - startHour) * 60 + start.getMinutes();
          const dayEnd = new Date(start);
          dayEnd.setHours(endHour, 59, 59, 999);

          const effectiveEnd = end > dayEnd ? dayEnd : end;
          const durationInMinutes = Math.max(0, (effectiveEnd.getTime() - start.getTime()) / 60000);
          const top = (minutesFromStart / 60) * hourHeight;
          const height = Math.max((durationInMinutes / 60) * hourHeight,35);

          const widthPercent = 100 / groupSize;
          const leftPercent = i * widthPercent;
          return (
            <div
              key={appt.id}
              className="absolute px-1"
              style={{
                top: `${top}px`,
                height: `${height}px`,
                width: `calc(${widthPercent}% - 4px)`, // Optional gap
                left: `${leftPercent}%`,
              }}
            >
              <Dialog key={appt.id}>
                <DialogTrigger asChild>
                  <div className="w-full h-full">
                    <AppointmentCard appointment={appt} />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Appointment</DialogTitle>
                  </DialogHeader>
                  <AppointmentEditForm
                    appointment={appt}
                    onSuccess={() => window.location.reload()}
                  />
                </DialogContent>
              </Dialog>
            </div>
          );
        });
      })}
    </div>
  );
}
