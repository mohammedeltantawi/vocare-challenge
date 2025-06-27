// models/patient.ts

export interface Relatives {
  id: string;
  created_at: string; // ISO timestamp
  pronoun: 'Herr' | 'Frau' | string; // Use literal types if pronouns are restricted
  firstname: string;
  lastname: string;
  notes: string | null;
}
