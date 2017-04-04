import { PostIt } from './../../model/post.it';
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

  public getIssues(repo: string, user: string) {

    console.log('Por aqui pasar paso');
    return this.http
      .get(`https://api.github.com/repos/${user}/${repo}/issues`);

  }

  public postIssue(repo: string, user: string, posit: PostIt) {

    console.log('post');
    let peticion = {
      "title": posit.titulo,
      "body": posit.contenido
    };

    console.log(peticion);

    this.http.post(`https://api.github.com/repos/${user}/${repo}/issues`, peticion).subscribe((res) => {
      console.log(res)
    });

  }



}
