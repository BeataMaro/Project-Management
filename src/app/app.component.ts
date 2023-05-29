import { Component, OnInit } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { Observable, mergeMap } from 'rxjs';
// import { isLoadingSelector } from './boards-listing/store/column/column-selector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // isLoading$: Observable<boolean>;

  // constructor(private store: Store) {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // console.log(`App component isLoading: ${this.isLoading$}`);
  // }

  // ngOnInit(): void {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    // console.log(`App component isLoading: ${this.isLoading$}`);
  // }
}
