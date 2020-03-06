import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  public taskForm: string;
  public priorityForm: string = '1';

  constructor(private modalController: ModalController, private todoService: TodosService, private toastController: ToastController) { }

  ngOnInit() {}

  public save(): void {
    const task = { done: false, task: this.taskForm, priority: this.priorityForm, date: new Date() };
    const result = this.todoService.set(task);
    if (result) {
      this.presentToast();
      this.taskForm = '';
      this.priorityForm = '1';
    }
  }

  public async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your task have been saved!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

  public async closeModal() {
    await this.modalController.dismiss();
  }

}
