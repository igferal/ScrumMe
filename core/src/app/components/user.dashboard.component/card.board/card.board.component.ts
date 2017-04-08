import { TravisService } from './../../../services/travis/travis.service';
import { Router } from '@angular/router';
import { BoardService } from './../../../services/database/board.service';
import { Board } from './../../../model/board';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'board-card',
  templateUrl: './card.board.component.html',
  styleUrls: ['./card.board.component.scss'],
  providers: [BoardService, TravisService]

})
export class CardBoardComponent implements OnInit {

  @Input() board: Board;

  @Input() boardKey: string;

  private travisPass: boolean;

  private travisStyles;


  constructor(private boardService: BoardService, private router: Router,
    private travisService: TravisService) { }


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

    if (this.board.travisRepo !== '') {
      this.travisService.getState(this.board.travisRepo).subscribe((res) => {
        this.travisPass = res.json()[0].result === 0;
        if (!this.travisPass) {
          this.travisStyles = {
            'background': 'red'
          }

        }

      });
    }



  }


}
