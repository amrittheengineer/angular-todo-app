import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Task } from '../Task';
import { config as firebaseConfig } from '../../credentials/firebase-config';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private COLLECTION_NAME: string = 'Tasks';
  private firebaseApp: firebase.app.App;
  private db: firebase.firestore.CollectionReference;

  constructor() {
    this.firebaseApp = firebase.initializeApp(firebaseConfig);
    this.db = this.firebaseApp.firestore().collection(this.COLLECTION_NAME);
  }

  getTasks(): Observable<Task[]> {
    const ob: Observable<Task[]> = new Observable<Task[]>((observer) => {
      this.db.get().then((snapshot) => {
        observer.next(snapshot.docs.map((d) => d.data() as Task));
      });
    });
    return ob;
  }

  deleteTask(task: Task): Observable<Task> {
    const ob: Observable<Task> = new Observable<Task>((observer) => {
      this.db
        .doc(task.id)
        .delete()
        .then(() => {
          observer.next(task);
        });
    });
    return ob;
  }

  updateTask(task: Task): Observable<Task> {
    return new Observable<Task>((observer) => {
      this.db
        .doc(task.id)
        .set(task, { merge: true })
        .then(() => observer.next(task));
    });
  }

  addTask(task: Task): Observable<Task> {
    const ob: Observable<Task> = new Observable<Task>((observer) => {
      let docRef = this.db.doc();
      docRef
        .set({ ...task, id: docRef.id }, { merge: true })
        .then(() => observer.next({ ...task, id: docRef.id }));
    });
    return ob;
  }
}
