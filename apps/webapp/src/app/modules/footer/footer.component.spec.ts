import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { NotFoundModule } from '../../pages/not-found/not-found.module';

import { FooterComponent } from './footer.component';
import { FooterModule } from './footer.module';
import * as fromProfile from '../../reducers/profile.reducer';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FooterModule,
        NotFoundModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
