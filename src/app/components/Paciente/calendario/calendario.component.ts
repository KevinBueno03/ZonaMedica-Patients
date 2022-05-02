import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  appointments?:any=[];
  idUsuario?:any;
  calendario!:CalendarOptions;
  events:any=[];
  i?:any;
  doctor:any;
  nombre:any;
  elemento:any;
  hora:any;
  des:any;
  appointment?:any;
  minutes:any;
  contador:any;
  detalle:any;
  modalControl?:boolean=false;
  table:any;
  thead:any;
  modalidad:any;
  pay:any;
constructor(private doctorService: DoctorService, private patientService: PacienteService) {

}

ngOnInit(): void {

  this.patientService.getPaciente().subscribe(data=>{
    this.idUsuario=data[0]._id;
    //console.log(this.idUsuario);
    this.obtenerInfo();
  }
  );

  console.log('Eventos: ',this.events);
}
obtenerInfo(){
  this.patientService.getMedAppointment(this.idUsuario).subscribe(data=>{
  this.appointments=data;


  //console.log(this.appointments);
    this.fillEvents();
  }
  );
  console.log('Eventos Llenos: ',this.events);
}
fillCalendar(){
  this.calendario = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    locale: 'es',
    events: this.events,
    weekends:false,
    displayEventTime:true
  };
  this.calendario.weekends = !this.calendario.weekends // toggle the boolean!
}



handleDateClick(arg:any) {
  this.modalControl=true;
  this.detalle="";
  this.thead=`
  <th scope="col">Doctor</th>
  <th scope="col">Fecha</th>
  <th scope="col">Hora</th>
  <th scope="col col-span-2" style="min-width:30px">Modalidad</th>
  <th scope="col">Pago</th>
  <th scope="col">Descripción</th>`;
   this.events.forEach((element: any) => {
      if(element.date==arg.dateStr){
        this.detalle=this.detalle+`
        <tr>
          <td>${element.nombre} </td>
          <td>${element.date}  </td>
          <td>${element.hour}</td>
          <td>${element.modality}</td>
          <td>${element.pay}</td>
          <td>${element.description}</td>
        </tr>
        `
        //console.log(arg.dateStr);
      }
  });
  this.table=`
      <table class="table table-striped" style="font-size:0.7em">
        <thead>
          <tr>
            ${this.thead}
          </tr>
          </thead>
          <tbody>
            ${this.detalle}

          </tbody>
      </table>`
  Swal.fire({
    title:'Citas de la fecha',
    width: 800,
    html:this.table
  });
}

fillEvents(){
  this.contador=0;
  for(let appointment of this.appointments!){
    this.doctorService.getDoctorById(appointment.id_doctor).subscribe(data=>{
      this.doctor=data;
      this.nombre=this.doctor.firstName+" "+this.doctor.firstLastName;
      if(appointment.medAppointment_modality_inClinic==true){
        this.modalidad="Clínica";
      }else if(appointment.medAppointment_modality_inHouse==true){
        this.modalidad="Casa"
      }else{
        this.modalidad="En línea"
      }
      if(appointment.payment_cash==true){
        this.pay="Efectivo"
      }else{
        this.pay="Digital"
      }
      //console.log("doctor"+appointment+this.doctor);
      //console.log(this.nombre);
      this.elemento={
        title: 'Cita doctor '+this.nombre,
        date:appointment.date,
        hour:this.getHora(appointment.hour, appointment.minutes),
        modality:this.modalidad,
        nombre:this.nombre,
        pay:this.pay,
        description:appointment.description
      }
      this.events.push(this.elemento);
      this.contador=this.contador+1;
      if(this.contador>=this.appointments.length){
        this.fillCalendar();
      }
      //console.log(this.events);
      }
      );
    }

}

getHora(hora:any, minutes:any){

  if(hora>12){
    this.hora=hora-12;
    this.des="pm";
  }else if(hora==12){
    this.hora=hora;
    this.des="pm";
  }else{
    this.hora=hora;
    this.des="am";
  }
  if(minutes<=9||minutes==0){
    return this.hora+":0"+minutes.toString()+this.des;
  }else{
  return this.hora+":"+minutes.toString()+this.des;
  }

}

}
