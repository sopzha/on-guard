import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapFullComponent } from './map-full/map-full.component';
import { MapSelectComponent } from './map-select/map-select.component';

const routes: Routes = [
  { path: '', component: MapFullComponent },
  { path: 'select', component: MapSelectComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }