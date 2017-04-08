import { element } from 'protractor';
import { Http } from '@angular/http';
import * as http from 'http';
import { Injectable } from '@angular/core';

@Injectable()
export class TravisService {

  constructor(public http: Http) { }

  public getState(): boolean {

    let result = true;
    this.http.get(` https://api.travis-ci.org./repos/Arquisoft/Voting_2b/builds`).
      subscribe((res) => {
        if (res.json()[0].result === 0) {
          result = true;
        } else {
          result = false;
        }

      });
      console.log(result);
    return result;
  }

}
