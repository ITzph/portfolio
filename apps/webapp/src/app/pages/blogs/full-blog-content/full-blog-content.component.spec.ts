import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBlogContentComponent } from './full-blog-content.component';

describe('FullBlogContentComponent', () => {
  let component: FullBlogContentComponent;
  let fixture: ComponentFixture<FullBlogContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FullBlogContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBlogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
