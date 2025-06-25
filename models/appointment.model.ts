export interface Appointment {
  id: string;
  created_at: string; // ISO timestamp
  updated_at: string | null;
  start: string; // ISO timestamp
  end: string; // ISO timestamp
  location: string;
  patient: string; // patient ID (UUID)
  attachements: string[] | null; // assuming this could be an array of file URLs or IDs
  category: string; // category ID (UUID)
  notes: string;
  title: string;
}
