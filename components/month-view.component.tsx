import { Appointment } from "@/models/appointment.model";
import { cn } from "@/lib/utils";
import { useCategories } from "@/context/category.context";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Clock, MapPin, MessageSquareText } from "lucide-react";
import { usePatients } from "@/context/patient.context";

interface Props {
  selectedDate: Date;
  appointments: Appointment[];
  setSelectedDate?: (date: Date) => void;
}

export default function MonthView({ selectedDate, appointments, setSelectedDate }: Props) {
  const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const categories = useCategories();
  const patients = usePatients();

  const startDay = new Date(startOfMonth);
  startDay.setDate(startDay.getDate() - ((startDay.getDay() + 6) % 7));

  const endDay = new Date(endOfMonth);
  endDay.setDate(endDay.getDate() + (7 - ((endDay.getDay() + 6) % 7) - 1));

  const days: Date[] = [];
  const current = new Date(startDay);
  while (current <= endDay) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const getPatient = (patientId: string) => {
    const patient = patients.find((c) => c.id === patientId);

    return `${patient?.firstname} ${patient?.lastname}`
  }


  const isToday = (d: Date) => new Date().toDateString() === d.toDateString();
  const isSelectedDate = (d: Date) => new Date(selectedDate).toDateString() === d.toDateString();
  const getAppointmentsForDay = (date: Date) =>
    appointments.filter((appt) => new Date(appt.start).toDateString() === date.toDateString());

  const getBackgroundColor =(categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return`${category?.color}20`;
  }
  return (
    <div>
    <div className="grid grid-cols-7 border-t border-l text-sm">
      {["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"].map(
        (d) => (
          <div
            key={d}
            className="border-r border-b p-2 text-center font-medium bg-white sticky top-0 z-10"
          >
            {d}
          </div>
        )
      )}

      {days.map((day, i) => {
        const appts = getAppointmentsForDay(day);
        return (
          <div
            key={i}
            className={cn(
              "h-32 border-r border-b p-1 relative cursor-pointer transition-colors",
              "bg-white",
              isSelectedDate(day) && "bg-secondary"
            )}
            onClick={() => setSelectedDate?.(day)}
          >
            <div
              className={cn(
                "text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full",
                isToday(day) ? "bg-primary text-white" : "text-gray-800"
              )}
            >
              {day.getDate()}
            </div>

            <div className="mt-1 space-y-1 overflow-hidden">
              {appts.slice(0, 2).map((appt) => (
                <HoverCard key={appt.id}>
                  <HoverCardTrigger asChild>
                    <div
                      key={appt.id}
                      className={cn("truncate text-xs rounded px-1 py-0.5 border-l-4 bg-secondary", isSelectedDate(day) && "bg-white")}
                      style={{
                        borderColor: getBackgroundColor(appt.category)
                      }}
                    >
                      {appt.title}
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 bg-secondary p-3 text-sm space-y-1 border-l-4" style={{
                        borderLeftColor: getBackgroundColor(appt.category), 

                      }}>
                      <div className="font-semibold">{appt.title}</div>
                      <div className="flex flex-row gap-2 items-center">
                        <Clock size={16} className="flex-shrink-0" />
                        <p className="text-sm text-secondaryText">
                          {formatTime(appt.start)} bis {formatTime(appt.end)}
                        </p>
                      </div>
                      {appt.location &&                       
                      <div className="flex flex-row gap-2 items-center">
                          <MapPin size={16} className="flex-shrink-0" />
                          <p className="text-sm text-secondaryText">{appt.location}</p>
                        </div>}
                      {appt.notes && 
                      <div className="flex flex-row gap-2 items-center">
                          <MessageSquareText size={16} className="flex-shrink-0" />
                          <p className="text-sm text-secondaryText">{appt.notes}</p>
                        </div>}

                      {appt.category && 
                      <div className="flex flex-row gap-2 items-center">
                          <p className="text-sm text-secondaryText">{categories.find((c) => c.id === appt.category)?.label}</p>
                        </div>}
                      {appt.patient && 
                      <div className="flex flex-row gap-2 items-center">
                          <p className="text-sm text-secondaryText">{getPatient(appt.patient)}</p>
                        </div>}
                  </HoverCardContent>
                </HoverCard>
              ))}
              {appts.length > 2 && (
                <div className="text-[10px] text-gray-500">+ weitere</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
      <button
        onClick={() => {
            const nextMonth = new Date(selectedDate);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            setSelectedDate?.(nextMonth);
        }}
        className="mt-4 mx-auto block rounded-md bg-gray-100 text-sm text-gray-800 px-4 py-2 hover:bg-gray-200 transition"
        >
            Nächsten Monat laden
        </button>
    </div>

  );
}
