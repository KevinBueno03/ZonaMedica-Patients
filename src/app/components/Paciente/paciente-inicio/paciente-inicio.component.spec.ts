import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteInicioComponent } from './paciente-inicio.component';

describe('PacienteInicioComponent', () => {
  let component: PacienteInicioComponent;
  let fixture: ComponentFixture<PacienteInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
