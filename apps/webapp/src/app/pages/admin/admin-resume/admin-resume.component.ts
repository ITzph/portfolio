import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'portfolio-admin-resume',
  templateUrl: './admin-resume.component.html',
  styleUrls: ['./admin-resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminResumeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
