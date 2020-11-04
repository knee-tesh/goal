import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEntriesComponent } from './list-entries/list-entries.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';


const routes: Routes = [
  { 
    path : 'list', 
    component : ListEntriesComponent,
  },
  {
    path : '',
    component : SignUpFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
