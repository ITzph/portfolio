import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhotoModule } from '../photo.module';

import { PhotosListComponent } from './photos-list.component';

describe('MemesListComponent', () => {
  let component: PhotosListComponent;
  let fixture: ComponentFixture<PhotosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhotoModule, HttpClientTestingModule, MatSnackBarModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
