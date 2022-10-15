import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cataflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  //making api call for the login endpoint
  public userLogin(userCredentials : any): Observable<any>{
    console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials)
    .pipe(catchError(this.handleError))
  }
  

  //making api call to get all movies
 getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
 //making api call to get a single movie
  getSingleMovie(title : any):Observable<any>{
    const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `movies/${title}`,{headers: new HttpHeaders(
          {Authorization: 'Bearer ' + token})
      }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }


   //making api call to get info about movie director
  getMovieDirector(directorName : any):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${directorName}`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }


  //making api cal to get info about movie genre
  getMovieGenre(genreName : any):Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genreName}`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to get info about a user
  getUserInfo():Observable<any>{
    const token = localStorage.getItem('token');
    const username= localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to add movie to list of favourites 
  addMovie(MovieID:any):Observable<any>{
    const token = localStorage.getItem('token');
    const username= localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}/movies/${MovieID}`,null,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to get users list of favourite movies
  getusersFavMovies():Observable<any>{
    const token = localStorage.getItem('token');
    const username= localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/movies`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to delete user info
  deleteUser():Observable<any>{
    const token = localStorage.getItem('token');
    const username= localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to delete movie from user's list of favourites
  deleteMovie(MovieID:any):Observable<any>{
     const token = localStorage.getItem('token');
     const username= localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}/movies/${MovieID}`,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})})
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }

  //making api call to edit user's info
  editUserInfo(userDetails:any):Observable<any>{
     const token = localStorage.getItem('token');
     const username= localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`,userDetails,
      {headers:new HttpHeaders({Authorization: 'Bearer ' + token})
    }
    )
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
      )
  }




// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
