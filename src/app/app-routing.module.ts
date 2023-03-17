import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';

const routes: Routes = [
  {
    path:'heroes',
    component:HeroesComponent
  }
];

@NgModule({
  // 애플리케이션 최상위 계층에 존재하는 라우터를 설정할 때는 forRoot() 메소드를 사용합니다. forRoot() 메소드를 사용하면 라우팅과 관련된 서비스 프로바이더와 디렉티브를 애플리케이션에 제공할 수 있으며, 브라우저에서 변경되는 URL을 감지할 수 있습니다.
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
