import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CompanyServiceService } from '../../services/company-service.service';

declare var paypal: any;

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css'],
})
export class NewPaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  public paquete: any;
  public arrInfoPaquete: any[] = [];

  producto = {
    nombre: 'Plan de prueba',
    precio: '1',
    descripcion: 'Plan de prueba',
  };

  paidFor = false;
  currency = 'MXN';

  constructor(
    private route: Router,
    private service: CompanyServiceService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paquete = this.router.snapshot.paramMap.get('id');
    this.getInfoPaquete();
    console.log(this.arrInfoPaquete);

    if (localStorage.getItem('token') == null) {
      this.route.navigate(['/login']);
    } else {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.producto.descripcion,
                  amount: {
                    currency_code: this.currency,
                    value: this.producto.precio,
                  },
                }, // Aquí va el precio del producto
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            Swal.fire({
              title: 'Pago exitoso',
              text: 'Pago realizado con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
          },
          onError: (err) => {
            console.log(err);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un error al realizar el pago',
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          },
        })
        .render(this.paypalElement.nativeElement);
    }
  }

  public getInfoPaquete() {
    Swal.fire({
      title: 'Obteniendo información',
      html: 'Espera un momento por favor',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); //muestra el loading
        this.service
          .getInfoPayment(localStorage.getItem('token'), this.paquete)
          .subscribe((data: Data) => {
            if (data != null) {
              //si no es nulo todo bien y llenamos el arreglo de paquetes con los paquetes que nos regresa el servicio
              Object.entries(data['data']).forEach(([key, value]) => {
                this.arrInfoPaquete[key] = value;
              });
            } else {
            }
            Swal.close(); //cierra el loading
          });
      },
    });
  }
}
