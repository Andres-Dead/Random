export interface Company {
    company_info: CompanyInfo;
    complete:     boolean;
}

export interface CompanyInfo {
    ID:              string;
    display_name:    string;
    business_name:   string;
    rfc:             string;
    state:           string;
    city:            string;
    country:         string;
    address:         string;
    cp:              string;
    web:             string;
    fb:              string;
    ig:              string;
    linkedin:        string;
    twitter:         string;
    contact_name:    string;
    contact_email:   string;
    phone:           string;
    description:     string;
    profile_pic:     string;
    num_workers:     string;
    category:        string;
    mission:         string;
    vision:          string;
    business_values: string;
    cert:            string;
    verified:        string;
    sat_doc:         string;
    countryID:       string;
}