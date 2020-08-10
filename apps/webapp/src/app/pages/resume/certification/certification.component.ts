import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IUserCertification } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationComponent implements OnInit {
  @Input()
  certification: IUserCertification;

  constructor() {}

  ngOnInit(): void {}
}
