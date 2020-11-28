import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExperienceCategory, IUserExperience } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  @Input()
  experience: IUserExperience;

  constructor() {}

  ngOnInit(): void {}

  get categoryIcon() {
    return (
      {
        [ExperienceCategory.WORK]: 'briefcase',
        [ExperienceCategory.EDUCATION]: 'graduation-cap',
      }[this.experience.category] ?? 'radiation-alt'
    );
  }
}
