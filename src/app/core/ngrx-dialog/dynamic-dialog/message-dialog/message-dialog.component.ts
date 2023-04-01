import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFieldDirective } from 'src/app/core/ngrx-form/dynamic-form/dynamic-field.directive';
import { NgrxDialogFacade } from '../../+state/ngrx-dialog.facade';
import { MessageDialog } from '../../+state/ngrx-dialog.interfaces';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    DynamicFieldDirective,
    MatDialogModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogComponent implements OnInit {

  data$!: Observable<MessageDialog>;

  constructor(private ngrxDialogFacade: NgrxDialogFacade) { }

  ngOnInit(): void {
    this.data$ = this.ngrxDialogFacade.messageDialogData$;
  }

}
