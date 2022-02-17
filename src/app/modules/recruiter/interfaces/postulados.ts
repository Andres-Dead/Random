export interface Postulados {
    id_user      :   string,
    id_vacant    :   string,
    user         :   {
        first_name  : string,
        last_name   : string 
    },
    vacant_info  :   {
        name        : string,
        location    : string
    }
}
