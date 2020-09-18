import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SvgIconRegistryService, SvgLoader } from 'angular-svg-icon';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthModule } from './auth.module';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
      providers: [
        { provide: SvgIconRegistryService, useValue: { loadSvg: () => of(null) } },
        { provide: SvgLoader, useValue: { getSvg: () => null } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
