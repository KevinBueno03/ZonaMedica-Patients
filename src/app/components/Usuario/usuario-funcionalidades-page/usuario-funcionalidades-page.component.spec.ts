import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFuncionalidadesPageComponent } from './usuario-funcionalidades-page.component';

describe('UsuarioFuncionalidadesPageComponent', () => {
  let component: UsuarioFuncionalidadesPageComponent;
  let fixture: ComponentFixture<UsuarioFuncionalidadesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioFuncionalidadesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFuncionalidadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
