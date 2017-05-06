import { element } from 'protractor';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TravisService {

  constructor(public http: Http) { }

  public getState(repo: string) {

    return this.http.get(` https://api.travis-ci.org./repos/${repo}/builds`);

  }

}
