import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { CompanyServiceService } from './../../services/company-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulates',
  templateUrl: './postulates.component.html',
  styleUrls: ['./postulates.component.css'],
})
export class PostulatesComponent implements OnInit {
  //toggle filters accordeon
  public activeButton: string;

  public formGroup: FormGroup;
  public id_talento: number;
  public arrTalentos: any[] = [];
  public allTalentos: any[] = [];
  public arrInfo: any[] = [];
  public elegido: string = 'Mas recientes';

  //paginacion
  public p: number = 1;
  public paginas: number;
  public numPages = 2;

  //Filtros por fecha
  public fecha: Date = new Date();
  public fechaHoy =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    this.fecha.getUTCDate();
  public fechaAyer =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 1);
  public fechaSemPas =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 7);
  public fechaUlQui =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    '-' +
    (this.fecha.getUTCDate() - 15);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.iniciarForm();
    this.id_talento = this.route.snapshot.params['id']; //obtener el id de la vacante
    this.getTalentVacant();
    console.log(this.arrInfo, this.arrTalentos, this.allTalentos);
  }

  public getTalentVacant() {
    Swal.fire({
      title: 'Obteniendo empleos',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.service
          .getTalentListVacant(localStorage.getItem('token'), this.id_talento)
          .subscribe((data: Data) => {
            for (let item in data.data.talents) {
              this.arrTalentos.push(data.data.talents[item]);
              this.allTalentos.push(data.data.talents[item]);
            }
            Object.entries(data.data.vacant).forEach(([key, value]) => {
              this.arrInfo[key] = value;
            });
            this.paginas = Math.ceil(this.arrTalentos.length / this.numPages);
            Swal.close();
          });
      },
    });
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      min: [''],
      max: [''],
    });
  }

  //Clasificar por
  public ordenar() {
    this.arrTalentos.sort((a, b) => {
      if (a.application.applied_date < b.application.applied_date) {
        return 1;
      }
      if (a.application.applied_date > b.application.applied_date) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Mas recientes');
  }

  public ordenaraz() {
    this.arrTalentos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Ordenar A-Z');
  }

  public ordenarza() {
    this.arrTalentos.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Ordenar Z-A');
  }

  public ordSalarioMin() {
    this.arrTalentos.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return 1;
      }
      if (a.min_salary > b.min_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Salario Minimo');
  }

  public ordSalarioMax() {
    this.arrTalentos.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return -1;
      }
      if (a.min_salary > b.min_salary) {
        return 1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Salario Máximo');
  }

  public limpiar() {
    this.arrTalentos = [];
    this.arrTalentos = this.allTalentos;
    this.paginas = Math.ceil(this.arrTalentos.length / this.numPages);
    /* this.formGroup.reset(); */
    return this.arrTalentos;
  }

  //filtros de accordeon
  //filtros de accordeon
  public fechaPublicacion(param: any) {
    this.arrTalentos = this.allTalentos.filter((vac) =>
      vac.application.applied_date.includes(param)
    );
    this.paginas = Math.ceil(this.arrTalentos.length / this.paginas);
    return this.arrTalentos;
  }

  public nivelEducativo(param: string) {
    this.arrTalentos = this.allTalentos.filter((vac) =>
      vac.educationLvl.includes(param)
    );
    this.paginas = Math.ceil(this.arrTalentos.length / this.numPages);
    return this.arrTalentos;
  }

  public rango() {
    if (
      this.formGroup.get('min').value == '' ||
      this.formGroup.get('max').value == ''
    ) {
      console.log('no selecciono nada');
    } else {
      console.log(
        this.formGroup.get('min').value,
        this.formGroup.get('max').value
      );
      this.arrTalentos = this.allTalentos.filter(
        (vac) =>
          this.formGroup.get('min').value >= vac.jobPref.expected_salary &&
          this.formGroup.get('max').value <= vac.jobPref.expected_salary
      );
    }
    return this.arrTalentos;
  }

  //toggleFilters
  public setActive(buttonName) {
    console.log(buttonName, this.activeButton);
    if (buttonName == this.activeButton) {
      this.activeButton = '';
      this.limpiar();
    } else {
      this.activeButton = buttonName;
    }
  }
  public isActive(buttonName) {
    return this.activeButton === buttonName;
  }
}
