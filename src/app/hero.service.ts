import { Injectable } from '@angular/core';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesApiUrl = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';

  private HEROES:Hero[] = [];

  constructor(private http:HttpClient, private messageService:MessageService) { }

  getHeroes(): Observable<Hero[]>{
    this.log('fetched heroes');
    // return of(HEROES);
    const res = this.http.get<Hero[]>(this.heroesApiUrl);
    res.pipe(catchError(this.handleError<Hero[]>('getHeroes', []))).subscribe(heroes => this.HEROES = heroes)
    return res;
  }

  getHero(id: number): Observable<Hero>{
    this.log(`fetched hero id=${id}`);
    return of(this.HEROES.find(hero => hero.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }




}
