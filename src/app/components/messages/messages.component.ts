import { Component } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  // messageService 프로퍼티는 템플릿에 바인딩되기 때문에 반드시 public으로 선언해야 합니다. Angular에서는 public 으로 선언된 컴포넌트 프로퍼티만 바인딩할 수 있습니다.
  constructor(public messageService : MessageService){}
}

