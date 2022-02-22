import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Composant3Component } from './composant3.component';

describe('Composant3Component', () => {
  let component: Composant3Component;
  let fixture: ComponentFixture<Composant3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Composant3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Composant3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
