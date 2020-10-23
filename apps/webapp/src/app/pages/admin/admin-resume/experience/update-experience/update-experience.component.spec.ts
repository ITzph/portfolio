import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExperienceComponent } from './update-experience.component';

describe('UpdateExperienceComponent', () => {
  let component: UpdateExperienceComponent;
  let fixture: ComponentFixture<UpdateExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateExperienceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
