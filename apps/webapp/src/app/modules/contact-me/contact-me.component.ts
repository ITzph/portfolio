import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { EmailService } from './email.service';
import * as fromProfile from '../../reducers/profile.reducer';
import { getCurrentUser } from '../../selectors/profile.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'portfolio-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMeComponent implements OnInit {
  isContactByEmailVisible = false;

  contactDetailsForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly emailService: EmailService,
    private readonly snackBar: MatSnackBar,
    private readonly profileStore: Store<fromProfile.State>,
  ) {}

  ngOnInit(): void {}

  get socialHandlers$() {
    return this.profileStore.pipe(
      select(getCurrentUser),
      map((user) => {
        return user?.socialHandlers ?? [];
      }),
    );
  }

  onSubmitHandler() {
    const formValue = this.contactDetailsForm.value;

    this.emailService.sendContactMeMessage(formValue).subscribe(
      (res) => {
        if (res.result) {
          this.contactDetailsForm.reset();
          this.isContactByEmailVisible = false;
          this.snackBar.open(res.message, 'success', {
            duration: 2000,
          });
        }
      },
      (err) => {
        this.snackBar.open(err.error.message, 'success', {
          duration: 2000,
        });
      },
    );
  }
}
