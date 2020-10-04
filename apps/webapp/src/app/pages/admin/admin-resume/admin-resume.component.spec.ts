import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResumeComponent } from './admin-resume.component';

describe('AdminResumeComponent', () => {
  let component: AdminResumeComponent;
  let fixture: ComponentFixture<AdminResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminResumeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
