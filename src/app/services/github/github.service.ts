import { PostIt } from './../../model/post.it';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService {

  private github: string = 'https://api.github.com';
  protected requestOptions: RequestOptions;
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

  public getIssues(repo: string) {


    return this.http.get(`https://api.github.com/repos/${repo}/issues`);

  }

  public authUser() {

    this.requestOptions.headers.set('Authorization', 'Basic ' + btoa('scrummebot' + ':' + 'scrumMeb0t'));
  }

  public postIssue(repo: string, posit: PostIt) {




    let peticion = {
      "title": posit.titulo,
      "body": posit.contenido,
      "repo" : repo
    };

    this.configGithubHeaders();
    this.authUser();
    console.log(this.requestOptions);
    this.http.post("https://us-central1-angularintegration-3b520.cloudfunctions.net/github",peticion).subscribe((res)=>{
      console.log(res);
    });

    //this.http.post(`https://api.github.com/repos/${repo}/issues`, peticion, this.requestOptions).subscribe((res) => {
    //  console.log(res)
    //});

  }




}
