export class Reset {
    token:string;
    email:string;
    password:string;

    constructor(token:string, email:string, password:string){
        this.token = token;
        this.email = email;
        this.password = password;
    }
}