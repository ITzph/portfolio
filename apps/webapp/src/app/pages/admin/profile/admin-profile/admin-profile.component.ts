import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'portfolio-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProfileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
