import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMemeDialogComponent } from './update-meme-dialog.component';

describe('UpdateMemeDialogComponent', () => {
  let component: UpdateMemeDialogComponent;
  let fixture: ComponentFixture<UpdateMemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMemeDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
