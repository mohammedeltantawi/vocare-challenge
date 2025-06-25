export interface Patient {
  id: string;
  created_at: string; // ISO timestamp
  firstname: string;
  lastname: string;
  birth_date: string; // ISO timestamp
  care_level: number; // e.g., 1-5
  pronoun: 'Herr' | 'Frau' | string;
  email: string;
  active: boolean;
  active_since: string; // ISO timestamp
}
