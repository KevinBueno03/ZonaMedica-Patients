import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDoctoresComponent } from './card-doctores.component';

describe('CardDoctoresComponent', () => {
  let component: CardDoctoresComponent;
  let fixture: ComponentFixture<CardDoctoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDoctoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
