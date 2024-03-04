import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Project } from '../project/project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  error: string;
  isLoggedIn: boolean;
  editMode = false;
  sub: Subscription;
  id: number;
  project: Project;
  defaultName:string = "";
  defaultDescription:string = "";
  defaultImageUrl:string = "";
  defaultGithub:string = "";
  defaultWebsite:string = "";

  constructor(private projectService: ProjectsService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = this.id != null && !isNaN(this.id);
        this.populateForm();
      }
    );
  }

  private populateForm() {

    if (this.editMode) {
      const project = this.projectService.getProject(this.id);
      this.defaultName = project.name;
      this.defaultDescription = project.description;
      this.defaultImageUrl = project.imagePath;
      this.defaultGithub = project.githubUrl;
      this.defaultWebsite = project.websiteUrl;
    }
  }

  onSubmit(form: NgForm) {

    if (form.valid) {
      const projectDetails = {...form.value};
      if (!this.authService.isAdministrator) {
        // Mark projects added by Guests to identify them
        if (!projectDetails.name.includes('Guest:')) 
          projectDetails.name = "Guest:" + projectDetails.name;
        if (!projectDetails.description.includes('Added by guest:')) 
          projectDetails.description = "Added by guest: " + projectDetails.description;
      }
      if (this.editMode) {
        this.projectService.updateProject(projectDetails, this.id);
      }
      else {
          this.projectService.saveProject(projectDetails);
        }
      }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo:this.route});
  //   if (this.editMode)
  //     this.router.navigate(['../../'], {relativeTo:this.route});
  //   else
  //     this.router.navigate(['../'], {relativeTo:this.route});
  }
}
