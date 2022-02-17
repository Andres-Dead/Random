export interface Talent {
        ID:           string;
        first_name:   string;
        last_name:    string;
        birthdate:    Date;
        country:      string;
        state:        string;
        city:         string;
        updated_at:   Date;
        profile_pic:  string;
        educationLvl: string;
        age:          number;
        jobPref:      JobPref;
        workExp:      WorkExp[];
        education:    Education[];
    }
    
    export interface Education {
        institution: string;
    }
    
    export interface JobPref {
        role:            string;
        industry:        string;
        expected_salary: string;
    }
    
    export interface WorkExp {
        role:         string;
        company_name: string;
        start_date:   string;
        end_date:     string;
        active:       string;
    }
    
