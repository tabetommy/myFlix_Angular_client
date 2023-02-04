import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

/**
 * Contains data, state and functions for the user's profile gage
 */
export class ProfilePageComponent implements OnInit {
 userInfo:any = {};
 favouriteMovieIds:any[] =[];// users favourite movies id
 userFavMoviesDetails: any[]=[]


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router:Router,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getUserProfile(),
    this. getUsersFavMoviesIds(),
    this.getUsersFavMovieDetails()
  }


  /**
   * makes api call to get the user's data
   * @returns an object containing users data and assigns it to userInfo variable
   */
  getUserProfile(): void {
    this.fetchApiData.getUserInfo().subscribe((resp: any) => {
      this.userInfo=resp;
      return this.userInfo
      });
    }
  
  /**
   * makes api call to get user's favourite movie ids
   * @returns an array of string ids
   */  
  getUsersFavMoviesIds(): void{
    this.fetchApiData.getusersFavMovies().subscribe((resp:any)=>{
      this.favouriteMovieIds=resp;
      return this.favouriteMovieIds
    })
  }

  /**
   * makes an api call to get all movies,
   * maps over the movies 
   * checks if the movie id is found in the users fovourite movies id array
   * if yes, then movies a pushed into the userFavMovieDetails state
   * @returns an array of movies if the they are found in the users favourite movie ids array
   *  
   */
  getUsersFavMovieDetails(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        resp.map((movie: any)=>{
          if(this.favouriteMovieIds.includes(movie._id)){ //
            this.userFavMoviesDetails.push(movie)
          }
        })
        return this.userFavMoviesDetails
      });
    }

  
  /**
   * makes api call to delete movie from users array of favourite movie ids
   * @param movieId 
   */
  removeMovieFromFavs(movieId: string): void{
      console.log(movieId);
       this.fetchApiData.deleteMovie(movieId).subscribe((result)=>{
        console.log(result);
        window.location.reload();
        })
    }


  /**
   * makes api call to delete user account
   */
  // deleteProfile(): void {
  //     if (
  //       confirm(
  //         'Are you sure you want to delete your account? This can\'t be undone.'
  //       )
  //     ) {
  //       this.router.navigate(['welcome']).then(() => {
  //         this.snackBar.open(
  //           'You have successfully deleted your account!',
  //           'OK',
  //           {
  //             duration: 2000,
  //           }
  //         );
  //       });
  //       this.fetchApiData.deleteUser().subscribe((result) => {
  //         console.log(result);
  //         localStorage.clear();
  //       });
  //     }
  //   }


  deleteProfile(): void {
    this.dialog.open(ConfirmationModalComponent, {
      width: '250px',
    })
        
    }

  /**
   * Opens dialog to box containing form to enter input for editing user's data
   */
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
    width: '280px'
    });
  }

  /**
   * routes app to movies page
   */
  openMoviesRoute(): void {
    this.router.navigate(['movies']);
  }

  /**
   * routes app to user profile page
   */
  openProfileRoute(): void {
    window.location.reload();
    this.router.navigate(['profile']);
  }

  /**
   * logs user out
   */
  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
