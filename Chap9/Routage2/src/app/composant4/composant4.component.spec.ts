import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Composant4Component } from './composant4.component';

describe('Composant4Component', () => {
  let component: Composant4Component;
  let fixture: ComponentFixture<Composant4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Composant4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Composant4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
