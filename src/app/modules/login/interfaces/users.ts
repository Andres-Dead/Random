export class Users {
    email:string;
    password:string;
    first_name:string;
    last_name:string;
    type:string;

    constructor(email:string, password:string, first_name:string, last_name:string, type:string){
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.type = type;
    }
}