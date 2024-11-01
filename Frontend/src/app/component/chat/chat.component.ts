import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  username = '';
  message = '';
  messages: { username: string, message: string }[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((data:any) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.chatService.sendMessage({ username: this.username || 'Anónimo', message: this.message });
      this.message = ''; // Limpiar el campo de mensaje
    }
  }
}
