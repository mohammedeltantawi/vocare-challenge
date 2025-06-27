export interface AppointmentAssignee {
  id: string;
  created_at: string;
  appointment: string;
  user: string;
  user_type: 'relatives' | string;
}
