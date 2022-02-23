import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';
import { SessionService } from 'src/app/modules/login/services/session.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  
  email: string; //variable para guardar el email


  constructor(
    private servicio: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.router.navigate(['/']);
    }else{
      this.servicio
      .getInfo(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        /*  console.log(data); */
        //recoleccion de email en email
        /*         console.log(data.data.userData.email);
        this.email=data.data.userData.email; */
      });
    }
  }
  }
