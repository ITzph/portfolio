import { formatDate } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserCertification } from '@portfolio/api-interfaces';
import { CertificationService } from '../certification.service';

@Component({
  selector: 'portfolio-update-certification',
  templateUrl: './update-certification.component.html',
  styleUrls: ['./update-certification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateCertificationComponent implements OnInit {
  @Input() certification: IUserCertification;

  @Output() closed = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly certificationService: CertificationService,
  ) {}

  certificationFormGroup = this.fb.group({
    name: ['', [Validators.required]],
    dateAcquired: ['', [Validators.required]],
    description: ['', [Validators.required]],
    provider: ['', [Validators.required]],
    url: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const { name, dateAcquired, description, provider, url } = this.certification;
    this.certificationFormGroup.setValue({
      name,
      dateAcquired,
      description,
      provider,
      url,
    });
  }

  onCancel() {
    this.closed.emit();
  }

  onCertificationUpdate() {
    if (this.certificationFormGroup.valid) {
      const { certification } = this;
      const { name, dateAcquired, description, provider, url } = this.certificationFormGroup.value;

      const updatedExperience: Partial<IUserCertification> = {
        name,
        id: certification.id,
        dateAcquired: formatDate(dateAcquired, 'yyyy-MM-dd', 'sg'),
        description,
        provider,
        url,
      };

      const callback = () => {
        this.certificationFormGroup.reset();
        this.update.emit();
      };

      this.certificationService.updateElement(certification.id, updatedExperience, callback);
    }
  }
}
