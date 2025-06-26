import { Appointment } from "@/models/appointment.model";
import AppointmentCard from "./appointment-card.component";
import { Clock, MapPin, MessageSquareText } from "lucide-react";

interface Props {
  appointments: Appointment[];
  selectedDate: Date;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" });

export default function ListView({ appointments, selectedDate }: Props) {
  const grouped = groupAppointmentsByDay(appointments);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {Object.entries(grouped).length === 0 && (
        <div className="text-center text-gray-500 mt-10">Keine weiteren Termine gefunden</div>
      )}

      {Object.entries(grouped).map(([date, appts]) => {
        const dateObj = new Date(date);
        const isToday = dateObj.toDateString() === selectedDate.toDateString();

        return (
          <div key={date} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">{formatDate(dateObj)}</h2>
              {isToday && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                  Heute
                </span>
              )}
            </div>
            <div className="space-y-3">
              {appts.map((appt) => (
                <div
                  key={appt.id}
                  className="rounded-md p-4 shadow-sm border bg-white"
                >
                  <div className="font-semibold text-lg">{appt.title}</div>
                    <div className="flex flex-row gap-2 items-center">        
                    <Clock color="var(--secondary-text)" className="flex-shrink-0" size={18}></Clock> 
                    <p className="text-sm text-secondaryText">{formatTime(appt.start)} bis {formatTime(appt.end)}</p>
                  </div>
                  {appt.location && (
                    <div className="flex flex-row gap-2 items-center">        
                      <MapPin color="var(--secondary-text)" className="flex-shrink-0" size={18}></MapPin> 
                      <p className="text-sm text-secondaryText">{appt.location}</p>
                    </div>
                  )}
                  {appt.notes && (
                    <div className="flex flex-row gap-2 items-center">        
                      <MessageSquareText color="var(--secondary-text)" className="flex-shrink-0" size={18}></MessageSquareText> 
                      <p className="text-sm text-secondaryText">{appt.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function groupAppointmentsByDay(appointments: Appointment[]) {
  return appointments.reduce<Record<string, Appointment[]>>((acc, appt) => {
    const day = new Date(appt.start).toDateString();
    acc[day] = acc[day] || [];
    acc[day].push(appt);
    return acc;
  }, {});
}
