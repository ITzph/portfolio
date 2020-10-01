import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

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

  constructor(private readonly fb: FormBuilder, private readonly http: HttpClient) {}

  ngOnInit(): void {}

  onSubmitHandler() {
    const formValue = this.contactDetailsForm.value;

    this.http.post(environment.api + '/email', formValue).subscribe((res) => {});
  }
}
