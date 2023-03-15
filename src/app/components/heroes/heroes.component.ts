import { Component } from '@angular/core';
import { Hero } from 'src/app/Ihero';
import { HEROES } from 'src/app/mock/mock-heroes';


@Component({
  // 부모 컴포넌트의 템플릿에 사용합니다. 쓰면 자동으로 부모가 되는 것임!
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})



export class HeroesComponent {
  // hero : Hero = {
  //   id : 1,
  //   name :'Windstorm'
  // };

  // 클래스에 heroes 프로퍼티를 선언하고 위에서 로드한 HEROES 배열을 바인딩합니다.
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    // selectedHero <- hero : hero 값을 변경함. 하지만 이 프로퍼디에 값을 직접 할당하지는 않는다. 왜냐면 앱이 실행되는 시점에 선택된 히어로는 없기 때문이다.
  }
  constructor() { }

  ngOnInit() { }
}
