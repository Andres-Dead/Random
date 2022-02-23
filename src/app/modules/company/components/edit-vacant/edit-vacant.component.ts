import { SessionService } from 'src/app/modules/login/services/session.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { Categories } from 'src/app/modules/recruiter/interfaces/categories';
import { Educaciones } from 'src/app/modules/recruiter/interfaces/educaciones';
import { Modalidades } from 'src/app/modules/recruiter/interfaces/modalidades';
import { TiposDeTrabajo } from 'src/app/modules/recruiter/interfaces/tipos-de-trabajo';
import { Cities } from '../../interfaces/cities';
import { Countries } from '../../interfaces/countries';
import { Recruiter } from '../../interfaces/recruiter';
import { States } from '../../interfaces/states';
import { VacantService } from '../../services/vacant.service';
import { WorkTableService } from '../../services/work-table.service';

@Component({
  selector: 'app-edit-vacant',
  templateUrl: './edit-vacant.component.html',
  styleUrls: ['./edit-vacant.component.css']
})
export class EditVacantComponent implements OnInit {

  information: any;

  infoVacant : any;
  
  categoria: string;
  educacion: string;
  modalidad: string;
  tipo: string;
  type: string;

  reclutador: any;
  company: any;

  viaje: string = '0';

  public id_vacant: any;

  location = this.fb.group({
    pais: ['', Validators.required],
    estado: ['', Validators.required],
    ciudad: ['', Validators.required],
  });


  categorias: Categories[] = [];
  educaciones: Educaciones[] = [];
  modalidades: Modalidades[] = [];
  tipos: TiposDeTrabajo[] = [];
  paises: Countries[] = [];
  estados: States[] = [];
  ciudades: Cities[] = [];
  public recruiters: Recruiter[] = [];

  vacanteForm = this.fb.group({
    recruiter: [null, Validators.required],
    name: ['', Validators.required],
    category: ['', Validators.required],
    location: ['', Validators.required],
    education: ['', Validators.required],
    experience: ['', Validators.required],
    min_age: ['', Validators.required],
    max_age: ['', Validators.required],
    travel: [false, Validators.required],
    handicap: [false, Validators.required],
    move: [false, Validators.required],
    min_salary: [0, Validators.required],
    max_salary: [0, Validators.required],
    comissions: [false, Validators.required],
    hide_salary: [false, Validators.required],
    job_type: this.fb.array([]),
    modality: this.fb.array([]),
    description: ['', Validators.required],
  });


  jobTypeForm: any;
  modalityForm: any;

  constructor(
    private route : ActivatedRoute,
    private user: SessionService,
    private fb    : FormBuilder,
    private service: VacantService,
    private workTable: WorkTableService,
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.getInfoRecruiters();
    this.getCategories();
    this.getEducations();
    this.getModalities();
    this.getJobType();
    this.getCountries();
    this.id_vacant = this.route.snapshot.params['id'];
    this.getVacant(this.id_vacant);
    this.jobTypeForm = this.fb.group({
      ID: [0, Validators.required],
      ID1: [0, Validators.required],
      ID2: [0, Validators.required],
    });
    this.modalityForm = this.fb.group({
      ID: [0, Validators.required],
    });
  }

  getVacant(id){
    return this.service.getVacant(localStorage.getItem('token'),id)
    .subscribe((info:Data)=>{
      this.infoVacant = info['data'].info
      this.vacanteForm.patchValue({
        recruiter   : this.infoVacant.recruiter,
        name        : this.infoVacant.name,
        category    : this.infoVacant.category,
        location    : this.infoVacant.location,
        education   : this.infoVacant.education,
        experience  : this.infoVacant.experience,
        min_age     : this.infoVacant.min_age,
        max_age     : this.infoVacant.max_age,
        travel      : this.infoVacant.travel,
        handicap    : this.infoVacant.handicap,
        move        : this.infoVacant.move,
        min_salary  : this.infoVacant.min_salary,
        max_salary  : this.infoVacant.max_salary,
        comissions  : this.infoVacant.comissions,
        hide_salary : this.infoVacant.hide_salary,
        job_type    : this.infoVacant.job_type,
        modality    : this.infoVacant.modality,
        description : this.infoVacant.description
      })
      console.log(this.infoVacant)
    })
  }
  get job_type() {
    return this.vacanteForm.controls['job_type'] as FormArray;
  }

  get modality() {
    return this.vacanteForm.controls['modality'] as FormArray;
  }

  onNewVacant(){

  }
  getInfoRecruiters() {
    return this.workTable
      .getRecruiters(localStorage.getItem('token'))
      .subscribe((recruiters: Data) => {
        for (let item of recruiters['data']) {
          this.recruiters.push(item);
        }
      });
  }

  getEducations() {
    return this.service.getEducations().subscribe((educaciones: Data) => {
      for (let educacion of educaciones['education']) {
        this.educaciones.push(educacion);
        console.log(educacion);
      }
    });
  }

  getCategories() {
    return this.service.getCategories().subscribe((categorias: Data) => {
      for (let categoria of categorias['categories']) {
        this.categorias.push(categoria);
      }
    });
  }

  getModalities() {
    return this.service.getModalities().subscribe((modalidades: Data) => {
      for (let modalidad of modalidades['modalities']) {
        this.modalidades.push(modalidad);
      }
    });
  }

  getInfo() {
    return this.user
      .getGroup(localStorage.getItem('token'))
      .subscribe((response) => {
        this.information = response['group'];
        console.log(this.information);
      });
  }


  getJobType() {
    return this.service.getJobType().subscribe((tipos: Data) => {
      for (let tipo of tipos['job_type']) {
        this.tipos.push(tipo);
      }
    });
  }



  getCountries() {
    return this.service.getCountries().subscribe((paises: Data) => {
      for (let pais of paises['countries']) {
        this.paises.push(pais);
      }
      console.log(this.paises);
    });
  }


}
