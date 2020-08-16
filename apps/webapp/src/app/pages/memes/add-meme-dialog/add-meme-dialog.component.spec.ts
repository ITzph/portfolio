import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemeDialogComponent } from './add-meme-dialog.component';

describe('AddMemeDialogComponent', () => {
  let component: AddMemeDialogComponent;
  let fixture: ComponentFixture<AddMemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddMemeDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
