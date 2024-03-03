import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  error: string;
  isLoggedIn: boolean;

  constructor(private projectService: ProjectsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(projectForm) {
    console.log(projectForm);
    if (projectForm.valid) {
      this.projectService.saveProject({...projectForm.value});
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
