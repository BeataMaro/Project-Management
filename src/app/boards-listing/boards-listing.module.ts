import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { boardsReducer } from './store/board/board.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './store/board/board.effects';

import { BoardsListingPageComponent } from './pages/boards-listing-page/boards-listing-page.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
// import { CreateColumnFormComponent } from './components/create-column-form/create-column-form.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateTaskFormComponent } from './components/create-task-form/create-task-form.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardTileComponent } from './components/board-tile/board-tile.component';

@NgModule({
  declarations: [
    BoardsListingPageComponent,
    BoardPageComponent,
    ColumnComponent,
    // CreateColumnFormComponent,
    TasksListComponent,
    CreateTaskFormComponent,
    TaskComponent,
    BoardTileComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('boards', boardsReducer),
    EffectsModule.forFeature([BoardsEffects]),
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class BoardsListingModule {}
