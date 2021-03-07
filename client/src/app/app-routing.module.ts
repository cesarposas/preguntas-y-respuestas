import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidaComponent } from './components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/inicio/login/login.component';
import { RegisterComponent } from './components/inicio/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangePasswordComponent } from './components/dashboard/change-password/change-password.component';
import { NewQuestionnaireComponent } from './components/dashboard/questionnaires/new-questionnaire/new-questionnaire.component';
import { StepOneComponent } from './components/dashboard/questionnaires/new-questionnaire/step-one/step-one.component';
import { StepTwoComponent } from './components/dashboard/questionnaires/new-questionnaire/step-two/step-two.component';
import { QuestionnairesComponent } from './components/dashboard/questionnaires/questionnaires.component';


//Declarar que un componente es hijo de otro en las rutas
//es importante para que los router-outlet sepan qué html deben coger
const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, children: [
    { path: '', component: BienvenidaComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
  ] },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: QuestionnairesComponent },
    { path: 'changePassword', component: ChangePasswordComponent },
    {path: 'new-questionnaire', component: NewQuestionnaireComponent, children:[
      {path: 'step-one', component: StepOneComponent},
      {path: 'step-two', component: StepTwoComponent}
    ]}
  ] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
