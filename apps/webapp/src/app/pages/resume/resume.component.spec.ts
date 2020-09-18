import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotFoundModule } from '../not-found/not-found.module';

import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { ResumeComponent } from './resume.component';
import { ResumeModule } from './resume.module';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ResumeModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NotFoundModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
