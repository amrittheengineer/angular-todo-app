import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private addTaskVisible: boolean = false;
  private subject = new Subject<any>();

  toggleAddTask(): void {
    this.addTaskVisible = !this.addTaskVisible;
    this.subject.next(this.addTaskVisible);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() {}
}
