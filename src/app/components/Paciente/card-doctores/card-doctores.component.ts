import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
enum CheckBoxType { inHouse, inClinic, online, cash, platform, NONE };

@Component({
  selector: 'app-card-doctores',
  templateUrl: './card-doctores.component.html',
  styleUrls: ['./card-doctores.component.css']
})
export class CardDoctoresComponent implements OnInit {
  agendarCita: FormGroup;
  horaActual = new Date();
  time: NgbTimeStruct = { hour: this.horaActual.getHours(), minute: 0, second: 0 };
  hourStep = 1;
  minuteStep = 30;
  fecha1!: string;
  fecha: string = '2021-12-03';
  closeResult = '';
  id_paciente: string = '';
  id_doctor: string = '';
  @Input() doctor: any;
  public image!: string;
  check_box_type = CheckBoxType;
  tipoPago!: CheckBoxType;
  tipoCita!: CheckBoxType;
  minutoPrueba=this.time.minute;


  selectCheckBoxTipoPago(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.tipoPago === targetType) {
      this.tipoPago = CheckBoxType.NONE;
      return;
    }
    this.tipoPago = targetType;
  }

  selectCheckBoxTipoCita(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.tipoCita === targetType) {
      this.tipoCita = CheckBoxType.NONE;
      return;
    }
    this.tipoCita = targetType;
  }


  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private doctorService: DoctorService, private _router: Router, private pacienteService: PacienteService) {

    this.agendarCita = this.formBuilder.group({
      date: new FormControl(),
      hour: new FormControl(),
      minutes: new FormControl(),
      description: new FormControl('', Validators.required),
      medAppointment_modality_inHouse: new FormControl(false),
      medAppointment_modality_inClinic: new FormControl(false),
      medAppointment_modality_online: new FormControl(false),
      payment_cash: new FormControl(false),
      payment_digital: new FormControl(false),
      id_patient: new FormControl(),
      id_doctor: new FormControl()
    });

  }

  public datosDoctor: Array<any> = []


  agendarCitaMedica() {
    this.agendarCita.controls['id_patient'].setValue(this.id_paciente);
    this.agendarCita.controls['id_doctor'].setValue(this.id_doctor);
    this.agendarCita.controls['hour'].setValue(this.time.hour);
    let minuto=this.time.minute.toString();
    console.log(minuto);
    console.log(this.time.minute);
    if(minuto==='0'){minuto='00';this.agendarCita.controls['minutes'].setValue(minuto);}else{
      this.agendarCita.controls['minutes'].setValue(minuto);};

    if (!this.agendarCita.valid) {
      console.log('Formulario Invalido');
      return;
    }

    this.pacienteService.agendarCita(JSON.stringify(this.agendarCita.value))
      .subscribe(

        data => { console.log("Si wey"); this.sweetAlertCitaSuccess(); this._router.navigate(['/paciente/calendario-usuario']); this.modalService.dismissAll() },
        error => { console.log(error); this.sweetAlertCitaError(); this.modalService.dismissAll() }
      )

     //console.log("Hora: ", this.time.hour,':', minuto);
    //console.log("Lo que te envio: ", JSON.stringify(this.agendarCita.value));
  }

  sweetAlertCitaSuccess() {
    Swal.fire('¡Bien!', 'Hemos agendado tu cita satisfactoriamente', 'success');
  }

  sweetAlertCitaError() {
    Swal.fire('¡Que mal!', 'Un error ha ocurrido y no hemos podido agendar tu cita médica', 'error');
  }

  ngOnInit(): void {
    this.pacienteService.getPaciente().subscribe(data => this.id_paciente = data[0]._id);
    this.fecha1 = this.horaActual.getDay().toString();
    console.log("Fecha Actual: ", this.fecha1);
    //console.log('Hora Atual= ',this.horaActual.getHours(),':',this.horaActual.getMinutes())
    this.doctorService.disparadordeInfoDoctor.subscribe(data => {
      //console.log("Recibiendo la data del modal...", data)
      this.datosDoctor = Array.of(data);
    })
  }


  openPerfil(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //console.log(this.doctor);
    this.doctorService.disparadordeInfoDoctor.emit({
      data: this.doctor
    })
  }

  openCita(content: any) {
    this.fecha=this.fecha1;
    this.id_doctor = this.doctor._id;
    console.log('ID DOCTOR: ', this.id_doctor);
    console.log('ID PACIENTE: ', this.id_paciente);
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



  sweetAlertSuccessCita() {
    Swal.fire('¡Cita Agendada!', 'Gracias por tu confianza', 'success');
  }
  sweetAlertErrorCita() {
    Swal.fire('¡Upps!', 'Hubo un error al crear tu cita', 'error');
  }


}
