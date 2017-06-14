import { PostIt } from './../../model/post.it';
export interface IGitHubService{

getIssues(repo: string);

postIssue(repo: string, posit: PostIt);


}