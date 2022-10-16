import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
 userInfo:any = {};
 favouriteMovieIds:any[] =[];
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

  getUserProfile(): void {
    this.fetchApiData.getUserInfo().subscribe((resp: any) => {
      this.userInfo=resp;
      return this.userInfo
      });
    }
  
    getUsersFavMoviesIds(): void{
    this.fetchApiData.getusersFavMovies().subscribe((resp:any)=>{
      this.favouriteMovieIds=resp;
      return this.favouriteMovieIds
    })
  }


  getUsersFavMovieDetails(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        resp.map((movie: any)=>{
          if(this.favouriteMovieIds.includes(movie._id)){
            this.userFavMoviesDetails.push(movie)
          }
        })
        return this.userFavMoviesDetails
      });
    }

  
  removeMovieFromFavs(movieId: string): void{
      console.log(movieId);
       this.fetchApiData.deleteMovie(movieId).subscribe((result)=>{
        console.log(result);
        window.location.reload();
        })
    }


    deleteProfile(): void {
      if (
        confirm(
          'Are you sure you want to delete your account? This can\'t be undone.'
        )
      ) {
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

  
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
    width: '280px'
    });
  }

  
  openMoviesRoute(): void {
    this.router.navigate(['movies']);
  }

  openProfileRoute(): void {
    window.location.reload();
    this.router.navigate(['profile']);
  }

  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
