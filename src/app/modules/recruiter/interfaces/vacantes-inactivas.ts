export interface VacantesInactivas {
    id_vacant        :   string,
    id_recruiter     :   string,
    name             :   string,
    location         :   string,
    max_salary       :   string,
    min_salary       :   string,
    modality         :   string,
    job_type         :   string[],
    views            :   string,
    date_published   :   Date,
    type_vacant      :   string,
    num_applications :   number,
    new_applications :   number
}
