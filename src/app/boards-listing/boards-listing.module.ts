import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { boardsReducers } from './store/board/board-reducers';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/board/board-effects';

import { BoardsListingPageComponent } from './pages/boards-listing-page/boards-listing-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { CreateColumnFormComponent } from './components/create-column-form/create-column-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { TaskComponent } from './components/task/task.component';

@NgModule({
  declarations: [
    BoardsListingPageComponent,
    BoardPageComponent,
    CreateColumnFormComponent,
    TasksListComponent,
    CreateTaskFormComponent,
    TaskComponent,
  
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('boards', boardsReducers ),
    EffectsModule.forFeature([BoardsEffects]),
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class BoardsListingModule {}
