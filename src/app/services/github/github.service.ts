import { IGitHubService } from './IGitHubService';
import { AngularFireDatabase } from 'angularfire2/database';
import { PostIt } from './../../model/post.it';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GithubService implements IGitHubService{

  private github: string = 'https://api.github.com';
  protected requestOptions: RequestOptions;
  private clientId: string = '51f0e2969f345042da1b';
  private clientSecret: string = '7d09dbef2a9035a987a2d65adefb4a1268d331aa';
  private basic: string;

  constructor(private http: Http, private angulardb: AngularFireDatabase) {

    let suscription = this.angulardb.object("basic").subscribe((value) => {
      this.basic = value.$value;
    });

  }

  private configGithubHeaders() {
    let headers: Headers = new Headers();
    headers.set('Accept', 'application/vnd.github.v3+json');
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    this.requestOptions = new RequestOptions({
      headers: headers
    });
  }

  public getIssues(repo: string) {

    return this.http
      .get(`https://api.github.com/repos/${repo}/issues`);

  }

   public postIssue(repo: string, posit: PostIt) {


    let peticion = {
      "title": posit.titulo,
      "body": posit.contenido
    };

    this.configGithubHeaders();
    this.authUser();
    this.http.post(`https://api.github.com/repos/${repo}/issues`, peticion, this.requestOptions).subscribe((res) => {
      console.log(res)
    });

  }



  private authUser() {

    this.requestOptions.headers.set('Authorization', 'Basic ' + this.basic);
  }

 



}
