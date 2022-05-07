import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from './components/Paciente/calendario/calendario.component';
import { EditarPerfilComponent } from './components/Paciente/editar-perfil/editar-perfil.component';
import { ListaDoctoresComponent } from './components/Paciente/lista-doctores/lista-doctores.component';
import { LoginPacienteComponent } from './components/Paciente/login-paciente/login-paciente.component';
import { PacienteInicioComponent } from './components/Paciente/paciente-inicio/paciente-inicio.component';
import { PerfilComponent } from './components/Paciente/perfil/perfil.component';
import { RegistroPacienteComponent } from './components/Paciente/registro-paciente/registro-paciente.component';
import { SubirArchivoComponent } from './components/Paciente/subir-archivo/subir-archivo.component';
import { SubirFotoPerfilComponent } from './components/Paciente/subir-foto-perfil/subir-foto-perfil.component';
import { InicioUsuarioComponent } from './components/Usuario/inicio-usuario/inicio-usuario.component';
import { UsuarioAcercaDeNosotrosPageComponent } from './components/Usuario/usuario-acerca-de-nosotros-page/usuario-acerca-de-nosotros-page.component';
import { UsuarioContactanosComponent } from './components/Usuario/usuario-contactanos/usuario-contactanos.component';
import { UsuarioFuncionalidadesPageComponent } from './components/Usuario/usuario-funcionalidades-page/usuario-funcionalidades-page.component';
import { UsuarioRegistrarPacienteComponent } from './components/Usuario/usuario-registrar-paciente/usuario-registrar-paciente.component';


const routes: Routes = [

  {path: '', redirectTo: '/zonamedica/usuario/inicio', pathMatch:'full'},

  //Path Panel es el componente padre
  {path: 'zonamedica', children: [
    {path: 'pacientes', children:[
      {path: 'login', component: LoginPacienteComponent},
      {path: 'registro', component: RegistroPacienteComponent},
      {path: 'perfil', component: PerfilComponent},
      {path: 'inicio', component: PacienteInicioComponent},
      {path: 'lista-doctores',component: ListaDoctoresComponent},
      {path: 'calendario', component: CalendarioComponent},
      {path: 'editar-perfil', component: EditarPerfilComponent},
      {path: 'subir-archivo', component: SubirArchivoComponent},
      {path: 'subir-foto-perfil', component: SubirFotoPerfilComponent},
      {path: 'registrarse', component: UsuarioRegistrarPacienteComponent},
      ]
    },
    {path: 'usuario', children:[
      {path: 'inicio', component: InicioUsuarioComponent},
      {path: 'acerca-nosotros', component: UsuarioAcercaDeNosotrosPageComponent},
      {path: 'funcionalidades', component: UsuarioFuncionalidadesPageComponent},
      {path: 'contactanos', component: UsuarioContactanosComponent}
    ]}

  ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
