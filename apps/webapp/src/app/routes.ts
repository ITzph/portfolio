import { Routes } from '@angular/router';
import { CanLoadAuthenticatedGuard } from './guards/can-load-authenticated.guard';
import { CanActivateAuthenticatedGuard } from './guards/can-activate-authenticated.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    pathMatch: 'full',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'profile',
    pathMatch: 'full',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'memes',
    pathMatch: 'full',
    loadChildren: () => import('./pages/memes/memes.module').then((m) => m.MemesModule),
  },
  {
    path: 'resume',
    pathMatch: 'full',
    loadChildren: () => import('./pages/resume/resume.module').then((m) => m.ResumeModule),
  },
  {
    path: 'blogs',
    pathMatch: 'full',
    loadChildren: () => import('./pages/blogs/blogs.module').then((m) => m.BlogsModule),
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
  {
    path: '**',
    component: NotFoundComponent,
  },
];
