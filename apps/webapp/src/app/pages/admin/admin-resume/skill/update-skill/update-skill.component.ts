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
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SkillService } from '../skill.service';

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

  filterValue = '';

  results: string[];

  constructor(private readonly fb: FormBuilder, private readonly skillService: SkillService) {}

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

  search(event) {
    this.filterValue = event.query;
  }

  get filteredOptions$(): Observable<string[]> {
    return this.skillService.getElements.pipe(
      map((skills) => {
        return skills
          .reduce((acc, curr): string[] => {
            return !!curr.category && !acc.includes(curr.category) ? [...acc, curr.category] : acc;
          }, [])
          .filter((skill: string) => {
            return !!this.filterValue
              ? skill.toLowerCase().includes(this.filterValue.toLowerCase())
              : true;
          });
      }),
    );
  }

  onSkillUpdate() {
    const { name, category, current } = this.skillFormGroup.value;

    const callback = () => {
      this.skillFormGroup.reset();
      this.update.emit();
    };

    const updatedSkill: Partial<IUserSkill> = {
      name,
      category,
      isCurrent: current,
      id: this.skill.id,
    };

    this.skillService.updateElement(this.skill.id, updatedSkill, callback);
  }
}
