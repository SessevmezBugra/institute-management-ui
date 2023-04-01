import { Field } from "../../ngrx-form";

export interface NgrxDialog {
  messageDialogData: MessageDialog;
  formDialogData: FormDialog;
}

export interface MessageDialog {
  title?: string;
  message: string;
  actions: Array<DialogAction>;
}

export interface FormDialog {
  title?: string | null;
  actions: Array<DialogAction>;
  formData: any;
  formStructure: Field[];
}

export interface DialogAction {
  text: string;
  value: string;
  color?: ActionColor
}

export type ActionColor = 'primary' | 'accent' | 'warn';
