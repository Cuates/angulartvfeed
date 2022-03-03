import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DisplayDataComponent } from './media/component/display-data/display-data.component';
import { SearchSearchDataComponent } from './media/component/search-data/search-search-data/search-search-data.component';
import { AddDataComponent } from './media/component/add-data/add-data.component';
import { EditSearchDataComponent } from './media/component/edit-data/edit-search-data/edit-search-data.component';
import { AboutComponent } from './media/component/about/about.component';
import { PageNotFoundComponent } from './media/share/component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayDataComponent
  },
  {
    path: 'search',
    component: SearchSearchDataComponent
  },
  {
    path: 'add',
    component: AddDataComponent
  },
  {
    path: 'edit',
    component: EditSearchDataComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  // Wild Card Route for 404 request
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
