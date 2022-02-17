import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { CompanyServiceService } from '../../services/company-service.service';

@Component({
  selector: 'app-search-talent',
  templateUrl: './search-talent.component.html',
  styleUrls: ['./search-talent.component.css']
})
export class SearchTalentComponent implements OnInit {
  public formGroup: FormGroup; //formulario
  public arrStates: any[] = [];
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private service: CompanyServiceService
  ) {}

  ngOnInit(): void {
    this.iniciarForm(); //inicializar el formulario
    this.getStates();
    console.log(this.arrStates);
  }

  iniciarForm(): void {
    this.formGroup = this.fb.group({
      tipo: [''],
      estado: [''],
    });
  }

  public getStates() {
    //metodo para obtener los estados de un pais
    this.service.getStates(1).subscribe((data: Data) => {
      for (let item of data['states']) {
        this.arrStates.push(item);
      }
    });
  }

  //boton para buscar talento
  public buscarTalento(): void {
    //cuando se presiona el botón se redirige a la pagina de buscar talento
    //y se le pasa el tipo de talento y el estado via queryParams
    console.log(this.formGroup.value);
    this.route.navigate(['/empresa/filtrar_talento'], {
      queryParams: {
        tipo: this.formGroup.value.tipo,
        estado: this.formGroup.value.estado,
      },
    });
  }

}
