import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MockupsListComponent } from './components/mockups-list/mockups-list.component';

const routes: Routes = [
  { path: '', component: MockupsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
