import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { IUserSkill } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getSkills } from '../../../../selectors/profile.selectors';
import * as fromProfile from '../../../../reducers/profile.reducer';
import { trackByIdOrIndex } from '../../../../utils/tracker-by-id.util';
import { SkillService } from './skill.service';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';

@Component({
  selector: 'portfolio-admin-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSkillComponent extends ResumeAdminComponentAbstract implements OnInit {
  skills$: Observable<IUserSkill[]> = this.profileStore.pipe(select(getSkills));

  elementToModify: IUserSkill;

  elementType = 'skill';

  constructor(
    private readonly profileStore: Store<fromProfile.State>,
    readonly snackbar: MatSnackBar,
    readonly skillService: SkillService,
    readonly dialog: MatDialog,
  ) {
    super(dialog, skillService, snackbar);
  }

  ngOnInit(): void {}

  onSelectSkill(skill: IUserSkill) {
    this.elementToModify = skill;
  }

  onAddNewSkill() {
    const cb = () => {
      const emptyExperience: IUserSkill = {
        id: null,
        category: '',
        isCurrent: false,
        name: '',
      };

      this.skillService.addElement(emptyExperience);
    };

    this.showConfirmationDialog('Add Skill', [`Are you sure you want to add new skill?`], cb);
  }
}
