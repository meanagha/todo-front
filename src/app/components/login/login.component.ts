import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthServiceObj: AuthService, private router: Router) { }

  public error_message;
  public token;
  public id;

  ngOnInit() {
  }
  public form = {
    username: null,
    password: null
  };
  Submit() {
    console.log(this.form);
    this.AuthServiceObj.login(this.form).subscribe(
      data => this.handleSuccess(data)
    )
  }
  handleSuccess(data) {

    if (data.isAuthenticated == true) {
      this.token = data.user.token;
      this.id = data.user._id;

      localStorage.setItem('access_token', JSON.stringify(this.token));
      localStorage.setItem('_id', this.id);
      this.router.navigateByUrl('/todo')
    }
    else {

      this.error_message = "Please Enter Valid Credencials"

    }

  }


}
