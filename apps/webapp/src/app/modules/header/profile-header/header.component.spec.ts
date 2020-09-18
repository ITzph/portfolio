import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from '../header.module';
import { NotFoundModule } from '../../../pages/not-found/not-found.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as fromProfile from '../../../reducers/profile.reducer';
import { StoreModule } from '@ngrx/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderModule,
        NotFoundModule,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    const appRoot = document.createElement('section');
    appRoot.setAttribute('id', 'app-root');
    document.body.appendChild(appRoot);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
