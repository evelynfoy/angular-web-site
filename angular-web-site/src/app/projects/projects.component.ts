import { Component, OnInit } from '@angular/core';
import { Project } from '../project/project.model';
import { ProjectService } from './project.sservice';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  projectNumber: number = 0;
  project: Project;

  constructor( private projectService: ProjectService ) { }

  ngOnInit(): void {
    
    this.projects = this.projectService.getProjects();

    this.projectNumber = 0;
    this.project = this.projects[this.projectNumber];
  }

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


}
