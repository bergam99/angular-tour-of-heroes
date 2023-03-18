import { Component } from '@angular/core';
import { Hero } from 'src/app/Ihero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes:Hero[]=[];

  constructor(private heroService : HeroService){}

  // HeroService의 getHeroes 함수는 ngOnInit() 라이프싸이클 후킹 함수에서 호출합니다.
  ngOnInit():void{
    this.getHeroes();
  }
// 이 때 대시보드 화면의 컴포넌트 클래스에서는 HeroService의 getHeroes()로 받은 배열 데이터 중에 4개만 추출해서 heroes 프로퍼티에 할당합니다. -> slice(1,5)
  getHeroes():void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = this.heroes.slice(1, 5));
  }
}
