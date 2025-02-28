import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockupsListComponent } from './components/mockups-list/mockups-list.component';
import { MockupComponent } from './components/mockup/mockup.component';

const routes: Routes = [
  { path: '', component: MockupsListComponent },
  { path: 'mockup/:id', component: MockupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
