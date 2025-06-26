import { Appointment } from "@/models/appointment.model";
import { Clock, MapPin, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/context/category.context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { usePatients } from "@/context/patient.context";

interface Props {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: Props) {
  const didPass = (apptEnd: string) => new Date(apptEnd) < new Date();

  const categories = useCategories();
  const category = categories.find((c) => c.id === appointment.category);
  const patients = usePatients();
  const patient = patients.find((c) => c.id === appointment.patient);

  const borderColor = category?.color || "#ccc"; // fallback to light gray
  const bgColor = `${category?.color}20`; // transparent variant for background

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  const getPatient = () => {
    return `${patient?.firstname} ${patient?.lastname}`
  }
  return (
    <div
      className={cn(
        "rounded-md p-3 shadow-sm text-sm border-l-4"
      )}
      style={{
        borderLeftColor: borderColor,
        backgroundColor: bgColor,
      }}
    >
      <div className="flex justify-between items-start">
        <HoverCard>
        <HoverCardTrigger asChild>
        <strong className={cn("block", didPass(appointment.end) && "line-through")}>
          {appointment.title}
        </strong>
        </HoverCardTrigger>
        <HoverCardContent className="w-64 bg-secondary p-3 text-sm space-y-1 border-l-4" style={{
            borderLeftColor: bgColor, 
            }}>
            <div className="font-semibold">{appointment.title}</div>
            <div className="flex flex-row gap-2 items-center">
              <Clock size={16} className="flex-shrink-0" />
              <p className="text-sm text-secondaryText">
                {formatTime(appointment.start)} bis {formatTime(appointment.end)}
              </p>
            </div>
            {appointment.location &&                       
            <div className="flex flex-row gap-2 items-center">
                <MapPin size={16} className="flex-shrink-0" />
                <p className="text-sm text-secondaryText">{appointment.location}</p>
              </div>}
            {appointment.notes && 
            <div className="flex flex-row gap-2 items-center">
                <MessageSquareText size={16} className="flex-shrink-0" />
                <p className="text-sm text-secondaryText">{appointment.notes}</p>
              </div>}

            {appointment.category && 
            <div className="flex flex-row gap-2 items-center">
                <p className="text-sm text-secondaryText">{categories.find((c) => c.id === appointment.category)?.label}</p>
              </div>}
            {appointment.patient && 
            <div className="flex flex-row gap-2 items-center">
                <p className="text-sm text-secondaryText">{getPatient()}</p>
              </div>}
          </HoverCardContent>
        </HoverCard>

        <input
          type="checkbox"
          readOnly
          checked={didPass(appointment.end)}
          className={cn(
            "h-4 w-4 rounded border border-gray-300 bg-white text-white appearance-none relative",
            "before:absolute before:inset-0 before:flex before:items-center before:justify-center",
            "checked:bg-black checked:border-black checked:before:content-['✓'] checked:before:text-white checked:before:text-xs cursor-pointer"
          )}
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
