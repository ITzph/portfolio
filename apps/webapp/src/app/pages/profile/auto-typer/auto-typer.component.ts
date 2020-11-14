import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import Typewriter from 'typewriter-effect/dist/core';

@Component({
  selector: 'portfolio-auto-typer',
  templateUrl: './auto-typer.component.html',
  styleUrls: ['./auto-typer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoTyperComponent implements OnInit, AfterViewInit {
  @Input() messages: string[] = [];
  @Output() completed = new EventEmitter<boolean>();

  private readonly TYPING_SPEED_DELAY = 1;
  private readonly ERASE_SPEED_DELAY = 1;
  private readonly READING_DELAY_MULTIPLIER = 2;

  isTyping = true;

  private typewriter = null;

  @ViewChild('message') messageContainer: ElementRef<HTMLSpanElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAutotyping();
  }

  private initializeAutotyping() {
    this.typewriter = new Typewriter(this.messageContainer.nativeElement, {
      delay: this.TYPING_SPEED_DELAY,
    });

    this.messages.forEach((message, index) => {
      this.typewriter.typeString(message).pauseFor(message.length * this.READING_DELAY_MULTIPLIER);

      if (this.messages.length - 1 > index) {
        this.typewriter.deleteAll(this.ERASE_SPEED_DELAY);
      }
    });

    this.typewriter.start();
  }

  public skipAutoType() {
    this.typewriter.stop();
    this.messageContainer.nativeElement.innerText = this.messages[this.messages.length - 1];
    this.setIsTyping(false);
  }

  public retriggerAutoType() {
    this.setIsTyping(true);
    this.initializeAutotyping();
  }

  private setIsTyping(isTyping: boolean) {
    this.isTyping = isTyping;
    this.completed.emit(!isTyping);
  }
}
