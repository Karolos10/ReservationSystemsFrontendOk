import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  public user = {
    names: '',
    lastName: '',
    phone: '',
    username: '',
    email: '',
    password: ''
  }

  ngOnChanges(cambio: SimpleChanges) {
    console.log(cambio);
  }

  constructor(private userService: ServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formSubmit();

  }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.snackBar.open('username is required', 'Accept', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
      return;
    }

    this.userService.addUser(this.user).subscribe((data) => {
      console.log(data);
      Swal.fire("User successfully saved", "User correctly saved in the database", "success");
    }, (error) => {
      console.log(error);
      this.snackBar.open('An error has occurred ', 'Accept', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      })
    }
    );

  }

}
