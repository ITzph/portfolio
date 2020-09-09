import { Routes } from '@angular/router';
import { CanLoadAuthenticatedGuard } from './guards/can-load-authenticated.guard';
import { CanActivateAuthenticatedGuard } from './guards/can-activate-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'memes',
    loadChildren: () => import('./pages/memes/memes.module').then((m) => m.MemesModule),
  },
  {
    path: 'resume',
    loadChildren: () => import('./pages/resume/resume.module').then((m) => m.ResumeModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canLoad: [CanLoadAuthenticatedGuard],
    canActivate: [CanActivateAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: '/profile',
    pathMatch: 'full',
  },
];
