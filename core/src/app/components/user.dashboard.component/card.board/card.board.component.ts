import { Router } from '@angular/router';
import { BoardService } from './../../../services/database/board.service';
import { Board } from './../../../model/board';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'board-card',
  templateUrl: './card.board.component.html',
  styleUrls: ['./card.board.component.scss'],
  providers: [BoardService]

})
export class CardBoardComponent implements OnInit {

  @Input() board: Board;

  @Input() boardKey: string;


  constructor(private boardService: BoardService, private router: Router) { }


  /**
   * Metodo que nos redirige al tablero que seleccionamos
   */
  public goToBoard() {

    this.router.navigate(['/board', this.boardKey]);

  }


  public goToBurndown() {

    this.router.navigate(['/burndown', this.boardKey]);
  }
  public goToMyCharts() {

    this.router.navigate(['/taskchart', this.boardKey]);
  }

  /**
   * Metodo que nos borra un tablero del cual se es dueño
   */
  private deleteBoard() {

    this.boardService.deleteBoard(this.boardKey);

  }

  /**
   * Metodo que cancela una colaboración en un tablero
   */
  private stopColaboration(key: string) {

    this.boardService.deleteColaboration(key);
  }




  ngOnInit() {



  }


}
