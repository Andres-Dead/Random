import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterService } from '../../../login/services/register.service';

@Component({
  selector: 'app-list-companies',
  templateUrl: './list-companies.component.html',
  styleUrls: ['./list-companies.component.css'],
})
export class ListCompaniesComponent implements OnInit {
  public formGroup: FormGroup;
  //paginacion
  public p: number = 1;
  public numPages = 2;

  public arrEmpresas: any[] = [];
  public allEmpresas: any[] = [];

  public elegido: string = 'A - Z';

  constructor(
    private servicio: RegisterService, 
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.getEmpresas();
    console.log(this.arrEmpresas, this.allEmpresas);
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      ubicacion: [''],
    });
  }

  public getEmpresas() {
    Swal.fire({
      title: 'Obteniendo información',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio.getCompanyNames().subscribe((data: Data) => {
          data['data'].forEach((element) => {
            Swal.close();
            element.profile_pic =
              'https://capitalempleo.com/profile_pic/' + element.profile_pic;
            this.arrEmpresas.push(element);
            this.allEmpresas.push(element);
          });
        });
      },
    });
  }

  public buscarEmpresas() {
    this.arrEmpresas = this.allEmpresas.filter((empresa) =>
      empresa.display_name
        .toLowerCase()
        .includes(this.formGroup.get('ubicacion').value.toLowerCase())
    );
    return this.arrEmpresas;
  }

  public limpiar() {
    this.arrEmpresas = [];
    this.arrEmpresas = this.allEmpresas;
    this.formGroup.reset();
    return this.arrEmpresas;
  }

  public ordenaraz() {
    this.arrEmpresas.sort((a, b) => {
      if (a.display_name < b.display_name) {
        return -1;
      }
      if (a.display_name > b.display_name) {
        return 1;
      }
      return 0;
    });
    return this.arrEmpresas, (this.elegido = 'Ordenar A-Z');
  }

  public ordenarza() {
    this.arrEmpresas.sort((a, b) => {
      if (a.display_name < b.display_name) {
        return 1;
      }
      if (a.display_name > b.display_name) {
        return -1;
      }
      return 0;
    });
    return this.arrEmpresas, (this.elegido = 'Ordenar Z-A');
  }

  public numVacants() {
    this.arrEmpresas.sort((a, b) => {
      if (a.vacants < b.vacants) {
        return 1;
      }
      if (a.vacants > b.vacants) {
        return -1;
      }
      return 0;
    });
    return this.arrEmpresas, (this.elegido = 'Número de vacantes');
  }
}
