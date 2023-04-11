import { ChangeDetectionStrategy, Component, QueryList, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { TrainingMoveEntity } from 'src/app/core/model/entity/training-move-entity.model';
import { TrainingSectionEntity } from 'src/app/core/model/entity/training-section-entity.model';
import { NgrxDialogFacade } from 'src/app/core/ngrx-dialog';
import { TrainingFacade } from './data-access/+state/training.facade';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule, 
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
  ],
})
export class TrainingComponent {
  @ViewChild(MatMenuTrigger) trigger!: QueryList<MatMenuTrigger>;
  displayedColumns: string[] = ['name', 'set', 'repetation'];
  
  sections$!: Observable<TrainingSectionEntity[]>;
  moves$!: Observable<TrainingMoveEntity[]>;

  lockIcon: string = 'lock';
  isLocked: boolean = true;
  
  constructor(
    private trainingFacade: TrainingFacade,
    private ngrxDialogFacade: NgrxDialogFacade) {
  }
  ngOnInit(): void {
    this.sections$ = this.trainingFacade.sections$;
    this.moves$ = this.trainingFacade.moves$;
  }

  openTrainingSectionDialog(section?: TrainingSectionEntity) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Antrenman Bolumu",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: section ? section.id : '',
          name: section ? section.name : '',
          desc: section ? section.desc : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Antrenman Bolum Adi", placeholder: "Ornek: Gogus Ve Biceps", validator: [Validators.required]},
          { name: "desc", type: 'TEXTAREA', label: "Antrenman Bolum Aciklamasi", placeholder: "Ornek: Haftanin 1. gunu", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(section && section.id) {
          this.trainingFacade.updateTrainingSection();
        }else {
          this.trainingFacade.createTrainingSection();
        }
      }
    });
  }

  openTrainingMoveDialog(move? : TrainingMoveEntity) {
    const dialogRef = this.ngrxDialogFacade.openFormDialog(
      {
        title: "Hareket",
        actions: [
          { text: "Iptal", value: "CANCEL" },
          { text: "Kaydet", value: "OK", color: 'primary' },
        ],
        formData: {
          id: move ? move.id : '',
          name: move ? move.name : '',
          setNumber: move ? move.setNumber : '',
          repetitionNumber: move ? move.repetitionNumber : ''
        },
        formStructure: [
          { name: "name", type: 'INPUT', label: "Hareket Adi", placeholder: "Ornek: Bench Press", validator: [Validators.required]},
          { name: "setNumber", type: 'INPUT', label: "Set Sayisi", placeholder: "Ornek: 4", validator: [Validators.required]},
          { name: "repetitionNumber", type: 'INPUT', label: "Tekrar Sayisi", placeholder: "Ornek: 12, 10, 8, 6", validator: [Validators.required]},
        ]
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(move && move.id) {
          this.trainingFacade.updateTrainingMove();
        }else {
          this.trainingFacade.createTrainingMove();
        }
      }
    });
  }

  openDeleteTrainingSectionWarningDialog(section : TrainingSectionEntity) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu bolumu silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(section && section.id) {
          this.trainingFacade.deleteTrainingSeciton(section.id);
        }
      }
    });
  }

  openDeleteTrainingMoveWarningDialog(move : TrainingMoveEntity) {
    const dialogRef = this.ngrxDialogFacade.openMessageDialog({
      title: "Uyari",
      message: "Bu hareketi silmek istediginizden emin misiniz?",
      actions: [
        { text: "Iptal", value: "CANCEL" },
        { text: "Devam", value: "OK", color: 'primary' },
      ],
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result == "OK") {
        if(move && move.id) {
          this.trainingFacade.deleteTrainingMove(move.id);
        }
      }
    });
  }

  openTrainingMoveActionMenu(index: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.trigger.toArray()[index].openMenu();
  }

  onExpandedSection(section: TrainingSectionEntity) {
    this.trainingFacade.loadTrainingMoves(section.id);
  }

  onClickLockIcon() {    
    this.isLocked ? this.displayedColumns.push('actions') : this.displayedColumns.pop();
    this.isLocked = !this.isLocked;
    this.lockIcon = this.lockIcon == 'lock' ? 'lock_open' : 'lock'
  }

}
