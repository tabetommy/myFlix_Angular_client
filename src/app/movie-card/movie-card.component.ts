import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SummaryComponent } from '../summary/summary.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  // favouriteMovieIds:any[] =[];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router:Router,
     ) { }


  ngOnInit(): void {
    this.getMovies();
    // this. getUsersFavMoviesIds();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
      });
    }

  openGenreDialog(name:string, description:string): void{
    this.dialog.open(GenreComponent,{
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    })
  }


  openDirectorDialog(name:string, bio:string): void{
    this.dialog.open(DirectorComponent,{
      data: {
        Name: name,
        Bio: bio,
        
      },
      width: '500px'
    })
  }

    openSummaryDialog(description:string): void{
      this.dialog.open(SummaryComponent,{
        data: {
          Description: description,        
        },
        width: '500px'
      })
    }

    openMoviesRoute(): void {
      this.router.navigate(['movies']);
    }

    openProfileRoute(): void {
      this.router.navigate(['profile']);
    }

    logout(): void{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    }

    // getUsersFavMoviesIds(): void{
    //   this.fetchApiData.getusersFavMovies().subscribe((resp:any)=>{
    //     this.favouriteMovieIds=resp;
    //     return this.favouriteMovieIds
    //   })
    // }

    addToFavMovies(movieId: string): void{
      
        this.fetchApiData.addMovie(movieId).subscribe((result)=>{
          this.ngOnInit();
        }) 
    
        // this.fetchApiData.deleteMovie(movieId).subscribe((result)=>{
        //   this.ngOnInit();
        // })
      }
      
    
}



