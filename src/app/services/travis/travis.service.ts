import { ITravisService } from './ITravisService';
import { element } from 'protractor';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TravisService implements ITravisService {

  constructor(public http: Http) { }

  public getState(repo: string) {

    return this.http.get(` https://api.travis-ci.org./repos/${repo}/builds`);

  }

}
