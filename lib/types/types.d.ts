export interface Appointment {
  created_at: Date;
  title: string;
  description: string;
  host: string;
  guest: string;
  appointment_status: string;
  appointment_start_date: string;
  appointment_end_date: string;
  status: number;
  app_id: string;
  id: string;
}
