import { Component } from '@angular/core';
import { BoardsService } from '../../service/boards.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent {
  createBoardForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(private boardsService: BoardsService, private router: Router) {}

  onCreateNewBoard() {
    this.boardsService
      .createBoard({
        title: this.createBoardForm.value.title,
        owner: localStorage.getItem('user_id')!,
        users: [],
      })
      .subscribe(
        (res) => localStorage.setItem(`board_${res._id}`, res._id!),
        (e) => this.router.navigateByUrl('/error-page'),
        () => this.createBoardForm.setValue({ title: '' })
      );
  }
}
