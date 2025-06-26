import { createClient } from '@/lib/supabase/server';
import { Appointment } from "@/models/appointment.model";
import AppointmentsClient from './appointments.client';
import { Category } from '@/models/category.model';
import { Patient } from '@/models/patient.model';

export default async function Appointments() {
  const supabase = await createClient();

  const { data: apptData, error: apptError } = await supabase.from("appointments").select("*");
  const { data: catData, error: catError } = await supabase.from("categories").select("*");
  const { data: patientData, error: patientError } = await supabase.from("patients").select("*");

  if (apptError || catError || patientError) {
    console.error(apptError || catError || patientError);
  }

  const appointments: Appointment[] = (apptData ?? []).map((a: Appointment) => ({
    ...a,
    start: a.start?.toString?.(),
    end: a.end?.toString?.(),
  }));

  const categories: Category[] = catData ?? [];

  const patients: Patient[] = patientData ?? []

  return <AppointmentsClient appointments={appointments} categories={categories} patients={patients}/>;
}
