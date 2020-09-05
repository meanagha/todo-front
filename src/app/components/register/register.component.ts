import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private AuthServiceObj: AuthService) { }

  ngOnInit() {
  }
  public success_message;
  public error_message;

  public form = {

    password: null,
    cpassword: null,
    username: null
  };
  Submit(form: NgForm) {
    this.AuthServiceObj.register(this.form).subscribe(
      data => this.handleSuccess(data, form),
      error => {
        console.log(error),
          this.handleError(error)
      }
    )
  }
  handleError(error) {

    this.error_message = error.error.message;
    this.form.username = " ";

    setTimeout(function () {
      $(".error_message").show().delay(4000).fadeOut();
    });
  }
  handleSuccess(data, form) {
    if (data.status == 200) {
      console.log("success_message")
      this.success_message = "User registered successfully";
      form.reset();
      this.ngOnInit();

    }
    if (data.status == 401) {
      console.log("success_message")
      this.success_message = "User already Exists";
      form.reset();
      this.ngOnInit();

    }

    setTimeout(function () {
      $(".success_message").show().delay(4000).fadeOut();
    });
  }

}
