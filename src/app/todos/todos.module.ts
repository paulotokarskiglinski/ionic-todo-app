import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoPage } from './todos.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: TodoPage }])
  ],
  declarations: [TodoPage, ModalComponent],
  entryComponents: [ModalComponent]
})
export class TodosPageModule {}
