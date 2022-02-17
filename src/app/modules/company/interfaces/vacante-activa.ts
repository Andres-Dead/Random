export interface VacanteActiva {
   id_vacant:        string;
   id_recruiter:     string;
   name:             string;
   location:         string;
   min_salary:       string;
   max_salary:       string;
   modality:         string[];
   job_type:         string[];
   views:            string;
   date_published:   Date;
   type_vacant:      string;
   date_expired:     Date;
   recruiter:        Recruiter;
   num_applications: number;
   new_applications: number;
}

export interface Recruiter {
   name: string;
}
