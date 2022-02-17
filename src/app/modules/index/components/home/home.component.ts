import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { RegisterService } from '../../../login/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public formGroup: FormGroup; //formulario

  public arrCompanies: any[] = [];
  public arrNewVacants: any[] = [];
  public arrUrgentVacants: any[] = [];
  public arrCategories: any[] = [];

  //numero de empleos por página
  public Nempleos: number;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: RegisterService
  ) {}

  ngOnInit(): void {
    //Cuando se inicia el componente se obtienen los datos y se inizializa el formulario
    this.getHomeData();
    this.iniciarForm();
    /*     console.log(
      this.arrCompanies,
      this.arrNewVacants,
      this.arrUrgentVacants,
      this.arrCategories
    ); */
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      area: [''],
      ubicacion: [''],
    });
  }

  public buscar(): void {
    //metodo para buscar empresas
    //cuando se busca una empresa se redirige a la pagina de
    //la empresa y se le pasa el area y la ubicacion via queryParams
    this.route.navigate(['/empleos'], {
      queryParams: {
        area: this.formGroup.value.area,
        ubicacion: this.formGroup.value.ubicacion,
      },
    });
  }

  public getHomeData(): void {
    //metodo para obtener los datos de la pagina de inicio
    Swal.fire({
      title: 'Obteniendo información',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); //muestra el loading
        this.service.getUserHome().subscribe((data: Data) => {
          this.Nempleos = data['data'].quant; //numero de empleos
          for (let item of data['data'].new_vacants) {
            //llena el array de nuevos empleos
            this.arrNewVacants.push(item);
          }
          for (let item of data['data'].urgent_vacants) {
            //llena el array de empleos urgentes
            this.arrUrgentVacants.push(item);
          }
          for (let item of data['data'].categories) {
            //llena el array de categorias
            this.arrCategories.push(item);
          }
          for (let item of data['data'].companies) {
            //llena el array de empresas
            item.profile_pic =
              'https://capitalempleo.com/profile_pic/' + item.profile_pic; //cambia la url de la imagen
            this.arrCompanies.push(item);
          }
          Swal.close(); //cierra el loading cuando se obtienen los datos
        });
      },
    });
  }
}
