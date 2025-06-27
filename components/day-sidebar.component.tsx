import { Appointment } from "@/models/appointment.model";
import AppointmentCard from "./appointment-card.component";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import AppointmentEditForm from "@/components/appointment-edit.component";

interface Props {
  date: Date;
  appointments: Appointment[];
}

export default function DaySidebar({ date, appointments }: Props) {
  const isToday = date.toDateString() === new Date().toDateString();
  return (
    <div className="flex flex-col gap-2 justify-center">
        <div className="bg-white border p-2 flex items-center justify-center">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">
            {format(date, "EEEE, dd. MMMM", { locale: de })}
            {isToday && <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-full">Heute</span>}
            </h2>
        </div>
        </div>
        <div className="flex flex-col gap-2 items-center p-4">
            {appointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">Keine Termine für diesen Tag</p>
            ) : (
                appointments.map((appt) => (
                  <Dialog key={appt.id} >
                    <DialogTrigger asChild>
                      <div className="w-full">
                        <AppointmentCard appointment={appt} />
                      </div>
                    </DialogTrigger>
                    <DialogHeader>
                      <DialogTitle>{}</DialogTitle>
                    </DialogHeader>
                    <DialogContent>
                      <AppointmentEditForm 
                        appointment={appt}
                        onSuccess={() => window.location.reload()}
                      />
                    </DialogContent>
                  </Dialog>

            ))
            )}
        </div>
    </div>
  );
}
