import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IUserSkill } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  @Input()
  skill: IUserSkill;

  constructor() {}

  ngOnInit(): void {}
}
