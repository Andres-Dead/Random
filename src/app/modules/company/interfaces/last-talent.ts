export interface LastTalent {
    id_user:     string;
    id_vacant:   string;
    user:        User;
    vacant_info: VacantInfo;
}

export interface User {
    first_name: string;
    last_name:  string;
}

export interface VacantInfo {
    name:     string;
    location: string;
}
