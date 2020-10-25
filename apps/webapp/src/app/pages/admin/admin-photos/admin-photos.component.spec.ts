import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemesComponent } from './admin-memes.component';

describe('AdminMemesComponent', () => {
  let component: AdminMemesComponent;
  let fixture: ComponentFixture<AdminMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMemesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
