import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-chat-app';
  username = '';
  message = '';
  messages: { username: string, message: string }[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.getMessages().subscribe((data) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    if (this.username && this.message) {
      this.chatService.sendMessage(this.username, this.message);
      this.message = '';
    }
  }
}
