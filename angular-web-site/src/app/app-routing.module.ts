import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthComponent } from './auth/auth.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { AuthGuard } from './auth/auth.guard.';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'projects',  
  children: [
    { path: '', component: ProjectsComponent },
    { path: 'add', component: ProjectEditComponent, canActivate: [AuthGuard] },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  

}


