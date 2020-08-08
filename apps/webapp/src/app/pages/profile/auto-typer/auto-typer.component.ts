import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { of, Observable, concat, from, BehaviorSubject } from 'rxjs';
import { delay, concatMap, tap, takeWhile, take, map } from 'rxjs/operators';

@Component({
  selector: 'portfolio-auto-typer',
  templateUrl: './auto-typer.component.html',
  styleUrls: ['./auto-typer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoTyperComponent implements OnInit {
  @Input() messages: string[] = [];
  @Output() completed = new EventEmitter<boolean>();

  private readonly TYPING_SPEED_DELAY = 30;
  private readonly ERASE_SPEED_DELAY = 10;
  private readonly READING_DELAY_MULTIPLIER = 20;

  isTyping = true;

  message$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.autoType().subscribe(this.message$);
  }

  public skipAutoType() {
    this.message$.next(this.messages[this.messages.length - 1]);
    this.setIsTyping(false);
  }

  public retriggerAutoType() {
    this.setIsTyping(true);
    this.message$ = new BehaviorSubject<string>('');
    this.autoType().subscribe(this.message$);
  }

  private setIsTyping(isTyping: boolean) {
    this.message$.complete();
    this.isTyping = isTyping;
    this.completed.emit(!isTyping);
  }

  private autoType() {
    const array: Observable<string>[] = [];

    this.messages.forEach((element, index) => {
      array.push(this.addIndividualCharacters$(element));

      if (index < this.messages.length - 1) {
        array.push(this.pauseBeforeDeleting$());
        array.push(this.deleteCurrentMessage$());
      } else {
        array.push(this.emitCompleteTyping$());
      }
    });

    return concat(...array).pipe(takeWhile(() => this.isTyping));
  }

  private addIndividualCharacters$(element: string) {
    return of(element).pipe(
      concatMap((message) => {
        return from(message);
      }),
      concatMap((newCharacter) => {
        const newMessage = this.message$.getValue() + newCharacter;
        return of(newMessage).pipe(delay(this.TYPING_SPEED_DELAY));
      }),
    );
  }

  private deleteCurrentMessage$() {
    return this.message$.asObservable().pipe(
      takeWhile((message) => message.length > 0),
      delay(this.ERASE_SPEED_DELAY),
      map((message) => {
        return message.slice(0, -1);
      }),
    );
  }

  private pauseBeforeDeleting$() {
    return this.message$.asObservable().pipe(
      take(1),
      concatMap((message) => {
        return of(message).pipe(
          delay(this.READING_DELAY_MULTIPLIER * this.message$.getValue().length),
        );
      }),
    );
  }

  private emitCompleteTyping$() {
    return this.message$.asObservable().pipe(
      take(1),
      tap(() => {
        this.setIsTyping(false);
      }),
    );
  }
}
