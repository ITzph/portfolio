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
    const cb = () => {
      const emptyExperience: IUserSkill = {
        id: null,
        category: '',
        isCurrent: false,
        name: '',
      };

      this.skillService.addSkill(emptyExperience);
    };

    this.showConfirmationDialog('Add Skill', [`Are you sure you want to add new skill?`], cb);
  }

  private showConfirmationDialog(title: string, messages: string[], cb: Function) {
    const dialogProp = {
      title,
      messages,
      okayLabel: 'Okay',
      noLabel: 'Cancel',
    };

    const dialogRef = this.dialog.open(BinaryConfirmationComponent, {
      data: dialogProp,
    });

    dialogRef.afterClosed().subscribe((isTrue: boolean) => {
      if (isTrue) {
        cb();
      }
    });
  }

  onDeleteSkill(skill: IUserSkill) {
    this.showConfirmationDialog(
      'Delete Skill',
      [`Are you sure you want to delete ${skill.name}?`],
      () => this.skillService.deleteSkill(skill.id),
    );
  }
}
