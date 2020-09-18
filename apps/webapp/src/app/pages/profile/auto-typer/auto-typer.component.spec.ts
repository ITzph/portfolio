import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTyperComponent } from './auto-typer.component';

describe('AutoTypewriteComponent', () => {
  let component: AutoTyperComponent;
  let fixture: ComponentFixture<AutoTyperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoTyperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoTyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
