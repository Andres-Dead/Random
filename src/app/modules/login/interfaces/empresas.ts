export class Empresas {
    display_name: string;
    business_name: string;
    rfc: string;
    email: string;
    password: string;
    type: string;
    

    constructor(display_name: string, business_name: string, rfc: string, email: string, password: string, type: string) {
        this.display_name = display_name;
        this.business_name = business_name;
        this.rfc = rfc;
        this.email = email;
        this.password = password;
        this.type = type;
       
    }
}