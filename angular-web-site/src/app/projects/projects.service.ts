import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Project } from "../project/project.model";
import { Subject, map} from "rxjs";

@Injectable({providedIn: "root" })

export class ProjectsService {

    private projectsArray: Project[] = [];
    projectsChanged = new Subject<Project[]>();

    constructor( private http: HttpClient ) {}

    getProjects() {
        return this.http.get<{[key: string]: Project}>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json',
        ).pipe(
            map (responseData => {
                this.projectsArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        this.projectsArray.push({...responseData[key]});
                    }
                }
                return this.projectsArray;
            })
        );
    }

    saveProject(project: Project) {

        this.projectsArray.push(project);
        this.http
            .put<Project[]>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json', this.projectsArray)
                .subscribe(
                    response => {
                        this.projectsChanged.next(response.slice())
                    });
    }

}