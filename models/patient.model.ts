export interface Patient {
  id: string;
  created_at: string;
  firstname: string;
  lastname: string;
  birth_date: string;
  care_level: number;
  pronoun: 'Herr' | 'Frau' | string;
  email: string;
  active: boolean;
  active_since: string;
}
