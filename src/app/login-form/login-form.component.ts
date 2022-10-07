import { Component, OnInit , Input} from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserRegistrationService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    console.log('Jesus')
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   console.log(result)
   this.snackBar.open(result, 'OK', {
      duration: 2000
   });
  }, (result) => {
    console.log(result)
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}
