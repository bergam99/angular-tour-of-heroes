import { Injectable } from '@angular/core';
import { Hero } from '../Ihero';
import { HEROES } from '../mock/mock-heroes';

// Observable은 RxJS 라이브러리가 제공하는 클래스 중 가장 중요한 클래스입니다. RxJS의 of() 함수로 데이터를 즉시 반환해 봅시다
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // "서비스 안에 서비스"가 존재하는 경우는 이렇게 구현합니다. MessageService는 HeroService에 의존성으로 주입되고, HeroService는 다시 HeroesComponent에 의존성으로 주입됩니다.
  constructor(private messageService:MessageService) { }

  // of(HEROES)는 히어로 목 데이터를 Observable<Hero[]> 타입으로 한번에 반환합니다. 이전까지 HeroService.getHeroes 메소드는 Hero[] 타입을 반환했지만 이제는 Observable<Hero[]> 타입을 반환합니다. 그래서 HeroesComponent의 내용을 조금 수정해야 합니다.

  getHeroes():Observable<Hero[]>{
    const heroes = of(HEROES)
    // getHeroes() 메소드에서 히어로 데이터를 받아온 뒤에 메시지를 보내기
    this.messageService.add('HeroService:fetched heroes');
    return heroes;
  }
}
