import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000'); // Ajusta la URL según sea necesario

  sendMessage(message: { username: string, message: string }) {
    this.socket.emit('chatMessage', message);
  }

  getMessages(): Observable<{ username: string, message: string }> {
    return new Observable(observer => {
      this.socket.on('chatMessage', (data) => {
        observer.next(data);
      });
    });
  }
}