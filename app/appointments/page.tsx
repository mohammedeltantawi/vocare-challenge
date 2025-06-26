import { createClient } from '@/lib/supabase/server';
import { Appointment } from "@/models/appointment.model";
import AppointmentsClient from './appointments.client';

export default async function Appointments() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("appointments").select("*");

  if (error) {
    console.error(error);
  }

  const appointments: Appointment[] = (data ?? []).map((a: Appointment) => ({
    ...a,
    start: a.start?.toString?.(),
    end: a.end?.toString?.(),
  }));

  return <AppointmentsClient appointments={appointments} />;
}