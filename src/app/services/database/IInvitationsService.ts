import { FirebaseListObservable } from 'angularfire2/database';
import { BoardColumn } from './../../model/boardColumn';
export interface IInvitationsService {


    declineCollaboration(collabKey: string);

    acceptColab(collabKey: string, board: any, boardKey: string);

    getInvitationsToCollab(): FirebaseListObservable<any>;


}