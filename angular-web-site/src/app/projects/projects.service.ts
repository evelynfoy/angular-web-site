import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Project } from "../project/project.model";
import { Subject, map, tap} from "rxjs";

@Injectable({providedIn: "root" })
export class ProjectsService {

    private projectsArray: Project[] = [];
    projectsChanged = new Subject<Project[]>();

    constructor( private http: HttpClient ) { }

    getProject(id: number) {
        return this.projectsArray[id];
    }

    fetchprojects() {
		return this.http
			.get<{[key: string]: Project}>(
                'https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json'
            )
			.pipe(
                map (responseData => {
                    this.projectsArray = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            this.projectsArray.push({...responseData[key]});
                        }
                    }
                    return this.projectsArray;
                }),
				tap((projects) => {
					this.setProjects(projects);
				})
			);
	}

    getProjects() {
        return this.projectsArray.slice();
      }

    updateProject(project: Project, id:number) {
        this.projectsArray[id] = project;
        this.http
            .put<Project[]>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json', this.projectsArray)
                .subscribe(
                    response => {
                            console.log('Hi');
                    });
        this.projectsChanged.next(this.projectsArray.slice());
    }

    deleteProject(id:number) {
        this.projectsArray.splice(id,1);
        this.http
            .put<Project[]>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json', this.projectsArray)
                .subscribe(
                    response => {
                        this.projectsChanged.next(response.slice())
                    });
        this.projectsChanged.next(this.projectsArray.slice());

    }

    saveProject(project: Project) {
        this.projectsArray.push(project);
        this.projectsChanged.next(this.projectsArray.slice());
        this.http
            .put<Project[]>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json', this.projectsArray)
                .subscribe(
                    response => {
                        this.projectsChanged.next(response.slice())
                    });
    }

    setProjects(newProjects) {
        this.projectsArray = newProjects; 
        this.projectsChanged.next(this.projectsArray.slice());
    }

}