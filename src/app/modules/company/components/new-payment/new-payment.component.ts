import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var paypal: any;

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  producto = {
    nombre: 'Plan de prueba',
    precio: '1000',
    descripcion: 'Plan de prueba',
  };

  paidFor = false;
  currency = 'MXN';

  constructor(private route: Router) {}

  ngOnInit(): void {
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
            //orden de compra
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
            //aqui va el codigo para guardar la orden de compra
            //y redireccionar al usuario a la pagina de confirmacion
          },
          onError: err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err,
            });
          },
        },
        )
        .render(this.paypalElement.nativeElement);
    }
  }

}
