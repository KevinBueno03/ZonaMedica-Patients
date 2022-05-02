import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListaPacientes, PacienteInfo } from 'src/app/interfaces/paciente.interfaces';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data= JSON.stringify('all');
  token= JSON.stringify(localStorage.getItem("token"));

  pacientesData: PacienteInfo[]=[];
  //datos= JSON.stringify(this.pacientesData);
  //arreglo=JSON.parse(JSON.stringify(this.pacientesData));

  nombreCampos = ["firstName", "secondName", "firstLastName", "secondLastName","hn_id", "email"];
  infoPacientes = new MatTableDataSource<PacienteInfo>();
  loading: boolean = false;
  errorMessage!: string;


  constructor(private pacienteService: PacienteService){
   }


   ngOnInit(): void {
    this.pacienteService.getPaciente().subscribe(data=> this.pacientesData=data);
    console.log(this.pacientesData);
  }

  actualizarPerfil(){
    Swal.fire('¡Bien!', 'Hemos enviado un mensaje al administrador para actualizar tu información', 'success');
  }

}
