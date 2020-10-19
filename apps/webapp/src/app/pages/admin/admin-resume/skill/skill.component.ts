import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IUserSkill } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getSkills } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { trackByIdOrIndex } from '../../../../utils/tracker-by-id.util';

@Component({
  selector: 'portfolio-admin-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSkillComponent implements OnInit {
  skills$: Observable<IUserSkill[]> = this.profileStore.pipe(select(getSkills));

  skillToModify: IUserSkill;

  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    private readonly snackbar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  onSelectSkill(skill: IUserSkill) {
    this.skillToModify = skill;
  }

  skillTracker(index: number, skill: IUserSkill) {
    return trackByIdOrIndex(index, skill);
  }

  onUpdate() {
    this.skillToModify = null;
    this.snackbar.open(`Updated skill successfully`, 'success', {
      duration: 2000,
    });
  }
}
