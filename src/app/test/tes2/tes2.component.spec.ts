import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tes2Component } from './tes2.component';

describe('Tes2Component', () => {
  let component: Tes2Component;
  let fixture: ComponentFixture<Tes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tes2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
