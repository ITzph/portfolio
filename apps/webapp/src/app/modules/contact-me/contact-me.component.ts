import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'portfolio-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMeComponent implements OnInit {
  contactDetailsForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private readonly fb: FormBuilder, private readonly emailService: EmailService) {}

  ngOnInit(): void {}

  onSubmitHandler() {
    const formValue = this.contactDetailsForm.value;

    this.emailService.sendContactMeMessage(formValue).subscribe((res) => {
      if (res.result) {
        this.contactDetailsForm.reset();
      }
    });
  }
}
