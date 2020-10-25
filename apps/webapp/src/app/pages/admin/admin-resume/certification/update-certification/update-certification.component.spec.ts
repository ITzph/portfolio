import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCertificationComponent } from './update-certification.component';

describe('UpdateCertificationComponent', () => {
  let component: UpdateCertificationComponent;
  let fixture: ComponentFixture<UpdateCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCertificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
