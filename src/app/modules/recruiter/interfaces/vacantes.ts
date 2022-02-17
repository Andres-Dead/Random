export interface Vacante {
  id_vacant: number;
  id_recruiter: string;
  name: string;
  location: string;
  min_salary: string;
  max_salary: string;
  modality: string[];
  job_type: string[];
  views: string;
  date_published: Date;
  type_vacant: string;
  date_expired: Date;
  num_applications: number;
  new_applications: number;
}
