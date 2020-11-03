import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISocialHandler } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-static-social-handler',
  templateUrl: './static-social-handler.component.html',
  styleUrls: ['./static-social-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticSocialHandlerComponent implements OnInit {
  @Input()
  social: ISocialHandler;

  @Input()
  fillColor = null;

  constructor() {}

  ngOnInit(): void {}

  goToUrl(url: string) {
    window.open(url, '_blank');
  }
}
