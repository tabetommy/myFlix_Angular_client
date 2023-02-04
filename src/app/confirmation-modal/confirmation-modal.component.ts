import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})

export class ConfirmationModalComponent implements OnInit {

  constructor(
    public fetchApiData: UserRegistrationService,
    private router:Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) { }

  ngOnInit(): void {
  }

  //function to reject delete
  accept():void{
    this.dialogRef.close();
     this.router.navigate(['welcome']).then(() => {
      this.snackBar.open(
        'You have successfully deleted your account!',
        'OK',
        {
          duration: 2000,
        }
      );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
  }

}
