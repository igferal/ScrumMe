import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService {

  private github: string = 'https://api.github.com';

  constructor(private http: Http) {


  }

  getUser(username: string) {
    return this.http
      .get(`https://api.github.com/users/${username}`);
  }

  public getIssues(repo : string, user :string) {

    console.log('Por aqui pasar paso');
    return this.http
      .get(`https://api.github.com/repos/${user}/${repo}/issues`);

  }



}
