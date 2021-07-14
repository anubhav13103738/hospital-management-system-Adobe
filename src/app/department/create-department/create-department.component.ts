import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DepartmentData } from '../department-data.model';
import { formValidation } from '../../validators/form-validation';
import { DepartmentService } from '../department.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css'],
})
export class CreateDepartmentComponent implements OnInit, OnDestroy {
  mode = 'create';
  disableHname = true;
  private departmentId: string;
  private departmentSub: Subscription;
  departments: DepartmentData[] = [];
  hospitalName: string;
  department: DepartmentData;
  constructor(
    public departmentService: DepartmentService,
    public route: ActivatedRoute,
    private router: Router
  ) {}

  remove(form: NgForm) {
    form.resetForm();
  }

  save(form: NgForm) {
    if (!formValidation(form)) {
      return;
    }
    let hName: string;
    if (this.mode === 'create') {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('hospitalName')) {
          hName = paramMap.get('hospitalName');
        }
      });
      const department: DepartmentData = {
        _id: null,
        departmentname: form.value.departmentName,
        head: form.value.HODName,
        contactnumber: form.value.departmentContact,
        hospitalname: hName,
      };
      this.departmentService.addDepartment(department);
      form.resetForm();
    } else {
      const department: DepartmentData = {
        _id: this.departmentId,
        departmentname: form.value.departmentName,
        head: form.value.HODName,
        contactnumber: form.value.departmentContact,
        hospitalname: form.value.hospitalName,
      };
      this.departmentService.updateDepartment(this.departmentId, department);
      form.resetForm();
      this.router.navigate(['/']);
    }
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
      }
      if (paramMap.has('departmentId')) {
        this.mode = 'edit';
        // console.log(this.mode);
        this.disableHname = false;
        this.departmentId = paramMap.get('departmentId');
        this.departmentService
          .getDepartment(this.departmentId)
          .subscribe((departmentData) => {
            this.department = {
              _id: departmentData._id,
              departmentname: departmentData.departmentname,
              head: departmentData.head,
              contactnumber: departmentData.contactnumber,
              hospitalname: departmentData.hospitalname,
            };
          });
      } else {
        this.mode = 'create';
        this.departmentId = null;
      }
    });
  }

  ngOnDestroy() {
    if (this.mode !== 'edit') {
      this.departmentSub.unsubscribe();
    }
  }
}
