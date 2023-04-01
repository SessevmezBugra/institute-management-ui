import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormComponent, Field } from 'src/app/core/ngrx-form';
import { DynamicFieldDirective } from 'src/app/core/ngrx-form/dynamic-form/dynamic-field.directive';
import { NgrxDialogFacade } from '../../+state/ngrx-dialog.facade';
import { FormDialog } from '../../+state/ngrx-dialog.interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    DynamicFieldDirective,
    DynamicFormComponent,
    MatButtonModule,
    MatDialogModule
    
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent implements OnInit {
  
  data$!: Observable<FormDialog>;
  formStructure$!: Observable<Field[]>;
  formData$!: Observable<any>;

  constructor(private ngrxDialogFacade: NgrxDialogFacade) { }

  ngOnInit(): void {
    this.data$ = this.ngrxDialogFacade.formDialogData$;
    this.formStructure$ = this.ngrxDialogFacade.formDialogFormStructure$;
    this.formData$ = this.ngrxDialogFacade.formDialogFormData$;
  }

  updateForm(changes: any) {
    this.ngrxDialogFacade.updateFormDialogFormData(changes);
  }

}
