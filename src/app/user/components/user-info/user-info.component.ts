import { Component, Input } from '@angular/core';
import { Iuser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  @Input() user: Iuser = { name: '', login: '', _id: '' };
}
