import { useCategories } from "@/context/category.context";
import { Appointment } from "@/models/appointment.model";
import { CircleAlert, Clock, MapPin, MessageSquareText } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import AppointmentEditForm from "./appointment-edit.component";

interface Props {
  appointments: Appointment[];
  selectedDate: Date;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "long" });

export default function ListView({ appointments, selectedDate }: Props) {
  const categories = useCategories();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  const [hasLoadedAll, setHasLoadedAll] = useState(false);
  const [visibleAppointments, setVisibleAppointments] = useState<Appointment[]>([]);

  useMemo(() => {
    const visible = appointments.filter((a) => new Date(a.start) >= selectedDate);
    setVisibleAppointments(visible);
    setHasLoadedAll(false);
  }, [appointments, selectedDate]);

  const grouped = useMemo(() => groupAppointmentsByDay(visibleAppointments), [visibleAppointments]);

  const sortedGrouped = useMemo(
    () =>
      Object.entries(grouped).sort(
        ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
      ),
    [grouped]
  );

  function loadEarlierAppointments() {
    const currentMin = new Date(
      Math.min(...visibleAppointments.map((a) => new Date(a.start).getTime()))
    );

    const earlier = appointments.filter(
      (a) => new Date(a.start) < currentMin && !visibleAppointments.includes(a)
    );

    const merged = [...visibleAppointments, ...earlier].sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    setVisibleAppointments(merged);
    setHasLoadedAll(true);
  }

  const didPass = (apptEnd: string) => new Date(apptEnd) < new Date();

  const getBackgroundColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return `${category?.color}20`;
  };

  return (
    <div className="p-6 bg-secondary flex flex-col items-center min-h-screen">
      {!hasLoadedAll && (
        <button
          onClick={loadEarlierAppointments}
          className="mb-6 text-sm font-medium text-muted-foreground hover:underline"
        >
          Termine vor dem {formatShortDate(selectedDate)} laden
        </button>
      )}

      {sortedGrouped.map(([date, appts]) => {
        const dateObj = new Date(date);
        const isToday = dateObj.toDateString() === today.toDateString();

        return (
          <div key={date} className="mb-6 w-[500px]">
            <div className="flex items-center gap-2 mb-2 justify-between">
              <h2 className="text-lg font-semibold">{formatDate(dateObj)}</h2>
              {isToday && (
                <span className="flex flex-row gap-1 items-center justify-center text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  <CircleAlert size={10} />
                  Heute
                </span>
              )}
            </div>
            <div className="space-y-3">
              {appts.map((appt) => (
                <Dialog key={appt.id} >
                  <DialogTrigger asChild>
                    <div className="rounded-md p-4 shadow-sm border bg-white">
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-2">
                          <div
                            className="h-5 w-5 rounded"
                            style={{ backgroundColor: getBackgroundColor(appt.category) }}
                          ></div>
                          <div className={`font-semibold text-lg ${didPass(appt.end) && "line-through"}`}>
                            {appt.title}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border border-gray-300 bg-white text-white checked:bg-black checked:border-black appearance-none relative 
                            before:absolute before:inset-0 before:flex before:items-center before:justify-center
                            checked:before:content-['✓'] checked:before:text-white checked:before:text-xs cursor-pointer"
                          readOnly
                          checked={didPass(appt.end)}
                        />
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Clock size={16} />
                        <p className="text-sm text-secondaryText">
                          {formatTime(appt.start)} bis {formatTime(appt.end)}
                        </p>
                      </div>
                      {appt.location && (
                        <div className="flex flex-row gap-2 items-center">
                          <MapPin size={16} />
                          <p className="text-sm text-secondaryText">{appt.location}</p>
                        </div>
                      )}
                      {appt.notes && (
                        <div className="flex flex-row gap-2 items-center">
                          <MessageSquareText size={16} />
                          <p className="text-sm text-secondaryText">{appt.notes}</p>
                        </div>
                      )}
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
                
              ))}
            </div>
          </div>
        );
      })}

      {hasLoadedAll && sortedGrouped.length === 0 && (
        <div className="text-center text-gray-500 mt-10">Keine weiteren Termine gefunden</div>
      )}
    </div>
  );
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function groupAppointmentsByDay(appointments: Appointment[]) {
  return appointments.reduce<Record<string, Appointment[]>>((acc, appt) => {
    const day = new Date(appt.start).toDateString();
    acc[day] = acc[day] || [];
    acc[day].push(appt);
    return acc;
  }, {});
}
