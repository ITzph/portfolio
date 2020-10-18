import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUserSkill } from '@portfolio/api-interfaces';
import { getSkills } from '../../../../selectors/profile.selectors';
import { Observable } from 'rxjs';
import * as fromProfile from '../../../../reducers/profile.reducer';

@Component({
  selector: 'portfolio-admin-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSkillComponent implements OnInit {
  skills$: Observable<IUserSkill[]> = this.profileStore.pipe(select(getSkills));

  constructor(private readonly profileStore: Store<fromProfile.State>) {}

  ngOnInit(): void {}
}
