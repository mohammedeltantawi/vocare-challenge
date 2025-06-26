import { Appointment } from "@/models/appointment.model";

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: Props) {
  return (
    <div className="absolute left-1 right-1 rounded-md shadow-sm p-2 text-sm bg-gray-100">
      <strong className="block">{appointment.title}</strong>
      <p className="text-xs text-gray-600">{new Date(appointment.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(appointment.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      {appointment.location && <p className="text-xs text-gray-500">{appointment.location}</p>}
      {appointment.notes && <p className="text-xs text-gray-500">{appointment.notes}</p>}
    </div>
  );
}
