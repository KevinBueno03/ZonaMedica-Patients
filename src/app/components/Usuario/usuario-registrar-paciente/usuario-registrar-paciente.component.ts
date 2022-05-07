import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from 'src/app/services/paciente.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-registrar-paciente',
  templateUrl: './usuario-registrar-paciente.component.html',
  styleUrls: ['./usuario-registrar-paciente.component.css']
})
export class UsuarioRegistrarPacienteComponent implements OnInit {


  closeResult = '';
  reactiveForm: FormGroup;
  hide = true;
  hideC = true;
  //rutas: Routes[];
  /*
    reactiveForm: FormGroup = new FormGroup({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })

    constructor(private _router: Router, private _userService: UserService) { }

    */

  constructor(private formBuilder: FormBuilder, private _router: Router, private pacienteService: PacienteService, private modalService: NgbModal) {
    this.reactiveForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      firstLastName: new FormControl('', Validators.required),
      secondName: new FormControl(''),
      secondLastName: new FormControl('', Validators.required),
      hn_id: new FormControl('', Validators.required),
      department: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      terminos: new FormControl('', Validators.required),
      politicas: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, {
      validators: this.MustMatch('password', 'confirmPassword')
    });
  }

  /* Validaciones Handle de errores.
  Email validar que ese correo no este en uso
  */



  submitted: boolean = false;
  get f() {
    return this.reactiveForm.controls;
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

  ngOnInit(): void {
  }

  ch(e: any) {
    if (e.checked) {
      this.reactiveForm.controls['password'].setValidators([Validators.required])
      this.reactiveForm.controls['password'].updateValueAndValidity()
    } else {
      this.reactiveForm.controls['password'].setValidators(null)
      this.reactiveForm.controls['password'].updateValueAndValidity()
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }
  }


  sweetAlertSuccess() {
    Swal.fire('¡Muy Bien!', 'Te hemos enviado un correo para que valides tu cuenta.', 'success');
  }

  sweetAlertError() {
    Swal.fire('¡Upps!', 'Algo no ha salido como lo esperabamos.', 'error');
  }

  register() {
    if (!this.reactiveForm.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this.pacienteService.registrarPaciente(JSON.stringify(this.reactiveForm.value))
      .subscribe(
        data => {
          if (data._err) {
            Swal.fire('Ups', data.message, 'error');
            this._router.navigate(['/']);
          } else {
            Swal.fire('¡Bien!', 'Te hemos enviado correo para validar tu cuenta', 'success');
            this._router.navigate(['/']);
          }
        },
        error => { Swal.fire('¡Rayos!', 'Estamos problemas con el servidor', 'error');
        console.log(error); }
      )
    console.log(JSON.stringify(this.reactiveForm.value));
  }

  //Metodos para los modales

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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




}
