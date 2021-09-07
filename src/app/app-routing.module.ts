import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobComponent } from './add-job/add-job.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobHistoryComponent } from './job-history/job-history.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', component: JobSearchComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'add-job', component: AddJobComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'job-search', component: JobSearchComponent, canActivate: [AuthGuard]},
  { path: 'job-list', component: JobListComponent, canActivate: [AuthGuard]},
  { path: 'job-description', component: JobDescriptionComponent, canActivate: [AuthGuard]},
  { path: 'job-history', component: JobHistoryComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
