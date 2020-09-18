import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminModule } from '../admin.module';

import { AdminMemesComponent } from './memes.component';

describe('MemesComponent', () => {
  let component: AdminMemesComponent;
  let fixture: ComponentFixture<AdminMemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, HttpClientTestingModule],
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
