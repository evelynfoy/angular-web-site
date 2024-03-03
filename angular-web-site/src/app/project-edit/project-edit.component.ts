import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  error: string;
  isLoggedIn: boolean;

  constructor(private projectService: ProjectsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(projectForm) {
    if (projectForm.valid) {
      if (!this.authService.isAdministrator) {
        const updatedProject = {...projectForm.value};
        updatedProject.name = "Guest:" + updatedProject.name
        updatedProject.description = "Added by guest: " + updatedProject.description
        this.projectService.saveProject(updatedProject);
      }
      else 
        this.projectService.saveProject({...projectForm.value});
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
