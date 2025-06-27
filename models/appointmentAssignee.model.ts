export interface AppointmentAssignee {
  id: string;
  created_at: string; // ISO timestamp
  appointment: string; // references Appointment ID
  user: string; // references a user (could be a relative, staff, etc.)
  user_type: 'relatives' | string; // known types + fallback
}
