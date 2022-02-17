import { Component, Input } from '@angular/core';
import { Router, Data } from '@angular/router';
import { SessionService } from '../../modules/login/services/session.service'
import { RegisterService } from '../../modules/login/services/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  @Input() titulo: string = '';

  public group: any;

  public arrNotifications: any[] = [];
  public numNotifi: number = 0;

  public groups: any[] = [];
  public cvTkn: string;

  constructor(
    private router: Router,
    private token: SessionService,
    private service: RegisterService
  ) {}
  //metodo para validar si el usuario esta logueado
  ngOnInit() {
    this.cvTkn = localStorage.getItem('token'); //obtenemos el token y lo guardamos en la variable cvTkn
    this.obtenerNotificaciones();
    this.obtenerGroup();
  }

  getGroup() {
    return localStorage.getItem('group');
  }

  log() {
    if (localStorage.getItem('token') == null) {
      return true;
    } else {
      return false;
    }
  }

  vacantes() {
    this.router.navigate(['/vacantes']);
  }

  buscarTalento() {
    this.router.navigate(['/buscar_talento']);
  }

  perfilEmpresa() {
    this.router.navigate(['/perfil_empresas']);
  }

  perfilTalento() {
    this.router.navigate(['/perfil_usuario']);
  }
  //metodo para redireccionar a la pagina de preferencias
  preferencias() {
    this.router.navigate(['/cuenta']);
  }
  //meotodo para redireccionar a la mesa de trabajo del talento
  mesaTrabajoTalento() {
    this.router.navigate(['/vista_empleos', '']);
  }
  //metodo para redireccionar a la pagina de buscar empleos
  buscarEmpleos() {
    this.router.navigate(['/empleos']);
  }
  //metodo para redireccionar a la pagina de registro
  registrarse() {
    this.router.navigate(['/registro']);
  }
  //metodo para redireccionar a la pagina de login
  is() {
    this.router.navigate(['/login']);
  }
  //metodo para cerrar sesion
  cerrarSesion() {
    Swal.fire({
      title: 'Cerrando Sesión',
      html: '¡Vuelve pronto!',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
          //cerramos la sesion
          localStorage.removeItem('token');
          localStorage.removeItem('group');
          //redireccionamos a la pagina de inicio despues de 7 segundos
          this.router.navigate(['/home']);
        }, 900);
      },
    });
  }
  //metodo para redireccionar al home
  home() {
    this.router.navigate(['/home']);
  }

  //notificaciones
  goToNotifi() {
    this.router.navigate(['/vista_empleos']);
  }

  //obtener las notificaciones
  obtenerNotificaciones() {
    return this.service
      .getNotificaciones(localStorage.getItem('token'))
      .subscribe((data: Data) => {
        if (data != null) {
          Object.entries(data['data']).forEach(([key, value]) => {
            this.arrNotifications[key] = value;
          });
          this.numNotifi =
            parseInt(this.arrNotifications['applications']) +
            parseInt(this.arrNotifications['profile_viewed']);
        }
      });
  }

  obtenerGroup() {
    return this.token
      .getGroup(localStorage.getItem('token'))
      .subscribe((res: Data) => {
        if (res != null) {
          this.groups.push(res['group']);
          localStorage.setItem('group', res['group']);
        } else {
          this.cerrarSesion();
        }
      });
  }
}
