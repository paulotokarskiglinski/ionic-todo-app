import { Component, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-todos',
  templateUrl: 'todos.page.html',
  styleUrls: ['todos.page.scss']
})
export class TodoPage implements OnInit {

  public itens: any[] = [];

  constructor(private modalController: ModalController, private todoService: TodosService, private toastController: ToastController) { }

  ngOnInit(): void {
    this.get();
  }

  private get(): void {
    this.todoService.get().then(result => {
      if (result) {
        this.itens = result.filter(r => !r.done).reverse();
      }
    });
  }

  private async presentToast(type: string, text: string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: type,
      position: 'bottom'
    });
    toast.present();
  }

  public async showModal() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });

    modal.onDidDismiss().then(data => {
      if (data) {
        this.get();
      }
    });

    await modal.present();
  }

  public done(task: any): void {
    task.done = true;
    this.itens[this.itens.indexOf(task)] = task;
    this.todoService.update(this.itens).then(result => {
      if (result) {
        this.get();
        this.presentToast('success', 'Your task is done!');
      } else {
        this.presentToast('danger', 'Error! Try again later');
      }
    });
  }

  public delete(task: any): void {
    this.itens.splice(this.itens.indexOf(task), 1);
    this.todoService.update(this.itens).then(result => {
      if (result) {
        this.get();
        this.presentToast('success', 'Your task has been deleted!');
      } else {
        this.presentToast('danger', 'Error! Try again later');
      }
    });
  }

}
