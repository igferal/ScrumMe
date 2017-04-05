import { element } from 'protractor';
import { Http } from '@angular/http';
import * as http from 'http';
import { Injectable } from '@angular/core';

@Injectable()
export class TravisService {

  constructor(public http: Http) { }

  public getState() {

    this.http.get(` https://api.travis-ci.org./repos/Arquisoft/Voting_2b/builds`).
      subscribe((res) => {
        console.log(res.json());
      });
  }

}
