import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from '../department.service';
import { DepartmentData } from '../department-data.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  departments: DepartmentData[] = [];
  private departmentSub: Subscription;
  private hospitalName: string;
  constructor(
    public departmentService: DepartmentService,
    public route: ActivatedRoute
  ) {}

  sort() {
    this.departments.sort((a, b) =>
      a.departmentname.localeCompare(b.departmentname)
    );
  }

  onDelete(departmentId: string): void {
    this.departmentService.deleteDepartment(departmentId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hospitalName')) {
        this.hospitalName = paramMap.get('hospitalName');
        this.departmentService.getDepartmentByHospitalName(this.hospitalName);
        this.departmentSub = this.departmentService
          .getDepartmentUpdateListener()
          .subscribe((departments: DepartmentData[]) => {
            this.departments = departments;
          });
      } else {
        this.departmentService.getDepartments();
        this.departmentSub = this.departmentService
          .getDepartmentUpdateListener()
          .subscribe((departments: DepartmentData[]) => {
            this.departments = departments;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.departmentSub.unsubscribe();
  }
}
