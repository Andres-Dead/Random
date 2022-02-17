import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  //arreglo de paquetes
  public paquetes: any[] = [];

  constructor(private service: CompanyServiceService, private route:Router) {}

  ngOnInit(): void {
    this.getPaquetes();
    console.log(this.paquetes);
  }

  public getPaquetes() {
    return this.service.getPaquetes().subscribe((data: Data) => {
      if (data != null) {
        //si no es nulo todo bien y llenamos el arreglo de paquetes con los paquetes que nos regresa el servicio
        for (let item of data['data']) {
          this.paquetes.push(item);
        }
      }
    });
  }

}
