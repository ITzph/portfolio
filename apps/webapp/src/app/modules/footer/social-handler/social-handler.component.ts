import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISocialHandler } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-social-handler',
  templateUrl: './social-handler.component.html',
  styleUrls: ['./social-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialHandlerComponent implements OnInit {
  @Input()
  social: ISocialHandler;

  constructor() {}

  ngOnInit(): void {}

  goToUrl(url: string) {
    window.open(url, '_blank');
  }
}
