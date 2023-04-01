import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AuthFacade } from '../../auth/+state/auth.facade';
import { FormDialogComponent } from '../dynamic-dialog/form-dialog/form-dialog.component';
import { MessageDialogComponent } from '../dynamic-dialog/message-dialog/message-dialog.component';
import { LoginRequiredMessage } from '../dynamic-dialog/message-dialog/ngrx-dialog-message-templates/login-required.message';
import * as NgrxDialogActions from './ngrx-dialog.actions';
import { FormDialog, MessageDialog } from './ngrx-dialog.interfaces';
import { NgrxDialogState } from './ngrx-dialog.reducer';
import { ngrxDialogQuery } from './ngrx-dialog.selectors';

@Injectable({ providedIn: 'root' })
export class NgrxDialogFacade {

    messageDialogData$ = this.store.select(ngrxDialogQuery.getMessageDialogData);
    formDialogData$ = this.store.select(ngrxDialogQuery.getFormDialogData);
    formDialogFormStructure$ = this.store.select(ngrxDialogQuery.getFormDialogFormStructure);
    formDialogFormData$ = this.store.select(ngrxDialogQuery.getFormDialogFormData);

    constructor(private authFacade: AuthFacade, private store: Store<NgrxDialogState>, public dialog: MatDialog,) { }

    private setMessageDialogData(data: MessageDialog) {
        this.store.dispatch(NgrxDialogActions.setMessageDialogData({ data }));
    }

    private setFormDialogData(data: FormDialog) {
        this.store.dispatch(NgrxDialogActions.setFormDialogData({ data }));
    }

    openFormDialog(dialogData: FormDialog): MatDialogRef<FormDialogComponent, String> {
        this.setFormDialogData(dialogData);
        return this.dialog.open(FormDialogComponent);
    }

    openMessageDialog(dialogData: MessageDialog): MatDialogRef<MessageDialogComponent, String> {
        this.setMessageDialogData(dialogData);
        return this.dialog.open(MessageDialogComponent);
    }

    updateFormDialogFormData(formData: any) {
        this.store.dispatch(NgrxDialogActions.updateFormDialogFormData({ data: formData }));
    }

    openLoginRequiredMessageDialog() {
        const messageDialog = this.openMessageDialog(new LoginRequiredMessage());
        messageDialog.afterClosed().subscribe(result => {
            if (result == "OK") {
                this.authFacade.login();
            }
        });
    }
}