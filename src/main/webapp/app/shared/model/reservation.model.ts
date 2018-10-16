import { ISpectacle } from 'app/shared/model//spectacle.model';
import { IQRCode } from 'app/shared/model//qr-code.model';
import { INote } from 'app/shared/model//note.model';

export interface IReservation {
    id?: number;
    prix?: number;
    spectacle?: ISpectacle;
    code?: IQRCode;
    notes?: INote[];
}

export class Reservation implements IReservation {
    constructor(public id?: number, public prix?: number, public spectacle?: ISpectacle, public code?: IQRCode, public notes?: INote[]) {}
}
