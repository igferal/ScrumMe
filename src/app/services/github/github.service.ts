import { PostIt } from './../../model/post.it';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService {

  private github: string = 'https://api.github.com';
  protected requestOptions: RequestOptions;
  private userName: 'nacho1014';
  private clientId: string = '51f0e2969f345042da1b';
  private clientSecret: string = '7d09dbef2a9035a987a2d65adefb4a1268d331aa';


  constructor(private http: Http) {


  }

  configGithubHeaders() {
    let headers: Headers = new Headers();
    headers.set('Accept', 'application/vnd.github.v3+json');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    this.requestOptions = new RequestOptions({
      headers: headers
    });
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

  public authUser() {

    this.requestOptions.headers.set('Authorization', 'Basic ' + btoa('scrummebot' + ':' + 'scrumMeb0t'));
  }

  public postIssue(repo: string, user: string, posit: PostIt) {


    console.log('post');
    let peticion = {
      "title": posit.titulo,
      "body": posit.contenido
    };

    this.configGithubHeaders();
    this.authUser();
    console.log(this.requestOptions);


    this.http.post(`https://api.github.com/repos/${user}/${repo}/issues`, peticion, this.requestOptions).subscribe((res) => {
      console.log(res)
    });

  }




}
