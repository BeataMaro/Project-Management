import { NgModule, inject } from '@angular/core';
import {
  Route,
  Router,
  RouterModule,
  Routes,
  UrlSegment,
} from '@angular/router';

import { WelcomePageComponent } from './welcome/pages/welcome-page/welcome-page.component';
import { CreateBoardComponent } from './boards-listing/pages/create-board-form/create-board.component';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { BoardPageComponent } from './boards-listing/pages/board-page/board-page.component';
import { BoardsListingPageComponent } from './boards-listing/pages/boards-listing-page/boards-listing-page.component';
import { UserLoginPageComponent } from './user-login/pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './user-login/pages/user-signup-page/user-signup-page.component';
import { UserEditPageComponent } from './user-login/pages/user-edit-page/user-edit-page.component';
import { AuthService } from './user-login/service/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomePageComponent },
  {
    path: 'boards',
    loadChildren: () =>
      import('./boards-listing/boards-listing.module').then(
        (m) => m.BoardsListingModule
      ),
    component: BoardsListingPageComponent,
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).token.length
          ? true
          : router.createUrlTree(['']);
      },
    ],
  },
  {
    path: 'boards/:id/columns',
    loadChildren: () =>
      import('./boards-listing/boards-listing.module').then(
        (m) => m.BoardsListingModule
      ),
    component: BoardPageComponent,
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).token.length
          ? true
          : router.createUrlTree(['']);
      },
    ],
  },
  {
    path: 'new-board-form',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    component: CreateBoardComponent,
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).token.length
          ? true
          : router.createUrlTree(['']);
      },
    ],
  },
  {
    path: 'login-form',
    loadChildren: () =>
      import('./user-login/user-login.module').then((m) => m.UserLoginModule),
    component: UserLoginPageComponent,
  },
  {
    path: 'edit-form',
    loadChildren: () =>
      import('./user-login/user-login.module').then((m) => m.UserLoginModule),
    component: UserEditPageComponent,
    canMatch: [
      (route: Route, segments: UrlSegment[]) => {
        const router = inject(Router);
        return inject(AuthService).token.length
          ? true
          : router.createUrlTree(['']);
      },
    ],
  },
  {
    path: 'signup-form',
    loadChildren: () =>
      import('./user-login/user-login.module').then((m) => m.UserLoginModule),
    component: UserSignupPageComponent,
  },

  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
