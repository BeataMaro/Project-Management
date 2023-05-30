import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent {
  @Input() isLoggedIn: boolean = false;
  @Output() logOutUser: EventEmitter<void> = new EventEmitter<void>();

  logOut() {
    this.logOutUser.emit();
  }
}
