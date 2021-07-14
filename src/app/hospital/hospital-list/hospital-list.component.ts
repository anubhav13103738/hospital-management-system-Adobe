import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalData } from '../hospital-data.model';
import { HospitalService } from '../hospital.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
})
export class HospitalListComponent implements OnInit, OnDestroy {
  // hospitals: HospitalData[] = [
  //   { hospitalname: 'KIMS', contactnumber: '9632587410' },
  //   { hospitalname: 'CSI Mission Hospital', contactnumber: '9685321470' },
  // ];
  hospitals: HospitalData[] = [];
  private hospitalSub: Subscription;
  constructor(public hospitalService: HospitalService) {}

  sort() {
    this.hospitals.sort((a, b) => a.hospitalname.localeCompare(b.hospitalname));
  }

  onDelete(hospitalId: string): void {
    this.hospitalService.deleteHospital(hospitalId);
  }

  ngOnInit(): void {
    this.hospitalService.getHospitals();
    this.hospitalSub = this.hospitalService
      .getHospitalUpdateListener()
      .subscribe((hospitals: HospitalData[]) => {
        this.hospitals = hospitals;
      });
  }

  ngOnDestroy(): void {
    this.hospitalSub.unsubscribe();
  }
}
