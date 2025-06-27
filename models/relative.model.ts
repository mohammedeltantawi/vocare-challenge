export interface Relatives {
  id: string;
  created_at: string;
  pronoun: 'Herr' | 'Frau' | string;
  firstname: string;
  lastname: string;
  notes: string | null;
}
