import { DialogAction, MessageDialog } from "../../../+state/ngrx-dialog.interfaces";

export class LoginRequiredMessage implements MessageDialog {
    readonly title = '';
    readonly message = 'Lutfen giris yapin';
    readonly actions: DialogAction[] = [
        {
            text: 'Iptal',
            value: 'CANCEL',
        },
        {
            text: 'Giris Yap',
            value: 'OK',
            color:  'primary'
        }
    ];

}