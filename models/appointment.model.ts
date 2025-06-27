export interface Appointment {
  id: string;
  created_at: string;
  updated_at: string | null;
  start: string;
  end: string;
  location: string;
  patient: string;
  attachements: string[] | null;
  category: string;
  notes: string;
  title: string;
}
