import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Project } from "../project/project.model";
import { map } from "rxjs";

@Injectable({providedIn: "root" })

export class ProjectsService {

    constructor( private http: HttpClient ) {}

    getProjects() {
        return this.http.get<{[key: string]: Project}>('https://my-angular-website-730f3-default-rtdb.europe-west1.firebasedatabase.app/projects.json',
        ).pipe(
            map (responseData => {
                const projectsArray: Project[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        projectsArray.push({...responseData[key], id: key});
                    }
                }
                return projectsArray;
            }),
        );
    }
    
}