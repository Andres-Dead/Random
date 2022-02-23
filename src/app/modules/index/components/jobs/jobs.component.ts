import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from '../../../login/services/register.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  //var para el accordeon (filtro seleccionado)
  activeButton: string;

  //paginacion
  public p: number = 1;
  public paginas: number;
  public numPages = 2;

  public arrEmpleos: any[] = [];
  public allEmpleos: any[] = [];

  public elegido: string = 'Mas recientes';

  public txtBuscar: string = null;
  public txtAreaDeseada: string = null;

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
    (this.fecha.getUTCDate() - 7);
  public fechaUlQui =
    this.fecha.getUTCFullYear() +
    '-' +
    (this.fecha.getUTCMonth() + 1) +
    (this.fecha.getUTCDate() - 15);

  constructor(
    private servicio: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.iniciarForm2();
    this.route.queryParams.subscribe((params) => {
      this.txtBuscar = params['ubicacion'];
      this.txtAreaDeseada = params['area'];
    });
    this.iniciarForm(); //inicializo el formulario
    this.obtenerVacantes(); //obtengo las vacantes
    console.log(this.arrEmpleos);
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      min: [''],
      max: [''],
    });
  }

  iniciarForm2(): void {
    this.formGroup2 = this.fb.group({
      area: [''],
      ubicacion: [''],
    });
  }

  //obtener las vacantes
  public obtenerVacantes() {
    Swal.fire({
      title: 'Obteniendo empleos',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio.getVacancies().subscribe((data: Data) => {
          //lleno el arreglo arrEmpleos con los datos que me llegan
          for (let item in data['data']) {
            this.arrEmpleos.push(data['data'][item]);
            this.allEmpleos.push(data['data'][item]);
          }
          this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
          Swal.close();
        });
      },
    });
  }

  //clasiificar los empleos

  public ordenar() {
    this.arrEmpleos.sort((a, b) => {
      if (a.date_published < b.date_published) {
        return 1;
      }
      if (a.date_published > b.date_published) {
        return -1;
      }
      return 0;
    });
    return this.arrEmpleos, (this.elegido = 'Mas recientes');
  }

  public ordenaraz() {
    this.arrEmpleos.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return this.arrEmpleos, (this.elegido = 'Ordenar A-Z');
  }

  public ordenarza() {
    this.arrEmpleos.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    });
    return this.arrEmpleos, (this.elegido = 'Ordenar Z-A');
  }

  public ordSalarioMin() {
    this.arrEmpleos.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return 1;
      }
      if (a.min_salary > b.min_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrEmpleos, (this.elegido = 'Salario Minimo');
  }

  public ordSalarioMax() {
    this.arrEmpleos.sort((a, b) => {
      if (a.min_salary < b.min_salary) {
        return -1;
      }
      if (a.min_salary > b.min_salary) {
        return 1;
      }
      return 0;
    });
    return this.arrEmpleos, (this.elegido = 'Salario Máximo');
  }

  //Limpiar y Buscar

  public buscar() {
    if (
      this.formGroup2.get('ubicacion').value != '' ||
      this.formGroup2.get('area').value != ''
    ) {
      this.arrEmpleos = this.allEmpleos.filter(
        (vac) =>
          vac.location
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(this.formGroup2.get('ubicacion').value.toLowerCase()) &&
          vac.name_category
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(this.formGroup2.get('area').value.toLowerCase())
      );
      this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
    } else {
      Swal.fire({
        title: 'Opps!',
        icon: 'warning',
        text: 'Al menos un campo debe estar lleno para poder buscar',
      });
    }
    return this.arrEmpleos;
  }

  public limpiar() {
    this.arrEmpleos = [];
    this.arrEmpleos = this.allEmpleos;
    this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
    /* this.formGroup.reset(); */
    return this.arrEmpleos;
  }

  //filtros de accordeon
  public fechaPublicacion(param: any) {
    this.arrEmpleos = this.allEmpleos.filter((vac) =>
      vac.date_published.includes(param)
    );
    this.paginas = Math.ceil(this.arrEmpleos.length / this.paginas);
    return this.arrEmpleos;
  }

  public tipodeTrabajo(param: string) {
    this.arrEmpleos = this.allEmpleos.filter((vac) =>
      vac.job_type.includes(param)
    );
    this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
    return this.arrEmpleos;
  }

  public modoEmpleo(param: string) {
    this.arrEmpleos = this.allEmpleos.filter((vac) =>
      vac.modality.includes(param)
    );
    this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
    return this.arrEmpleos;
  }

  public nivelEducativo(param: string) {
    this.arrEmpleos = this.allEmpleos.filter((vac) =>
      vac.education.includes(param)
    );
    this.paginas = Math.ceil(this.arrEmpleos.length / this.numPages);
    return this.arrEmpleos;
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
      this.arrEmpleos = this.allEmpleos.filter(
        (vac) =>
          (this.formGroup.get('min').value >= vac.min_salary &&
            this.formGroup.get('max').value <= vac.max_salary) ||
          (this.formGroup.get('min').value <= vac.max_salary &&
            this.formGroup.get('max').value >= vac.min_salary)
      );
    }
    return this.arrEmpleos;
  }

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
