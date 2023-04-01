import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NgrxDialog } from "./ngrx-dialog.interfaces";
import { ngrxDialogFeatureKey } from "./ngrx-dialog.reducer";

const getNgrxDialog = createFeatureSelector<NgrxDialog>(ngrxDialogFeatureKey);
export const getMessageDialogData = createSelector(getNgrxDialog, (state: NgrxDialog) => state.messageDialogData);
export const getFormDialogData = createSelector(getNgrxDialog, (state: NgrxDialog) => state.formDialogData);
export const getFormDialogFormStructure = createSelector(getNgrxDialog, (state: NgrxDialog) => state.formDialogData.formStructure);
export const getFormDialogFormData = createSelector(getNgrxDialog, (state: NgrxDialog) => state.formDialogData.formData);

export const ngrxDialogQuery = {
    getMessageDialogData,
    getFormDialogData,
    getFormDialogFormStructure,
    getFormDialogFormData
}