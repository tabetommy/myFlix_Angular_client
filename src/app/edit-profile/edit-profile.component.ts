import { Component, OnInit,Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password:'', Email: '', Birthday:''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
editUserData(): void {
  this.fetchApiData.editUserInfo(this.userData).subscribe((result) => {
// Logic for a successful user registration goes here! (To be implemented)
   this.dialogRef.close(); // This will close the modal on success!
   console.log(result)
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   localStorage.setItem('user', result.user.Username);
   localStorage.setItem('token', result.token);
   window.location.reload()
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
