import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteInfo } from 'src/app/interfaces/paciente.interfaces';
import Swal from 'sweetalert2';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-navbar-paciente',
  templateUrl: './navbar-paciente.component.html',
  styleUrls: ['./navbar-paciente.component.css']
})
export class NavbarPacienteComponent implements OnInit {

  /*
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
*/
@Output() public sidenavToggle = new EventEmitter();
recuperarContra: FormGroup;
closeResult = '';
pacientesData: PacienteInfo[]=[];

constructor(private _router: Router,private pacienteService: PacienteService,  private modalService: NgbModal, private formBuilder: FormBuilder){
  this.recuperarContra= this.formBuilder.group({
    emailRecu: new FormControl('', [Validators.required, Validators.email])
  });
}

get recuContra() {
  return this.recuperarContra.controls;
}

recupContra(){
  if(!this.recuperarContra.valid){
    console.log('No se pudo enviar el email');
    return;
  }
  this.pacienteService.restablecerContra(JSON.stringify(this.recuperarContra.value))
  .subscribe(
    data => {console.log(data); this._router.navigate(['/']); this.sweetAlertCorreo()},
    error => {console.log(error); this.logoutPaciente() ; this.modalService.dismissAll() ;this.sweetAlertCorreo()}
  )
  console.log(JSON.stringify("Estos valores le envio: "+ this.recuperarContra.value))
}

logoutPaciente(){
  this._router.navigateByUrl('/user/login-user');
  this.pacienteService.logoutPaciente();
}



ngOnInit(): void {
  this.pacienteService.getPaciente().subscribe(data=> this.pacientesData=data);
  console.log(this.pacientesData);
}


open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


sweetAlertCorreo() {
  Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para restablecer tu contraseña', 'success');
}

}
