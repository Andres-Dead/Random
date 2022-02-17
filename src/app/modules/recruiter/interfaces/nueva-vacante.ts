export interface NuevaVacante {
    id_vacant:      string;
    id_recruiter:   string;
    id_company:     string;
    name:           string;
    category:       string;
    location:       string;
    education:      string;
    experience:     string;
    min_age:        string;
    max_age:        string;
    travel:         string;
    handicap:       string;
    move:           string;
    min_salary:     string;
    max_salary:     string;
    comissions:     string;
    hide_salary:    string;
    job_type:       string[];
    modality:       string;
    description:    string;
    type_vacant:    string;
    date_published: Date;
    date_expired:   Date;
    views:          string;
    status:         string;
    application:    string[];
}
