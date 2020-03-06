import { Task } from '../models/Task';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private itens: Task[] = [];

  constructor(private nativeStorage: NativeStorage) { }

  public get(): any {
    return this.nativeStorage.getItem('tasks')
      .then(
        data => data,
        error => console.error(error)
      );
  }

  public set(task: any): any {
    return this.get().then(result => {
      this.itens = result;
      this.itens.push(task);

      return this.nativeStorage.setItem('tasks', this.itens)
        .then(
          () => {
            return task;
          },
          error => console.error('Error storing item', error)
        );
    });
  }

  public update(tasks: any): Promise<boolean> {
    return this.nativeStorage.setItem('tasks', tasks)
      .then(
        () => {
          return true;
        },
        error => { console.error('Error storing item', error); return false; }
      );
  }

}
