import { PostIt } from './../../../../model/post.it';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'note-extended',
  templateUrl: './note-extended.component.html',
  styleUrls: ['./note-extended.component.scss']
})
export class NoteExtendedComponent implements OnInit {

  constructor() { }

  @Input() note: PostIt;
  @Output() update = new EventEmitter<any>();
  @Output() git = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() load = new EventEmitter<any>();




  public onUpdate() {

    this.update.emit(this.note);
  }

  public onGit() {
    this.git.emit()
  }

  public onClose() {
    this.close.emit();
  }

  public onDelete() {

    this.delete.emit();
  }

  public onLoad() {

    this.load.emit();
  }

  public ngOnInit() {


  }

}
