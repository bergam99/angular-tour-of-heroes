import { Injectable } from '@angular/core';
import { Hero } from '../Ihero';
import { HEROES } from '../mock/mock-heroes';

// Observable은 RxJS 라이브러리가 제공하는 클래스 중 가장 중요한 클래스입니다. RxJS의 of() 함수로 데이터를 즉시 반환해 봅시다
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용

  // "서비스 안에 서비스"가 존재하는 경우는 이렇게 구현합니다. MessageService는 HeroService에 의존성으로 주입되고, HeroService는 다시 HeroesComponent에 의존성으로 주입됩니다.
  constructor(private http: HttpClient, private messageService:MessageService) { }

  // of(HEROES)는 히어로 목 데이터를 Observable<Hero[]> 타입으로 한번에 반환합니다. 이전까지 HeroService.getHeroes 메소드는 Hero[] 타입을 반환했지만 이제는 Observable<Hero[]> 타입을 반환합니다. 그래서 HeroesComponent의 내용을 조금 수정해야 합니다.

  // 옵저버블로 받은 데이터를 pipe() 메소드로 확장하고 이 파이프에 catchError() 연산자를 연결합니다.
/** GET: 서버에서 히어로 목록 가져오기 */
getHeroes(): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
}
  /**
 * HTTP 요청이 실패한 경우를 처리합니다.
 * 애플리케이션 로직 흐름은 그대로 유지됩니다.
 *
 * @param operation - 실패한 동작의 이름
 * @param result - 기본값으로 반환할 객체
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: 리모트 서버로 에러 메시지 보내기
    console.error(error); // 지금은 콘솔에 로그를 출력합니다.

    // TODO: 사용자가 이해할 수 있는 형태로 변환하기
    this.log(`${operation} failed: ${error.message}`);

    // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
    return of(result as T);
  };
}

/** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/** PUT: 서버에 저장된 히어로 데이터를 변경합니다. */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

/** POST: 서버에 새로운 히어로를 추가합니다. */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

/** DELETE: 서버에서 히어로를 제거합니다. */
deleteHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

/* GET: 입력된 문구가 이름에 포함된 히어로 목록을 반환합니다. */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // 입력된 내용이 없으면 빈 배열을 반환합니다.
    return of([]);
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
  /** HeroService에서 보내는 메시지는 MessageService가 화면에 표시합니다. */
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
}
}
