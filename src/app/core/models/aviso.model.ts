export interface Aviso {
  id: number;
  texto: string;
  importancia: number; 
  user_id: number | null; 
  activo: boolean;
  created_at?: string;
  usuario?: { full_name: string; email: string };
}
