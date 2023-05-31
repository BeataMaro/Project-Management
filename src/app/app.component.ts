import { Component } from '@angular/core';
import { AppStateInterface } from './shared/models/app.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoadingSelector } from './store/selectors/board.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // isLoading$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // console.log(`App component isLoading: ${this.isLoading$.subscribe((res) => res)}`);
  }

  // ngOnInit(): void {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // console.log(`App component isLoading: ${this.isLoading$}`);
  // }
}
