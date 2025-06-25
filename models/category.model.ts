export interface Category {
  id: string;
  created_at: string; // ISO timestamp
  updated_at: string | null;
  label: string;
  description: string | null;
  color: string; // hex color code (e.g., "#00ff00")
  icon: string | null; // could be a URL, icon name, or null
}
