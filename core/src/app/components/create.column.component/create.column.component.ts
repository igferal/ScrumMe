import { ColumnService } from './../../services/database/column.service';
import { BoardColumn } from './../../model/boardColumn';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PostIt } from '../../model/post.it';
import { Router } from '@angular/router';


@Component({
    moduleId: 'createColumn',
    selector: 'createColumn',
    templateUrl: './create.column.component.html',
    styleUrls: ['./create.column.component.scss'],
    providers: [ColumnService]

})


export class CreateColumnComponent implements OnInit {



    @Input() board: any;
    @Output() notify = new EventEmitter<boolean>();
    private name: string;
    @Input() colName: string;
    private action: string;
    @Input() editing: boolean;
    @Input() colKey: string;

    constructor(private columnService: ColumnService, public router: Router) {

    }


    /**
     * Metodo que nos inserta un nuevo postIt en la base de datos, además notifica al 
     * tablero de que la tarea ha sido creada
     */
    public onSubmit() {

        (this.editing) ? this.edit() : this.save();

    }

    private edit() {

        this.columnService.editColumn(`board_columns/${this.board}/${this.colKey}/_columnName`, this.name);

    }


    private save() {

        let colBoard = new BoardColumn(new Array<PostIt>(), this.name);
        this.columnService.saveColumn(this.board, colBoard);
        this.name = '';
        this.notify.emit(false);
    }

    ngOnInit() {

        if (this.colName !== undefined) {
            this.name = this.colName;
            this.action = 'Editar Columna';
        }
        else {
            this.action = 'Crear Columna';
        }


    }

}

