import { IReservation } from 'app/shared/model//reservation.model';
import { IUser } from 'app/core/user/user.model';

export interface IQRCode {
    id?: number;
    qrcodeContentType?: string;
    qrcode?: any;
    reservation?: IReservation;
    user?: IUser;
}

export class QRCode implements IQRCode {
    constructor(
        public id?: number,
        public qrcodeContentType?: string,
        public qrcode?: any,
        public reservation?: IReservation,
        public user?: IUser
    ) {}
}
