import { TravisService } from './../../../services/travis/travis.service';
import { Router } from '@angular/router';
import { BoardService } from './../../../services/database/board.service';
import { Board } from './../../../model/board';
import { Component, OnInit, Input } from '@angular/core';
import { DestroySubscribers } from "../../../util/unsuscribe.decorator";

@Component({
  selector: 'board-card',
  templateUrl: './card.board.component.html',
  styleUrls: ['./card.board.component.scss'],
  providers: [BoardService]

})
@DestroySubscribers()
export class CardBoardComponent implements OnInit {

  @Input() board: Board;

  @Input() boardKey: string;

  private travisPass: boolean;

  private travisBgStyles;

  private travisColorStyles;

  private showModal: boolean;

  private showModalColabs: boolean;

  private gitRepoUrl: string;

  private travisRepoUrl: string;

  private mailsToColab: string;

  public subscribers: any = {};



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

    this.boardService.deleteBoard(this.boardKey, this.board.owner);

  }

  /**
   * Metodo que cancela una colaboración en un tablero
   */
  private stopColaboration(key: string) {

    this.boardService.deleteColaboration(key,this.board.owner);
  }


  private showDialog() {
    this.showModal = true;
  }

  private closeDialog() {
    this.showModal = false;
  }

  private showDialogColabs() {
    this.showModalColabs = true;
  }

  private closeDialogColabs() {
    this.showModalColabs = false;
  }

  private addColabs() {
    console.log(this.mailsToColab);
    let splitted: string[];

    if (this.mailsToColab.length > 0) {
      splitted = this.mailsToColab.split(",");
      this.boardService.addColaborators(splitted, this.board, this.boardKey);
    }

    this.mailsToColab = '';
    this.closeDialogColabs();
  }


  private configureTravis() {

    if (this.board.travisRepo !== '') {
      this.subscribers.subscription = this.travisService.getState(this.board.travisRepo).subscribe((res) => {
        this.travisPass = res.json()[2].result === 0;
        if (!this.travisPass) {
          this.travisBgStyles = {
            'background': '#E04A1B'
          };

          this.travisColorStyles = {
            'color': '#E04A1B'
          }

        }
      });
    }

  }

  ngOnInit() {

    this.gitRepoUrl = `https://github.com/${this.board.gitHubRepo}`;
    this.travisRepoUrl = `https://travis-ci.org/${this.board.travisRepo}`;
    this.configureTravis();

  }


}
