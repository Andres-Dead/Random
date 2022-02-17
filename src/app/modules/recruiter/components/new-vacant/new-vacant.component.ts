import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Data } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Categories } from '../../interfaces/categories';
import { Educaciones } from '../../interfaces/educaciones';
import { Modalidades } from '../../interfaces/modalidades';
import { NuevaVacante } from '../../interfaces/nueva-vacante';
import { TiposDeTrabajo } from '../../interfaces/tipos-de-trabajo';
import { VacantService } from '../../services/vacant.service';
import { RecruiterServiceService } from '../../services/recruiter-service.service';
import { Countries } from '../../interfaces/countries';
import { States } from '../../interfaces/states';
import { Cities } from '../../interfaces/cities';
import { Recruiter } from '../../interfaces/reclutador';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-vacant',
  templateUrl: './new-vacant.component.html',
  styleUrls: ['./new-vacant.component.css'],
})
export class NewVacantComponent implements OnInit {

  @ViewChild("#modalPublicado") publicado: ElementRef;

  vacante: NuevaVacante;

  categoria: string;
  educacion: string;
  modalidad: string;
  tipo: string;
  type: string;

  reclutador:any;
  company:any;

  viaje: string = '0';

  categorias  : Categories      [] = [];
  educaciones : Educaciones     [] = [];
  modalidades : Modalidades     [] = [];
  tipos       : TiposDeTrabajo  [] = [];
  paises      : Countries       [] = [];
  estados     : States          [] = [];
  ciudades    : Cities          [] = [];

  location = this.fb.group({
    pais    : ['', Validators.required],
    estado  : ['', Validators.required],
    ciudad  : ['', Validators.required]
  })


  vacanteForm = this.fb.group({
    recruiter   : [null, Validators.required],
    name        : ['', Validators.required],
    category    : ['', Validators.required],
    location    : ['', Validators.required],
    education   : ['', Validators.required],
    experience  : ['', Validators.required],
    min_age     : ['', Validators.required],
    max_age     : ['', Validators.required],
    travel      : [false, Validators.required],
    handicap    : [false, Validators.required],
    move        : [false, Validators.required],
    min_salary  : [0, Validators.required],
    max_salary  : [0, Validators.required],
    comissions  : [false, Validators.required],
    hide_salary : [false, Validators.required],
    job_type    : this.fb.array([]),
    modality    : this.fb.array([]),
    description : ['', Validators.required],
  });

  jobTypeForm   : any;
  modalityForm  : any;
  public recruiters       : Recruiter[]     = [];


  constructor(
    private workTable : RecruiterServiceService,
    private service   : VacantService, 
    private session   : RecruiterServiceService,
    private fb        : FormBuilder
  ) { }

  ngOnInit(): void {
    this.location.get('pais')?.valueChanges
    .subscribe(estado =>{
      this.service.getStates(estado)
      .subscribe(estados =>{
        this.estados = estados['states']
      })
    });
    this.location.get('estado')?.valueChanges
    .subscribe(ciudad =>{
      this.service.getCities(ciudad)
      .subscribe(ciudad =>{
        this.ciudades = ciudad['cities']
      })
    })
    this.getCategories();
      this.getEducations();
      this.getModalities();
      this.getJobType();
      this.getInfo();
      this.getCountries();
      this.jobTypeForm = this.fb.group({
        ID : [0, Validators.required],
        ID1: [0, Validators.required],
        ID2: [0, Validators.required]
      });
      this.modalityForm = this.fb.group({
        ID :  [0,Validators.required]
      })
  }

  get job_type(){
    return this.vacanteForm.controls["job_type"] as FormArray;
  }

  get modality(){
    return this.vacanteForm.controls["modality"] as FormArray;
  }


onNewVacant() {
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Guardado con exito!', '', 'success')
    }
  });
  let location = (this.location.controls['ciudad'].value+", "+this.location.controls['estado'].value+". "+this.location.controls['pais'].value);
  this.vacanteForm.patchValue({
    location : location
  });
  this.job_type.push(this.jobTypeForm);
  this.modality.push(this.modalityForm);
  
  //console.log(JSON.stringify(this.vacanteForm.value));
  return this.service.addNewVacant(
    localStorage.getItem('token'),
    JSON.stringify(this.vacanteForm.value)
  ).subscribe(e =>{
    console.log(e);
  });
}

getEducations() {
  return this.service.getEducations().subscribe((educaciones: Data) => {
    for (let educacion of educaciones['education']) {
      this.educaciones.push(educacion);
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

getJobType() {
  return this.service.getJobType().subscribe((tipos: Data) => {
    for (let tipo of tipos['job_type']) {
      this.tipos.push(tipo);
    }
  });
}

getInfo(){
  return this.session.getInfo(localStorage.getItem('token'))
  .subscribe((res)=> {this.reclutador = res['data'].recruiter_info.id_user;
})
}

getCountries(){
  return this.service.getCountries()
  .subscribe((paises : Data) =>{
    for( let pais of paises['countries'] ){
      this.paises.push(pais);
    }
    console.log(this.paises);
  })
}


}
