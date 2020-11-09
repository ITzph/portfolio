import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewerComponent } from './files.component';

describe('FilesComponent', () => {
  let component: FilesViewerComponent;
  let fixture: ComponentFixture<FilesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilesViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
