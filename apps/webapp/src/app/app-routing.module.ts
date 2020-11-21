import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { routes } from './routes';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
}),
    NotFoundModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
