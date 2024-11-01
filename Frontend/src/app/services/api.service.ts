import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';
  private socket: Socket;

  constructor(private http: HttpClient) { 
    this.socket = io(this.apiUrl);
  }
  
  getStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }

  listenForMessages() {
    return new Observable(observer => {
      this.socket.on('chatMessage', (data) => {
        observer.next(data);
      });
    });
  }

  sendMessage(message: string) {
    this.socket.emit('chatMessage', message);
  }
  
}
