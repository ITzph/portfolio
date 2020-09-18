import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import * as fromProfile from '../../reducers/profile.reducer';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './not-found.component';
import { NotFoundModule } from './not-found.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NotFoundModule,
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
