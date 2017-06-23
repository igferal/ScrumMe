
import { PostIt } from './../../model/post.it';
import { TaskService } from './../../services/database/task.service';
import { Issue } from './../../model/issue';
import { GithubService } from './../../services/github/github.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'github-issues',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  providers: [GithubService]
})
export class GithubComponent implements OnInit, OnChanges{

  public issues: Array<any> = [];
  @Input() board: string;
  @Input() column: string;
  @Input() gitHubRepo: string;




  constructor(private githubService: GithubService, private taskService: TaskService) { }


  //-KgKGLrLVjzvJzpHHmIg

  onclick(issue: Issue) {

    if(!issue.assignee){
      issue.assignee ="";
    }
    if(!issue.body){
      issue.body ="";
    }
    if(!issue.title){
      issue.title ="";
    }
    
    
    let task: PostIt = new PostIt(issue.title, issue.body, issue.assignee, 1, 'none');
    this.taskService.saveTask(this.column, this.board, task);
  }


  public getIssues(){

     if (this.gitHubRepo) {

      this.githubService.getIssues(this.gitHubRepo).map((r) => r.json())
        .subscribe((res: Array<any>) => {
          res.forEach((each) => {

            this.issues.push(new Issue(each));
          });
        });
    }
  }

  ngOnChanges() {
    
    this.getIssues();
    
  }

  ngOnInit() {

   this.getIssues();

  }



}
