import { FormDialog, NgrxDialog } from "./ngrx-dialog.interfaces";
import * as NgrxDialogActions from './ngrx-dialog.actions';
import { Action, createReducer, on } from "@ngrx/store";


export const ngrxDialogFeatureKey = 'ngrxDialog';

export interface NgrxDialogState {
    readonly [ngrxDialogFeatureKey]: NgrxDialog
}

export const ngrxDialogInitialState: NgrxDialog = {
    messageDialogData: {
        title: '',
        message: '',
        actions: []
    },
    formDialogData: {
        title: '',
        actions: [],
        formData: {},
        formStructure: []
    }
};

const reducer = createReducer(
    ngrxDialogInitialState,
    on(NgrxDialogActions.setMessageDialogData, (state, action) => ({ ...state, messageDialogData: action.data })),
    on(NgrxDialogActions.setFormDialogData, (state, action) => ({ ...state, formDialogData: action.data })),
    on(NgrxDialogActions.updateFormDialogFormData, (state, action) => { 
        const data = { ...state.formDialogData.formData, ...action.data };
        const formDialogData = {...state.formDialogData, formData: data}
        return {...state, formDialogData: formDialogData}
    }),
);

export function ngrxDialogReducer(state: NgrxDialog | undefined, action: Action): NgrxDialog {
    return reducer(state, action);
}