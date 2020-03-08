import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Hero } from "../../features/hero/hero.model";
import { Villain } from 'src/app/features/villain/villain.model';

@Injectable()
export class HttpClientRxJSService {
  heroPath = environment.apiUrlBase + "heroes";
  villainPath = environment.apiUrlBase + "villains";

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroPath);
  }

  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainPath);
  }

  // delete
  deleteHeroById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.heroPath}/${id}`).pipe(
      // TODO: fix
    );
  }

  deleteVillainById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.villainPath}/${id}`).pipe(
      // TODO: fix??
    );
  }

  // post
  postHero(createdHero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroPath, createdHero);
  }

  postVillain(createdVillain: Villain): Observable<Villain> {
    return this.http.post<Villain>(this.villainPath, createdVillain);
  }

  // put
  putHero(updatedHero: Hero): Observable<void> {
    return this.http.put<void>(`${this.heroPath}/${updatedHero.id}`, updatedHero);
  }

  putVillain(updatedVillain: Villain): Observable<void> {
    return this.http.put<void>(`${this.villainPath}/${updatedVillain.id}`, updatedVillain);
  }
}
