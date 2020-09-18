import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoModule } from '../photo.module';

import { PhotoDetailComponent } from './photo-detail.component';

describe('MemeDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PhotoModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
