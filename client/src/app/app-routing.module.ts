import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionnairesComponent } from './components/dashboard/questionnaires/questionnaires.component';
import { ChangePasswordComponent } from './components/dashboard/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, children: [
    { path: '', component: BienvenidaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ] },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: QuestionnairesComponent },
    { path: 'changePassword', component: ChangePasswordComponent }
  ] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
