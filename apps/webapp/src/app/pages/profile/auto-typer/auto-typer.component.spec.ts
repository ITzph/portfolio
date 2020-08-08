import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTypewriteComponent } from './auto-typer.component';

describe('AutoTypewriteComponent', () => {
  let component: AutoTypewriteComponent;
  let fixture: ComponentFixture<AutoTypewriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoTypewriteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoTypewriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
