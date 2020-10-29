import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSocialHandlerComponent } from './static-social-handler.component';

describe('StaticSocialHandlerComponent', () => {
  let component: StaticSocialHandlerComponent;
  let fixture: ComponentFixture<StaticSocialHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaticSocialHandlerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSocialHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
