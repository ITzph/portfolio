import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'portfolio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private el: ElementRef, private render: Renderer2) {}

  isPinned = false;

  scrollEvent: Subject<number> = new Subject();

  ngOnInit() {
    this.render.listen('body', 'wheel', () => {
      const rect = this.el.nativeElement.getBoundingClientRect().top;
      this.scrollEvent.next(rect);
    });

    this.scrollEvent.pipe(throttleTime(50)).subscribe((rect) => {
      if (rect < -20) {
        this.isPinned = true;
      } else {
        this.isPinned = false;
      }
    });
  }
}
