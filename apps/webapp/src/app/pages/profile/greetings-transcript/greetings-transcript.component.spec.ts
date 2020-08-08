import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingsTranscriptComponent } from './greetings-transcript.component';

describe('GreetingsTranscriptComponent', () => {
  let component: GreetingsTranscriptComponent;
  let fixture: ComponentFixture<GreetingsTranscriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GreetingsTranscriptComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingsTranscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
