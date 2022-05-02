import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirFotoPerfilComponent } from './subir-foto-perfil.component';

describe('SubirFotoPerfilComponent', () => {
  let component: SubirFotoPerfilComponent;
  let fixture: ComponentFixture<SubirFotoPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirFotoPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirFotoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
