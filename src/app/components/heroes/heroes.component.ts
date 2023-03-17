import { Component } from '@angular/core';
import { Hero } from 'src/app/Ihero';
import { HEROES } from 'src/app/mock/mock-heroes';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  // 부모 컴포넌트의 템플릿에 사용합니다. 쓰면 자동으로 부모가 되는 것임!
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})



export class HeroesComponent {


  // 클래스에 heroes 프로퍼티를 선언하고 위에서 로드한 HEROES 배열을 바인딩합니다.
  // heroes = HEROES;
  heroes:Hero[]=[];

  selectedHero?: Hero;



  // observable을 반횐히게 시켜보자. Angular 가 제공하는 HttpClient.get 메소드는 Observable 을 반환하기 때문에 이렇게 하는 게 진짜 앱이 동작하는 것 과 같다.
  // 서버의 응답이 언제 도착하는지와 관계없이, 이 응답이 도착했을 때 subscribe가 서버에서 받은 응답을 콜백 함수로 전달하고, 컴포넌트는 이렇게 받은 히어로 데이터를 heroes 프로퍼티에 할당합니다. HeroService가 실제로 서버에 요청을 보낸다면 이렇게 비동기 방식으로 구현해야 제대로 동작합니다.
  getHeroes():void{
    this.HeroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.HeroService.getHeroes()
    // .subscribe(heroes => this.heroes = heroes);
    }

  constructor(
    private HeroService:HeroService,
    private messageService: MessageService
    ) { }


  // getHeroes() 함수는 ngOnInit 라이프싸이클 후킹 함수에서 실행하는 것이 좋습니다. ngOnInit() 함수는 Angular가 HeroesComponent의 인스턴스를 생성한 직후에 실행되는 함수입니다.
  ngOnInit():void{
    this.getHeroes();
  }


  // 어떤 히어로 선택했는지 기록 남기기
  onSelect(hero:Hero):void{
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent:Selected hero id=${hero.id}`);
  }
}

