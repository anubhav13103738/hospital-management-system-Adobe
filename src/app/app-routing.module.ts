import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HospitalViewComponent } from './hospital/hospital-view/hospital-view.component';
import { DepartmentViewComponent } from './department/department-view/department-view.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { CreateHospitalComponent } from './hospital/create-hospital/create-hospital.component';

const routes: Routes = [
  { path: '', component: HospitalViewComponent },
  { path: 'departments', component: DepartmentViewComponent },
  { path: 'departments/:hospitalName', component: DepartmentViewComponent },
  {
    path: 'departments/edit/:departmentId',
    component: CreateDepartmentComponent,
  },
  { path: 'hospitals/edit/:hospitalId', component: CreateHospitalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
