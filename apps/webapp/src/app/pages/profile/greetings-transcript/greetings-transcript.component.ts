import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'portfolio-greetings-transcript',
  templateUrl: './greetings-transcript.component.html',
  styleUrls: ['./greetings-transcript.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingsTranscriptComponent implements OnInit {
  @Input() greetings: string[] = [];
  isTranscriptVisible = false;

  constructor() {}

  ngOnInit(): void {}

  toggleTranscript() {
    this.isTranscriptVisible = !this.isTranscriptVisible;
  }
}
