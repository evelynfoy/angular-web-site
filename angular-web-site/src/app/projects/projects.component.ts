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
      websiteUrl: 'https://angular-recipes-76bed.web.app/recipes',
      imagePath: 'assets/images/recipes.png'
    }

    this.projects[1] = {
      name: 'This website',
      description: 'I wrote this website in Angular as a practise site',
      githubUrl: 'https://github.com/evelynfoy/angular-web-site',
      websiteUrl: 'https://my-angular-website-730f3.web.app/',
      imagePath: 'assets/images/web-site.png'
    }

    this.projects[2] = {
      name: 'The Cheese and Wine Boutique',
      description: 'The Cheese and Wine Boutique is an e-commerce project implemented in django with full CRUD functionality and a PostgresSQL Database backend. It uses Stripe for payments.',
      githubUrl: 'https://github.com/evelynfoy/the-cheese-and-wine-boutique',
      websiteUrl: 'https://cheese-wine-boutique.onrender.com/',
      imagePath: 'assets/images/cheese-wine.png'
    }

    this.projects[3] = {
      name: 'Animal Hostel',
      description: 'Animal Hostel is a website that enables people to offer a home to a homeless animal. The home page shows photos of the animals currently at the' + 
      'hostel as well as a short description of what the website is about. Users can browse the current occupancy but to make an offer they need to register and log in.' + 
      'Once logged in they can view, edit or delete their offers as well as see the status of the offers. They can also specify whether their interest is in fostering ' +
      'or adopting. The goal of the site is to find owners for these poor unfortunate homeless animals. The administrator can add and maintain the animals and approve' + 
      ' or reject the offers. It is built using Django. It is hosted on render which currently can be very slow to load so please be patient it will load.',
      githubUrl: 'https://github.com/evelynfoy/animal-hostel',
      websiteUrl: 'https://animal-hostel.onrender.com/',
      imagePath: 'assets/images/animal-hostel.png'
    }

    this.projects[4] = {
      name: 'Fun Online Quiz Game',
      description: 'This project is to build a fun Online Quiz game. It should provide entertainment for its audience. It targets all ages' + 
      'who like quizzes. This is a fully responsive quiz game that supplies as many questions as the user decides. It allows' + 
      'them to pick a level and a topic. It has a score tracking system that keeps track of the score as they go through the ' +
      'questions and provides feedback after each question. They can restart the game at any time if they choose to change' + 
      'the topic or level. The game uses an API to get the requested number of questions and the categories available to be selected. https://opentdb.com',
      githubUrl: 'https://github.com/evelynfoy/fun-online-quiz-game',
      websiteUrl: 'https://evelynfoy.github.io/fun-online-quiz-game/',
      imagePath: 'assets/images/fun-online-quiz-game.png'
    }

    this.projects[5] = {
      name: 'Shopping List Compiler',
      description: 'This is a Python command line application which runs in a mock terminal.' + 
      'It compiles a shopping list for cake store orders.' + 
      'The recipes available to order are held on Google Sheets with ingredient quantities required.' +
      'The application takes the days orders and then calculates out the quantity of ingredients required and  ' + 
      'updates the store stock levels that are also held in Google Sheets.',
      githubUrl: 'https://github.com/evelynfoy/shopping-list-compiler',
      websiteUrl: 'https://shopping-list-compiler.onrender.com/',
      imagePath: 'assets/images/shopping-list-compiler.png'
    }

    this.projects[6] = {
      name: 'Southern Cross Equestrian Center',
      description: 'This is a website for a fictional Equestrian Center. It was my first ' + 
      'project for the Professional Diploma in Full Stack Development that I completed in 2022.' + 
      'It is written in HTML and CSS and hosted on github.' +
      'It displays information and images relevant to a riding school and its goal is to advertise the ' + 
      'business and encourage people to get in touch.',
      githubUrl: 'https://github.com/evelynfoy/southern-cross-equestrian-center',
      websiteUrl: 'https://evelynfoy.github.io/southern-cross-equestrian-center/',
      imagePath: 'assets/images/scec-mockup.png'
    }

    this.projects[7] = {
      name: 'My old website',
      description: 'This is a website I wrote previously. It is hosted on Microsoft Azure and contains various projects.', 
      websiteUrl: 'http://evelynsprojects.azurewebsites.net/',
      githubUrl: 'Not on github',
      imagePath: 'assets/images/my-previous-website.png'
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
