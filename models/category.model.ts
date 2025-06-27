export interface Category {
  id: string;
  created_at: string;
  updated_at: string | null;
  label: string;
  description: string | null;
  color: string;
  icon: string | null;
}
