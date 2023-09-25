import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = [];
  private dataUrl = 'http://localhost:3000/search';

  constructor(private http: HttpClient) {}
  fetchData(): Observable<any[]> {
    if (this.data.length === 0) {
      return this.http.get<any[]>(this.dataUrl);
    } else {
      return new Observable<any[]>((observer) => {
        observer.next(this.data);
        observer.complete();
      });
    }
  }
  isEmpty(): boolean {
    return this.data.length === 0;
  }


  getData(): any[] {
    return this.data;
  }

}
