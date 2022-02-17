import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../../login/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review-company.component.html',
  styleUrls: ['./review-company.component.css']
})
export class ReviewCompanyComponent implements OnInit {
  formGroup: FormGroup;
  id_company: number;
  relacion: string;
  estrellas: number;
  evaluacion: string;
  date: Date = new Date();
  params: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private registrar: RegisterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Inicializar el formulario
    this.iniciarForm();
    this.params = this.route.snapshot.params;
    this.id_company = this.params.id;
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      relacion: [''],
      estrellas: [''],
      evaluacion: [''],
    });
  }

  enviarForm(): void {
    this.relacion = this.formGroup.get('relacion').value;
    this.estrellas = this.formGroup.get('estrellas').value;
    this.evaluacion = this.formGroup.get('evaluacion').value;
    //Creacion del objeto que recibe el servicio
    let data = {
      id_company: this.id_company,
      title: this.relacion,
      score: this.estrellas,
      review: this.evaluacion,
      datetime:
        this.date.getFullYear() +
        '-' +
        (this.date.getMonth() + 1) +
        '-' +
        this.date.getDate() +
        ' ' +
        this.date.toLocaleTimeString(),
    };
    //Cgechear si el formulario esta lleno
    if (localStorage.getItem('token') != null) {
      if (this.relacion == '' || this.estrellas == 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Datos Insuficientes',
          text: 'Por favor ingresa todos tus datos',
          confirmButtonColor: '#1c4a83',
          focusConfirm: false,
        });
        return;
      } else {
        Swal.fire({
          title: 'Enviando reseña...',
          html: 'Espera un momento por favor',
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            //llaamado al servicio
            this.registrar
              .insertarReview(localStorage.getItem('token'), data)
              .subscribe((data) => {
                //si la llamada me devuelve una respuesta diferente de null, se envio correctamente
                if (data != null) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Reseña enviada',
                    text: 'Gracias por tu reseña, pronto la revisaremos y publicaremos',
                    confirmButtonColor: '#1c4a83',
                    focusConfirm: false,
                  });
                  this.router.navigate(['/perfil_empresa']);
                } else {
                  //si la llamada me devuelve una respuesta igual a null, hubo un error y limpio el formulario
                  this.limpiar();
                  this.ngOnInit();
                }
              });
          },
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'para enviar una reseña debes estar registrado',
        confirmButtonColor: '#1c4a83',
        focusConfirm: false,
      });
      return;
    }
  }

  limpiar(): void {
    this.formGroup.reset();
  }

}
