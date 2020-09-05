import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClientObj: HttpClient) { }
  private baseUrl = 'http://localhost:5000';

  /** Authentication */
  login(data) {
    console.log(data)
    return this.HttpClientObj.post(`${this.baseUrl}/login`, data)
  }

  register(data) {
    return this.HttpClientObj.post(`${this.baseUrl}/register`, data)
  }

  todo_list() {
    console.log("toto")
    return this.HttpClientObj.get(`${this.baseUrl}/todo_list/`)
  }

  todo_insert(data) {

    return this.HttpClientObj.post(`${this.baseUrl}/todo_insert/`, data)
  }

  todo_delete(id) {
    return this.HttpClientObj.get(`${this.baseUrl}/todo_delete/` + id)
  }

}
