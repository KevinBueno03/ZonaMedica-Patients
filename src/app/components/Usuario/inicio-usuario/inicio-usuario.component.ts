import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from 'src/app/services/paciente.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio-usuario',
  templateUrl: './inicio-usuario.component.html',
  styleUrls: ['./inicio-usuario.component.css']
})
export class InicioUsuarioComponent implements OnInit {
  private doctorUrl: string = environment.baseDoctorUrl;
  closeResult = '';
  formLogin: FormGroup;
  recuperarContra: FormGroup;
  reactiveForm: FormGroup;
  //formLoginDoctor: FormGroup;
  hideP=true;
  isVisible: any;
  isSelected: boolean = true;
  public isCollapsedD = true;
  public isCollapsedP = true;
  submittedPaciente: boolean=false;
  submitted: boolean = false;
  hide=true;
  hideC=true;


  ngOnInit(): void {
  }


  constructor(private formBuilder: FormBuilder, private _router: Router,  private modalService: NgbModal, private pacienteService: PacienteService) {
    this.reactiveForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      emailPaciente: new FormControl('',[Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('',Validators.required),
      passwordPaciente: new FormControl('', Validators.required),
      confirmPasswordPaciente: new FormControl('', Validators.required),
    }, {
      validators: this.MustMatch('passwordPaciente', 'confirmPasswordPaciente')
    });

    this.recuperarContra= this.formBuilder.group({
      emailRecu: new FormControl('', [Validators.required, Validators.email])
    });

    this.formLogin = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    /*
    this.formLoginDoctor = this.formBuilder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      passwordLogin: new FormControl('', Validators.required)
    }); */

  }

  //Inicio Funciones Login Logout Paciente

  logoutPaciente(){
    this._router.navigateByUrl('/');
    this.pacienteService.logoutPaciente();
  }

  logPaciente(){
    //console.log(this.formLogin.value);
    const {email, password}= this.formLogin.value;
    this.pacienteService.loginPaciente(email, password)
    .subscribe( resp =>{
      if(resp){
        this._router.navigateByUrl('/zonamedica/pacientes/inicio');
      }else{
        this.sweetAlertLoginError();
      }
    });
  }

  get formularioPaciente() {
    return this.reactiveForm.controls;
  }

  get recuContra() {
    return this.recuperarContra.controls;
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      } if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }



  ch(e: any) {
    if (e.checked) {
      this.formLogin.controls['password'].setValidators([Validators.required])
      this.formLogin.controls['password'].updateValueAndValidity()
    } else {
      this.formLogin.controls['password'].setValidators(null)
      this.formLogin.controls['password'].updateValueAndValidity()
    }
  }

  registrarPaciente() {
    if (!this.reactiveForm.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this.pacienteService.registrarPaciente(JSON.stringify(this.reactiveForm.value))
      .subscribe(
        data => { console.log(data); this._router.navigate(['/']); this.sweetAlertRegistroSuccess() },
        error => {console.log(error); this.sweetAlertRegistroError()}
      )
    console.log(JSON.stringify(this.reactiveForm.value));
  }


  recupContra(){
    if(!this.recuperarContra.valid){
      console.log('No se pudo enviar el email');
      return;
    }
    this.pacienteService.restablecerContra(JSON.stringify(this.recuperarContra.value))
    .subscribe(
      data => {console.log(data); this._router.navigate(['/']); this.sweetAlertCorreo()},
      error => {console.log(error); console.log("Ha ocurrido un error"); this.sweetAlertCorreoError()}
    )
    console.log(JSON.stringify("Estos valores le envio: "+ this.recuperarContra.value))
  }

  onSubmit() {
    this.submitted = true;
    this.submittedPaciente=true;
    if (this.formLogin.invalid) {
      return;
    }
  }


  get form() {
    return this.formLogin.controls;
  }


  //INICIO FUNCIONES PARA MODALES

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

  enviarPaciente(){
    this._router.navigate(['/zonamedica/pacientes/registrarse']);
    this.modalService.dismissAll();
  }

  enviarDoctor(){
    window.location.href = this.doctorUrl+'/#/doctor/register';
    this.modalService.dismissAll();
  }

  loginDoctor(){
    window.location.href = this.doctorUrl+'/#/doctor/login';
  }
  //FIN MODALES

  //INICIO ALERTAS

  sweetAlertRegistroSuccess() {
    Swal.fire('¡Muy Bien!', 'Te has registrado satisfactoriamente', 'success');
  }

  sweetAlertRegistroError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

  sweetAlertCorreo() {
    Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para restablecer tu contraseña', 'success');
  }

  sweetAlertCorreoError() {
    Swal.fire('¡Bien!', 'Correo enviado', 'success');
  }

  sweetAlertLoginSuccess() {
    Swal.fire('¡Muy Bien!', 'Has iniciado sesion satisfactiamente.', 'success');
  }

  sweetAlertLoginError() {
    Swal.fire('¡Upps!', 'Revisa que tu correo y contraseña estén bien escritos', 'error');
  }



}
