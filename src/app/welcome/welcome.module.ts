import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material/material.module';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
})
export class WelcomeModule {}
