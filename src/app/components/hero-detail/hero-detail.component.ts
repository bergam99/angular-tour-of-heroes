import { Component,  OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/Ihero';
import { HeroService } from 'src/app/services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
    // ActivatedRoute는 HeroDetailComponent의 인스턴스를 생성하면서 적용한 라우팅 규칙에 대한 정보를 담고 있습니다. 그래서 이 라우팅 규칙을 참조하면 URL을 통해 컴포넌트로 전달되는 변수를 추출할 수 있습니다. 화면에 표시할 히어로를 구분할 때도 URL에 포함된 라우팅 변수 id를 사용합니다.
    private route: ActivatedRoute,
    // 컴포넌트에 사용할 히어로 데이터는 HeroService를 사용해서 리모트 서버에서 가져옵니다.
    private heroService: HeroService,
    // location은 브라우저를 제어하기 위해 Angular가 제공하는 서비스입니다. 이 서비스는 이전 페이지로 전환하는 예제를 다룰 때 다시 살펴봅니다.
    private location: Location) {}

  ngOnInit(): void {
    this.getHero();
  }

  // route.snapshot은 컴포넌트가 생성된 직후에 존재하는 라우팅 규칙에 대한 정보를 담고 있는 객체입니다.
  // 그래서 이 객체가 제공하는 paramMap을 사용하면 URL에 존재하는 라우팅 변수를 참조할 수 있습니다. 지금 작성하고 있는 예제에서는 서버로부터 받아올 히어로의 id에 해당하는 값을 URL에 있는 "id" 키로 참조합니다.
  // 라우팅 변수는 언제나 문자열 타입입니다. 그래서 라우팅 변수로 전달된 값이 원래 숫자였다면 문자열로 받아온 라우팅 변수에 Number 함수를 사용해서 숫자로 변환할 수 있습니다.
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }


}
