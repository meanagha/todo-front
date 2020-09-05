import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private AuthServiceObj: AuthService, private router: Router) { }
  public todo_list;
  public form = {
    name: null
  };
  ngOnInit() {
    this.AuthServiceObj.todo_list().subscribe(
      data => {
        console.log(data);
        this.todo_list = data
        console.log(this.todo_list)
      }
    )
  }
  public success_message;

  Submit(form: NgForm) {
    this.AuthServiceObj.todo_insert(this.form).subscribe(
      data => this.handleSuccess(data, form),
      error => {
        console.log(error)

      }
    )
  }

  handleSuccess(data, form) {
    if (data.status == 200) {
      console.log("success_message")
      this.success_message = "Task inserted successfully";
      form.reset();
      this.ngOnInit();

    }


    setTimeout(function () {
      $(".success_message").show().delay(4000).fadeOut();
    });
  }


  private successDelMessage;
  private errorDelMessage;

  deleteRow(id) {


    if (confirm("Are you sure to delete")) {
      this.AuthServiceObj.todo_delete(id).subscribe(
        data => this.handleDelete(data),
      )

      this.ngOnInit();
    }
    else {


      this.ngOnInit();
    }
  }

  handleDelete(data) {
    if (data.status == true) {
      this.successDelMessage = "Data Deleted succcessfully";
    }
    else {
      this.successDelMessage = "Error in deletion";
      this.ngOnInit();
    }

    setTimeout(function () {
      $(".successDelMessage").show().delay(2000).fadeOut();
    });

  }

}
