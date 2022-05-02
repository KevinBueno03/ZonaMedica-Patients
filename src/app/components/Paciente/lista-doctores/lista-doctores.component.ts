import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-doctores',
  templateUrl: './lista-doctores.component.html',
  styleUrls: ['./lista-doctores.component.css']
})
export class ListaDoctoresComponent implements OnInit {

  //@Output() sidenavClose= new EventEmitter();
  closeResult = '';
  listaDoctores: any=[];
  listaEspecialidad: any=[];
  public image!:string;
  especialidad= localStorage.getItem('especialidad');


  constructor(private modalService: NgbModal, private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.image = 'https://picsum.photos/536/354'
    // console.log('Entrando data:',this.dataEntrante);
    if(!this.especialidad){
      this.mostrarDoctores();
    }else if(this.especialidad=='Todos'){
      this.mostrarDoctores();
    }else{
      this.mostrarDoctoresEspecialidad(this.especialidad);
    }
  }

  mostrarDoctores(){
    this.doctorService.getDoctoresAceptados()
    .subscribe(respuesta=>{
      this.listaDoctores=respuesta;
      console.log("Solo el primer nombre: ", respuesta.firstName);
      console.log("La imagen: ", respuesta.img);
    })
  }
  hacerFiltro(filtro: string){
    this.listaDoctores.firstName.filter= filtro;
    console.log(this.listaDoctores);
  }

  mostrarDoctoresEspecialidad(especialidad:string){
    this.doctorService.getDoctoresEspecialidades(especialidad).subscribe(respuesta=>{
      this.listaDoctores= respuesta;
    });
  }


}
