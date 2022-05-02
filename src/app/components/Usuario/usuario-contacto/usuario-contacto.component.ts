import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-contacto',
  templateUrl: './usuario-contacto.component.html',
  styleUrls: ['./usuario-contacto.component.css']
})
export class UsuarioContactoComponent implements OnInit {

  formContactanos: FormGroup;
  closeResult = '';

  constructor(private formBuilder: FormBuilder, private _router: Router, private pacienteService: PacienteService) {
    this.formContactanos = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      message: new FormControl('')
    });

  }

  submitted: boolean = false;
  get formDoctor() {
    return this.formContactanos.controls;
  }

  ngOnInit(): void {
  }

  enviarCorreo() {
    if (!this.formContactanos.valid) {
      console.log('Formulario Invalido');
      return;
    }
    this.pacienteService.enviarCorreo(JSON.stringify(this.formContactanos.value))
      .subscribe(
        data => { console.log(data);  Swal.fire('¡Bien!', 'Pronto nos pondremos en contacto contigo', 'success') ; this._router.navigate(['/']);},
        error => {console.log(error); Swal.fire('Upps', 'Ha ocurrido un error', 'error')}
      )
    console.log(JSON.stringify(this.formContactanos.value));
  }




}
