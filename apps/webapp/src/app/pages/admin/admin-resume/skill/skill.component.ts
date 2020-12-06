import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IUserSkill } from '@portfolio/api-interfaces';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SkillService } from './skill.service';
import { ResumeAdminComponentAbstract } from '../resume-admin-abstract.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'portfolio-admin-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSkillComponent extends ResumeAdminComponentAbstract implements OnInit {
  skills$: Observable<IUserSkill[]> = this.skillService.getElements;

  elementToModify: IUserSkill;

  elementType = 'skill';

  constructor(
    readonly snackbar: MatSnackBar,
    readonly skillService: SkillService,
    private readonly confirmationService: ConfirmationService,
  ) {
    super(skillService, snackbar);
  }

  ngOnInit(): void {}

  onAddNewSkill() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to add a default experience template?',
      key: 'resume-admin-add',
      accept: () => {
        const emptyExperience: IUserSkill = {
          id: null,
          category: '',
          isCurrent: false,
          name: '',
        };

        this.skillService.addElement(emptyExperience);
      },
    });
  }

  onDeleteSkill(skill: IUserSkill) {
    this.confirmationService.confirm({
      key: 'resume-admin',
      message: 'Are you sure that you want to add a default experience template?',
      accept: () => {
        this.skillService.deleteElement(skill.id);
      },
    });
  }
}
