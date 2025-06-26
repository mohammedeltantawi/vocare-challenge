import { Appointment } from "@/models/appointment.model";
import { Clock, MapPin, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils"; // use this if you're using `clsx`-style utility

interface Props {
  appointment: Appointment;
}

const categoryStyles: Record<string, string> = {
  medical: "border-l-green-600 bg-green-50",
  assessment: "border-l-purple-600 bg-purple-50",
  default: "border-l-gray-300 bg-muted",
};

export default function AppointmentCard({ appointment }: Props) {
  const didPass = (apptEnd:string) => {
    return new Date(apptEnd) < new Date()
  } 
  const category = appointment.category?.toLowerCase() || "default";
  const colors = categoryStyles[category] || categoryStyles.default;

  return (
    <div
      className={cn(
        "absolute left-1 right-1 rounded-md border-l-4 p-3 shadow-sm text-sm",
        colors
      )}
    >
      <div className="flex justify-between items-start">
        <strong className={`{block ${didPass(appointment.end) && "line-through"}`}>{appointment.title}</strong>
        <input 
          type="checkbox" 
          className="h-4 w-4 rounded border border-gray-300 bg-white text-white checked:bg-black checked:border-black appearance-none relative 
             before:absolute before:inset-0 before:flex before:items-center before:justify-center
             checked:before:content-['✓'] checked:before:text-white checked:before:text-xs cursor-pointer" readOnly
          checked={didPass(appointment.end)}
          />
      </div>

      <div className="flex items-center gap-1 mt-1 text-secondaryText">
        <Clock size={12} className="flex-shrink-0" />
        <p className="text-xs">
          {new Date(appointment.start).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          bis{" "}
          {new Date(appointment.end).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {appointment.location && (
        <div className="flex items-center gap-1 mt-1 text-secondaryText">
          <MapPin size={12} className="flex-shrink-0" />
          <p className="text-xs whitespace-normal break-words">
            {appointment.location}
          </p>
        </div>
      )}

      {appointment.notes && (
        <div className="flex items-center gap-1 mt-1 text-secondaryText">
          <MessageSquareText size={12} className="flex-shrink-0" />
          <p className="text-xs whitespace-normal break-words">
            {appointment.notes}
          </p>
        </div>
      )}
    </div>
  );
}
