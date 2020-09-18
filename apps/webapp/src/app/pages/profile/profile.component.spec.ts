import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileModule } from './profile.module';
import { StoreModule } from '@ngrx/store';
import * as fromProfile from '../../reducers/profile.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProfileModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
