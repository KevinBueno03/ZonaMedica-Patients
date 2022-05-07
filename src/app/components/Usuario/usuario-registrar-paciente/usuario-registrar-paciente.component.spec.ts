import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRegistrarPacienteComponent } from './usuario-registrar-paciente.component';

describe('UsuarioRegistrarPacienteComponent', () => {
  let component: UsuarioRegistrarPacienteComponent;
  let fixture: ComponentFixture<UsuarioRegistrarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRegistrarPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistrarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
