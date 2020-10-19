import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'portfolio-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateSkillComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();

  skillFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    current: [false],
    link: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {}

  onCancel() {
    this.closed.emit();
  }

  onSkillUpdate() {
    const { name, category, current, link } = this.skillFormGroup.value;
  }
}
