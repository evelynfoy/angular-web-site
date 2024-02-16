import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from '../project/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];
  projectNumber: number = 0;
  project: Project;

  constructor() { }

  ngOnInit(): void {
    this.projects[0] = {
      name: 'Recipes',
      description: 'This is a project I built from a starting setup supplied by the angular course I studied - Angular - The Complete Guide (2024 Edition)',
      githubUrl: 'https://github.com/evelynfoy/angular-recipes-app-2024',
    }

    this.projects[1] = {
      name: 'This website',
      description: 'I wrote this website in Angular as a practise site',
      githubUrl: 'https://github.com/evelynfoy/angular-web-site',
    }

    this.projects[2] = {
      name: 'The Cheese and Wine Boutique',
      description: 'The Cheese and Wine Boutique is an e-commerce project implemented in django with full CRUD functionality and a PostgresSQL Database backend. It uses Stripe for payments.',
      githubUrl: 'https://github.com/evelynfoy/the-cheese-and-wine-boutique'
    }

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
