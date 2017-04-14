import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent implements OnInit {

  
  @Input() numInvitations;

  constructor() { }

  ngOnInit() {
  }

}
