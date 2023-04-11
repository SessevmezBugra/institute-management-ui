import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, QueryList, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { TrainingEntity } from 'src/app/core/model/entity/training-entity.model';
import { NgrxDialogFacade } from 'src/app/core/ngrx-dialog/+state/ngrx-dialog.facade';
import { TrainingListFacade } from './data-access/+state/training-list.facade';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingListComponent {

  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;

  displayedColumns: string[] = ['name', 'desc', 'createdDate', 'actions'];
  trainings$: Observable<Array<TrainingEntity>> = this.trainingListFacade.trainings$;

  constructor(private ngrxDialogFacade: NgrxDialogFacade, private trainingListFacade: TrainingListFacade) {}

  openTrainingDialog(training?: TrainingEntity) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Genel Bilgiler",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: training ? training.id : '',
          name: training ? training.name : '',
          desc: training ? training.desc : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Antrenman Adi", placeholder: "Ornek: 1. Ay", validator: [Validators.required] },
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Aciklamasi", placeholder: "Ornek: Haftada 3 gun", validator: [Validators.required] },
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        if (training && training.id) {
          this.trainingListFacade.updateTraining();
        } else {
          this.trainingListFacade.createTraining();
        }
      }
    });
  }

  openTrainingActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // this.trigger.toArray()[index].openMenu();
  }

  openDeleteTrainingWarningDialog(training: TrainingEntity) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu antrenmani silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result == "OK") {
        if (training && training.id) {
          this.trainingListFacade.deleteTraining(training.id);
        }
      }
    });
  }
}
