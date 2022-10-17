import { Component, OnInit , Input} from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * This function sends user data to the backend to login user
   */
  loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
   this.dialogRef.close();              // This will close the modal on success!
   localStorage.setItem('user', result.user.Username);
   localStorage.setItem('token', result.token);
   this.snackBar.open(result, 'OK', {
      duration: 2000
   });
   this.router.navigate(['movies']);    //route to movies after succesful authentication
  }, (result) => {
    console.log(result)
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}
