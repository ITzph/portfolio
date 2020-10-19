import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserSkill } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSkillComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  @Input() skill: IUserSkill;

  @Output() update = new EventEmitter<void>();

  skillFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    current: [false],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.skillFormGroup.setValue({
      name: this.skill.name,
      category: this.skill.category,
      current: this.skill.isCurrent,
    });
  }

  onCancel() {
    this.closed.emit();
  }

  onSkillUpdate() {
    const { name, category, current } = this.skillFormGroup.value;

    this.update.emit();
  }
}
