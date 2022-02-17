import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-filter-talent',
  templateUrl: './filter-talent.component.html',
  styleUrls: ['./filter-talent.component.css']
})
export class FilterTalentComponent implements OnInit {
  public formGroup: FormGroup;
  public formGroup2: FormGroup;

  //paginacion
  public p: number = 1;
  public paginas: number;
  public numPages = 2;

  public txtTipo: string = null;
  public txtEstado: string = null;

  public arrTalentos: any[] = [];
  public allTalentos: any[] = [];

  public elegido: string = 'Mas recientes';

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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private servicio: CompanyServiceService
  ) {}

  ngOnInit(): void {
    //inizializamos el primer formulario
    this.iniciarForm();
    this.route.queryParams.subscribe((params) => {
      //de la url obtenemos los parametros y los guardamos
      this.txtTipo = params['tipo'];
      this.txtEstado = params['estado'];
    });
    //iniciamos el segundo formulario
    this.iniciarForm2();
    //obtenemos los talentos
    this.obtenerTalentos();
  }

  //obtener los talentos
  public obtenerTalentos() {
    Swal.fire({
      title: 'Obteniendo talentos',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.servicio
          .getTalentList(localStorage.getItem('token'))
          .subscribe((data: Data) => {
            //llenar el arreglo de talentos
            for (let item in data['data']) {
              this.arrTalentos.push(data['data'][item]);
              this.allTalentos.push(data['data'][item]);
            }
            Swal.close();
            //calculamos las paginas para la paginacion
            this.paginas = Math.ceil(this.arrTalentos.length / this.numPages);
          });
      },
    });
  }

  //clasiificar los empleos

  public ordenar() {
    //ordenamos por mas recientes con ayuda del metodo sort
    this.arrTalentos.sort((a, b) => {
      if (a.updated_at < b.updated_at) {
        return 1;
      }
      if (a.updated_at > b.updated_at) {
        return -1;
      }
      return 0;
    });
    //regresamos el arreglo y el texto seleccionado
    return this.arrTalentos, (this.elegido = 'Mas recientes');
  }

  public ordenaraz() {
    this.arrTalentos.sort((a, b) => {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Ordenar A-Z');
  }

  public ordenarza() {
    this.arrTalentos.sort((a, b) => {
      if (a.first_name < b.first_name) {
        return 1;
      }
      if (a.first_name > b.first_name) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Ordenar Z-A');
  }

  public ordSalarioMin() {
    this.arrTalentos.sort((a, b) => {
      if (a.jobPref.expected_salary < b.jobPref.expected_salary) {
        return 1;
      }
      if (a.jobPref.expected_salary > b.jobPref.expected_salary) {
        return -1;
      }
      return 0;
    });
    return this.arrTalentos, (this.elegido = 'Salario Minimo');
  }

  public ordSalarioMax() {
    this.arrTalentos.sort((a, b) => {
      if (a.jobPref.expected_salary < b.jobPref.expected_salary) {
        return -1;
      }
      if (a.jobPref.expected_salary > b.jobPref.expected_salary) {
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
    this.formGroup.reset();
    return this.arrTalentos;
  }

  //filtros de accordeon
  public fechaPublicacion(param: any) {
    this.arrTalentos = this.allTalentos.filter((vac) =>
      vac.updated_at.includes(param)
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
      this.formGroup2.get('min').value == '' ||
      this.formGroup2.get('max').value == ''
    ) {
      this.arrTalentos = this.allTalentos;
    } else {
      this.arrTalentos = this.allTalentos.filter((vac) => {
        let var_salario = vac.jobPref.expected_salary;
        if (
          var_salario >= this.formGroup2.get('min').value &&
          var_salario <= this.formGroup2.get('max').value
        ) {
          return vac;
        }
      });
    }
    return this.arrTalentos;
  }

  public buscar() {
    if (
      this.formGroup.get('tipo').value == null ||
      this.formGroup.get('estado').value == null
    ) { return this.arrTalentos;
    } else {
      this.arrTalentos = this.allTalentos.filter(
        (vac) =>
          vac.state
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(this.formGroup.get('estado').value.toLowerCase()) &&
          vac.jobPref.role
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .includes(this.formGroup.get('tipo').value.toLowerCase())
      );
      this.paginas = Math.ceil(this.arrTalentos.length / this.numPages);
      return this.arrTalentos;
    }
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      tipo: [''],
      estado: [''],
    });
  }

  iniciarForm2(): void {
    this.formGroup2 = this.fb.group({
      min: [''],
      max: [''],
    });
  }

}
