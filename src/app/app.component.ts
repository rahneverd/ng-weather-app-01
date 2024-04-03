import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import * as dummy from '../assets/dummy.json';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void>;

  searchForm: FormGroup = this.fb.group({
    city: [''],
  });
  json: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.json = dummy;
  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      let city = this.searchForm.getRawValue().city;
      this.apiService.getWeatherData(city).subscribe((response) => {
        console.log(response);
        this.json = response;
      });
    }
  }

  //////////////////////ON DESTROY///////////////////////////////////
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
