export interface AppointmentHistory {
  id: string;
  created_at: string;
  created_by: string;
  appointment: string;
  type: 'edit' | 'create' | 'delete' | string;
  content: string;
}
