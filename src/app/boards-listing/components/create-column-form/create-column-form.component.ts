import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-column-form',
  templateUrl: './create-column-form.component.html',
  styleUrls: ['./create-column-form.component.scss'],
})
export class CreateColumnFormComponent {
  title = new FormControl('', [Validators.required]);

  constructor(private store: Store) {}

  createColumn() {}
}
