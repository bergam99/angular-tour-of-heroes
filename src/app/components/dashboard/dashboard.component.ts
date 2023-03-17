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

  ngOnInit():void{
    this.getHeroes();
  }

  getHeroes():void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = this.heroes.slice(1, 5));
  }
}
