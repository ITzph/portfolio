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
import { BinaryConfirmationComponent } from '../../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';

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
    private readonly skillService: SkillService,
    private readonly dialog: MatDialog,
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

  onAddNewSkill() {
    const emptyExperience: IUserSkill = {
      id: null,
      category: '',
      isCurrent: false,
      name: '',
    };

    // this.experienceService.addExperience(emptyExperience);
    this.skillService.addSkill(emptyExperience);
  }

  onDeleteSkill(skill: IUserSkill) {
    const dialogProp = {
      title: 'Delete Experinece',
      messages: [`Are you sure you want to delete ${skill.name}?`],
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        this.skillService.deleteSkill(skill.id);
      }
    });
  }
}
