import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SummaryComponent } from '../summary/summary.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movies-without-auth',
  templateUrl: './movies-without-auth.component.html',
  styleUrls: ['./movies-without-auth.component.scss']
})
export class MoviesWithoutAuthComponent implements OnInit {

  moviesNoAuth: any[] = []; //contains all movies
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getMoviesNoAuth();
  }

     /**
   * Gets movies data from api without authentication
   * @returns an array of movie objects an assigns it to movie varaible
   */
  getMoviesNoAuth(): void {
    this.fetchApiData.getAllMoviesWithoutAuth().subscribe((resp: any) => {
        this.moviesNoAuth = resp;
        return this.moviesNoAuth;
      });
    }

  /**
   * Opens a dialog to display movie genre
   * @param name 
   * @param description 
   */
  openGenreDialog(name:string, description:string): void{
    this.dialog.open(GenreComponent,{
      data: {
        Name: name,
        Description: description,
      },
      width: '500px' //assign dialog's width
    })
  }

  /**
   * Opens a dialog to display a movie's director
   * @param name 
   * @param bio 
   */
  openDirectorDialog(name:string, bio:string): void{
    this.dialog.open(DirectorComponent,{
      data: {
        Name: name,
        Bio: bio,     
      },
      width: '500px'
    })
  }

  /**
   *Opens a dialog to display a movie's summary 
   * @param description 
   */
  openSummaryDialog(description:string): void{
      this.dialog.open(SummaryComponent,{
        data: {
          Description: description,        
        },
        width: '500px'
      })
    }

    logout():void{
      this.router.navigate(['welcome']); 
    }
}
