import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconModule } from '@angular/material/icon';

import { ContentNotFoundComponent } from './content-not-found.component';

describe('ContentNotFoundComponent', () => {
  let component: ContentNotFoundComponent;
  let fixture: ComponentFixture<ContentNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentNotFoundComponent],
      imports: [MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
