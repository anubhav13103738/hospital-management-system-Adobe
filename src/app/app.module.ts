import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateHospitalComponent } from './hospital/create-hospital/create-hospital.component';
import { HospitalListComponent } from './hospital/hospital-list/hospital-list.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { CreateDepartmentComponent } from './department/create-department/create-department.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HospitalViewComponent } from './hospital/hospital-view/hospital-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DepartmentViewComponent } from './department/department-view/department-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateHospitalComponent,
    HospitalListComponent,
    DepartmentListComponent,
    CreateDepartmentComponent,
    HospitalViewComponent,
    HeaderComponent,
    FooterComponent,
    DepartmentViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
