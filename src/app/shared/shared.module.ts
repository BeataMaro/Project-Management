import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; //!!


@NgModule({
  declarations: [],
  exports: [HttpClientModule],
  imports: [CommonModule],
})
export class SharedModule {}
