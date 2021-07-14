import { DepartmentData } from './department-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + 'departments/';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private departments: DepartmentData[] = [];
  private departmentsUpdated = new Subject<DepartmentData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getDepartments() {
    this.http.get<DepartmentData[]>(BACKEND_URL).subscribe((departmentData) => {
      // console.log(departmentData);
      this.departments = departmentData;
      this.departmentsUpdated.next([...this.departments]);
    });
  }

  getDepartmentByHospitalName(hospitalName: string) {
    return this.http
      .get<
        {
          _id: string;
          departmentname: string;
          head: string;
          contactnumber: string;
          hospitalname: string;
        }[]
      >(BACKEND_URL + 'hospital/' + hospitalName)
      .subscribe((departmentData) => {
        this.departments = departmentData;
        this.departmentsUpdated.next([...this.departments]);
      });
  }

  getDepartmentUpdateListener() {
    return this.departmentsUpdated.asObservable();
  }

  addDepartment(department: DepartmentData) {
    this.http
      .post<{
        message: string;
        department: {
          _id: string;
          departmentname: string;
          contactnumber: string;
          head: string;
          hospitalname: string;
        };
      }>(BACKEND_URL, department)
      .subscribe((responseData) => {
        // console.log(responseData.department);
        this.departments.push(responseData.department);
        this.departmentsUpdated.next([...this.departments]);
      });
  }

  deleteDepartment(departmentId: string): void {
    this.http.delete(BACKEND_URL + departmentId).subscribe(() => {
      const updatedDepartments = this.departments.filter(
        (department) => department._id !== departmentId
      );
      this.departments = updatedDepartments;
      this.departmentsUpdated.next([...this.departments]);
    });
  }

  getDepartment(id: string) {
    return this.http.get<{
      _id: string;
      departmentname: string;
      head: string;
      contactnumber: string;
      hospitalname: string;
    }>(BACKEND_URL + id);
  }

  updateDepartment(id: string, departmentData: DepartmentData) {
    // console.log('id', id);
    // console.log('dd', departmentData);
    this.http.put(BACKEND_URL + id, departmentData).subscribe((response) => {
      const updatedDepartments = [...this.departments];
      const oldDepartmentIndex = updatedDepartments.findIndex(
        (p) => p._id === departmentData._id
      );
      updatedDepartments[oldDepartmentIndex] = departmentData;
      this.departments = updatedDepartments;
      this.departmentsUpdated.next([...this.departments]);
    });
  }
}
