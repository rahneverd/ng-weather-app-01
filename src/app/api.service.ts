import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWeatherData(city: string) {
    let httpUrl =
      environment.apiUrl +
      `?q=${city}&appid=${environment.apiKey}&units=metric`;

    return this.http.get<string>(httpUrl);
  }
}
