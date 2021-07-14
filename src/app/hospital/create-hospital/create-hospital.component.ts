import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { HospitalData } from '../hospital-data.model';
import { formValidation } from '../../validators/form-validation';
import { HospitalService } from '../hospital.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-create-hospital',
  templateUrl: './create-hospital.component.html',
  styleUrls: ['./create-hospital.component.css'],
})
export class CreateHospitalComponent implements OnInit {
  private mode = 'create';
  private hospitalId: string;
  hospital: HospitalData;

  constructor(
    public hospitalService: HospitalService,
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
    if (this.mode === 'create') {
      const hospital: HospitalData = {
        _id: null,
        hospitalname: form.value.hospitalName,
        contactnumber: form.value.hospitalContact,
      };
      this.hospitalService.addHospital(hospital);
      form.resetForm();
    } else {
      const hospital: HospitalData = {
        _id: this.hospitalId,
        hospitalname: form.value.hospitalName,
        contactnumber: form.value.hospitalContact,
      };
      this.hospitalService.updateHospital(this.hospitalId, hospital);
      form.resetForm();
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hospitalId')) {
        this.mode = 'edit';
        this.hospitalId = paramMap.get('hospitalId');
        this.hospitalService
          .getHospital(this.hospitalId)
          .subscribe((hospitalData) => {
            this.hospital = {
              _id: hospitalData._id,
              hospitalname: hospitalData.hospitalname,
              contactnumber: hospitalData.contactnumber,
            };
          });
      } else {
        this.mode = 'create';
        this.hospitalId = null;
      }
    });
  }
}
