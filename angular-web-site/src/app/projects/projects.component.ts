import { Component, OnDestroy, OnInit } from '@angular/core';
import { Project } from '../project/project.model';
import { ProjectsService } from './projects.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  projects: Project[] = [];
  projectNumber: number = 0;
  project: Project;
  error = null;
  sub: Subscription;
  subChangedProjects: Subscription;
  isLoggedIn: boolean;

  constructor( private projectsService: ProjectsService, private authService: AuthService, private router:Router, private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    
    this.subChangedProjects = this.projectsService.projectsChanged.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );

    // Get projects and set error message on error
    this.projectsService.getProjects().subscribe({ 
      next: data =>  this.projects = data ,
      error: error => this.error = error.message
      }
    );

    // Subscribe to changes in log in status
    this.sub = this.authService.loggedIn.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
      }
    );

    

    //display first project in array initially
    this.projectNumber = 0;
    this.project = this.projects[this.projectNumber];
  }

  // When a project is selected add the active class
  onSelectProject(num: number) {
    this.projectNumber = num;
    this.project = this.projects[this.projectNumber];
    for (let i=0;i<this.projects.length;i++)
    {
      const listItem = document.getElementById(i.toString());
      listItem.classList.remove('active')
    }
    const listItem = document.getElementById(this.projectNumber.toString());
    listItem.classList.add('active')
  }

  onAddProject() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onHandleError() {
    // Clears error once Close button is clicked
    this.error = null;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe
    this.subChangedProjects.unsubscribe();
  }
}
