import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsuarioAcercaDeNosotrosComponent } from './components/Usuario/usuario-acerca-de-nosotros/usuario-acerca-de-nosotros.component';
import { UsuarioAcercaDeNosotrosPageComponent } from './components/Usuario/usuario-acerca-de-nosotros-page/usuario-acerca-de-nosotros-page.component';
import { UsuarioContactanosComponent } from './components/Usuario/usuario-contactanos/usuario-contactanos.component';
import { UsuarioContactoComponent } from './components/Usuario/usuario-contacto/usuario-contacto.component';
import { UsuarioFooterComponent } from './components/Usuario/usuario-footer/usuario-footer.component';
import { UsuarioFuncionalidadesComponent } from './components/Usuario/usuario-funcionalidades/usuario-funcionalidades.component';
import { UsuarioFuncionalidadesPageComponent } from './components/Usuario/usuario-funcionalidades-page/usuario-funcionalidades-page.component';
import { NavbarComponent } from './components/Usuario/navbar/navbar.component';
import { CalendarioComponent } from './components/Paciente/calendario/calendario.component';
import { CardDoctoresComponent } from './components/Paciente/card-doctores/card-doctores.component';
import { EditarPerfilComponent } from './components/Paciente/editar-perfil/editar-perfil.component';
import { ListaDoctoresComponent } from './components/Paciente/lista-doctores/lista-doctores.component';
import { PerfilComponent } from './components/Paciente/perfil/perfil.component';
import { SubirArchivoComponent } from './components/Paciente/subir-archivo/subir-archivo.component';
import { SubirFotoPerfilComponent } from './components/Paciente/subir-foto-perfil/subir-foto-perfil.component';
import { RegistroPacienteComponent } from './components/Paciente/registro-paciente/registro-paciente.component';
import { InicioUsuarioComponent } from './components/Usuario/inicio-usuario/inicio-usuario.component';
import { NavbarPacienteComponent } from './components/Paciente/navbar-paciente/navbar-paciente.component';

//Calendario
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { PacienteService } from './services/paciente.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PacienteInicioComponent } from './components/Paciente/paciente-inicio/paciente-inicio.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
//Calendario



@NgModule({
  declarations: [
    AppComponent,
    UsuarioAcercaDeNosotrosComponent,
    UsuarioAcercaDeNosotrosPageComponent,
    UsuarioContactanosComponent,
    UsuarioContactoComponent,
    UsuarioFooterComponent,
    UsuarioFuncionalidadesComponent,
    UsuarioFuncionalidadesPageComponent,
    NavbarComponent,
    CalendarioComponent,
    CardDoctoresComponent,
    EditarPerfilComponent,
    ListaDoctoresComponent,
    PerfilComponent,
    SubirArchivoComponent,
    SubirFotoPerfilComponent,
    RegistroPacienteComponent,
    InicioUsuarioComponent,
    NavbarPacienteComponent,
    PacienteInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FullCalendarModule, // register FullCalendar with you app
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule
  ],exports:[
    MatSidenavModule
  ],
  providers: [PacienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
