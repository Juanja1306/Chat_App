import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  // Enviar mensaje al backend
  sendMessage(username: string, message: string) {
    this.socket.emit('chatMessage', { username, message });
  }

  // Escuchar los mensajes recibidos desde el backend
  getMessages() {
    return this.socket.fromEvent<{ username: string, message: string }>('chatMessage');
  }
}
