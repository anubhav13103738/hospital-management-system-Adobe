import { HospitalData } from './hospital-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

const BACKEND_URL = environment.apiUrl + 'hospitals/';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  private hospitals: HospitalData[] = [];
  private hospitalsUpdated = new Subject<HospitalData[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getHospitals() {
    this.http.get<HospitalData[]>(BACKEND_URL).subscribe((hospitalData) => {
      // console.log(hospitalData);
      this.hospitals = hospitalData;
      this.hospitalsUpdated.next([...this.hospitals]);
    });
  }

  getHospitalUpdateListener() {
    return this.hospitalsUpdated.asObservable();
  }

  addHospital(hospitalData: HospitalData) {
    this.http
      .post<{
        message: string;
        hospital: { _id: string; hospitalname: string; contactnumber: string };
      }>(BACKEND_URL, hospitalData)
      .subscribe((responseData) => {
        // console.log(responseData);
        this.hospitals.push(responseData.hospital);
        this.hospitalsUpdated.next([...this.hospitals]);
      });
  }

  deleteHospital(hospitalId: string): void {
    this.http.delete(BACKEND_URL + hospitalId).subscribe(() => {
      const updatedHospitals = this.hospitals.filter(
        (hospital) => hospital._id !== hospitalId
      );
      this.hospitals = updatedHospitals;
      this.hospitalsUpdated.next([...this.hospitals]);
    });
  }

  getHospital(id: string) {
    return this.http.get<{
      _id: string;
      hospitalname: string;
      contactnumber: string;
    }>(BACKEND_URL + id);
  }

  updateHospital(id: string, hospitalData: HospitalData) {
    this.http.put(BACKEND_URL + id, hospitalData).subscribe((response) => {
      const updatedHospitals = [...this.hospitals];
      const oldHospitalIndex = updatedHospitals.findIndex(
        (p) => p._id === hospitalData._id
      );
      updatedHospitals[oldHospitalIndex] = hospitalData;
      this.hospitals = updatedHospitals;
      this.hospitalsUpdated.next([...this.hospitals]);
    });
  }
}
