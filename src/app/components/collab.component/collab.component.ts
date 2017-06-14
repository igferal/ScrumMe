import { InvitationsService } from './../../services/database/invitations.service';
import { Board } from './../../model/board';
import { BoardService } from './../../services/database/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collab',
  templateUrl: './collab.component.html',
  styleUrls: ['./collab.component.scss'],
  providers: []
})
export class CollabComponent implements OnInit {

  public invitations: any[];
  public showInfo = false;

  

  constructor(public boardService: InvitationsService,public invitationsService: InvitationsService) { 
    this.showInfo = true;
  }

  ngOnInit() {

    this.boardService.getInvitationsToCollab().subscribe((invitation) => {

      if (invitation) {

        this.invitations = invitation;
        this.showInfo = true;
        console.log(this.invitations);
      }
    });
  }


  public accept(key: string, board: any) {

    let newColab: Board = new Board(board.name, board.date);
    board.gitHubRepo = this.getRepo(board.gitHubRepo);
    board.travisRepo = this.getRepo(board.travisRepo);

    console.log(board);

    this.invitationsService.acceptColab(key, newColab,board.boardKey);

  }

  public decline(key: string) {

    this.invitationsService.declineCollaboration(key);

  }


  public getRepo(url: string): string {
    if (url !== "") {
      let urlSplitted = url.split('/');
      return `${urlSplitted[urlSplitted.length - 2]}/${urlSplitted[urlSplitted.length - 1]}`;
    }
    else {
      return '';
    }

  }

}
