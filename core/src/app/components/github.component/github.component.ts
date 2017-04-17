
import { PostIt } from './../../model/post.it';
import { TaskService } from './../../services/database/task.service';
import { Issue } from './../../model/issue';
import { GithubService } from './../../services/github/github.service';
import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'github-issues',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss'],
  providers: [GithubService, TaskService]
})
export class GithubComponent implements OnInit {

  public issues: Array<any> = [];
  @Input() board: string;
  @Input() column: string;



  constructor(private githubService: GithubService, private taskService: TaskService) { }


  //-KgKGLrLVjzvJzpHHmIg

  onclick(issue: Issue) {

    let task: PostIt = new PostIt(issue.title, issue.body, issue.assignee, 1, 'none');
    this.taskService.saveTask(this.column, this.board, task);
  }



  ngOnInit() {

    this.githubService.getIssues('scrumme', 'nacho1014').map((r) => r.json())
      .subscribe((res: Array<any>) => {
        res.forEach((each) => {

          this.issues.push(new Issue(each));
        });
      });


  }



}
