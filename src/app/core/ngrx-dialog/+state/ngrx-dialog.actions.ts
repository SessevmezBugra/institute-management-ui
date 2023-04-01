import { createAction, props } from "@ngrx/store";
import { FormDialog, MessageDialog } from "./ngrx-dialog.interfaces";

export const setMessageDialogData = createAction('[ngrxDialog] SET_MESSAGE_DIALOG_DATA', props<{ data: MessageDialog }>());

export const setFormDialogData = createAction('[ngrxDialog] SET_FORM_DIALOG_DATA', props<{ data: FormDialog }>());

export const updateFormDialogFormData = createAction('[ngrxDialog] UPDATE_FORM_DIALOG_FORM_DATA', props<{ data: any }>());