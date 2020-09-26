import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortByPropertyComponent } from './sort-by-property.component';

describe('SortByPropertyComponent', () => {
  let component: SortByPropertyComponent;
  let fixture: ComponentFixture<SortByPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortByPropertyComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortByPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
