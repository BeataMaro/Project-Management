import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ApiInterceptor } from './interceptors/api.interceptor'; //??
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //!!
import { MaterialModule } from './material/material/material.module'; //!!
import { CreateBoardComponent } from '../boards-listing/pages/create-board-form/create-board.component'; // !!
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ConfirmationDialog } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    CreateBoardComponent,
    NavigationComponent,
    ConfirmationDialog
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorPageComponent,
    CreateBoardComponent,
    NavigationComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ], 
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ], 
})
export class CoreModule {}
