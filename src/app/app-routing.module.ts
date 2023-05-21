import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome/pages/welcome-page/welcome-page.component';
import { CreateBoardComponent } from './boards-listing/pages/create-board-form/create-board.component';
import { UserGuard } from './core/guards/user.guard';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { BoardPageComponent } from './boards-listing/pages/board-page/board-page.component';
import { BoardsListingPageComponent } from './boards-listing/pages/boards-listing-page/boards-listing-page.component';
import { UserLoginPageComponent } from './user-login/pages/user-login-page/user-login-page.component';
import { UserSignupPageComponent } from './user-login/pages/user-signup-page/user-signup-page.component';
import { UserEditPageComponent } from './user-login/pages/user-edit-page/user-edit-page.component';

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
  },
  {
    path: 'boards/:id/columns',
    loadChildren: () =>
      import('./boards-listing/boards-listing.module').then(
        (m) => m.BoardsListingModule
      ),
    component: BoardPageComponent,
  },
  {
    path: 'new-board-form',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
    component: CreateBoardComponent,
    canActivate: [UserGuard],
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
  // providers: [],
})
export class AppRoutingModule {}
