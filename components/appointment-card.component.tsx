import { Appointment } from "@/models/appointment.model";
import { Clock, MapPin, MessageSquareText } from "lucide-react";

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: Props) {
  return (
    <div className="absolute left-1 right-1 rounded-md shadow-sm p-2 text-sm bg-secondary">
      <strong className="block">{appointment.title}</strong>
      <div className="flex flex-row gap-1 items-center">
        <Clock color="var(--secondary-text)" size={12}></Clock>
        <p className="text-xs text-secondaryText">{new Date(appointment.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(appointment.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>
      {appointment.location && 
      <div className="flex flex-row gap-1 items-center">
        <MapPin color="var(--secondary-text)" className="flex-shrink-0" size={12}></MapPin>
        <p className="text-xs text-secondaryText whitespace-normal break-words">{appointment.location}</p>
      </div>
      }
      {appointment.notes &&
      <div className="flex flex-row gap-1 items-center">
        <MessageSquareText color="var(--secondary-text)" className="flex-shrink-0" size={12}></MessageSquareText>
        <p className="text-xs text-secondaryText whitespace-normal break-words">{appointment.notes}</p>
      </div>
       }
    </div>
  );
}
