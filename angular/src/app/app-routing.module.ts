import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingersComponent } from './singers/singers.component';
import { AddSingerComponent } from './add-singer/add-singer.component';
import { UpdateSingerComponent } from './update-singer/update-singer.component';
import { SearchByLabelComponent } from './search-by-label/search-by-label.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeLabelsComponent } from './liste-labels/liste-labels.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SingerGuard } from './singer.guard';
import { UsersComponent } from './users/users.component';
import { AddRoleToUserComponent } from './add-role-to-user/add-role-to-user.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'singers', component: SingersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'searchByLabel', component: SearchByLabelComponent },
  { path: 'rechercheParNom', component: RechercheParNomComponent },
  { path: 'listeLabels', component: ListeLabelsComponent },
  {
    path: 'add-role-to-user/:id',
    component: AddRoleToUserComponent,
    canActivate: [SingerGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add-singer',
    component: AddSingerComponent,
    canActivate: [SingerGuard],
  },
  {
    path: 'updateSinger/:id',
    component: UpdateSingerComponent,
    canActivate: [SingerGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  { path: '', redirectTo: 'singers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
