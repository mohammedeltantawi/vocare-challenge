export interface AppointmentHistory {
  id: string;
  created_at: string; // ISO timestamp
  created_by: string; // UUID of the user who made the change
  appointment: string; // UUID of the related appointment
  type: 'edit' | 'create' | 'delete' | string; // action type
  content: string; // description of the change
}
