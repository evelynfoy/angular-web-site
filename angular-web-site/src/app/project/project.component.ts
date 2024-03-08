import { Component, Input, OnInit } from '@angular/core';
import { Project } from './project.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project : Project;
  @Input() projectNumber : number;
  sub: Subscription;
  isLoggedIn:boolean;
  id: number;

  constructor(private authService: AuthService, private router:Router, private route:ActivatedRoute, private projectService:ProjectsService) { }

  ngOnInit(): void {
    this.sub =  this.authService.loggedIn.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  onEditProject() {
    this.router.navigate([ this.projectNumber ,'edit'], {relativeTo: this.route});
  }

  onDeleteProject() {
    this.projectService.deleteProject(this.projectNumber);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/projects"]);
  }); 
    
  }

  allowEdit() {
    if (!this.isLoggedIn)
      return false
    else 
      if (this.authService.isAdministrator)
        return true
      else
        if (this.project.name.includes('Guest:'))
          return true
        else
          return false
  }
}
