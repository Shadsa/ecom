import { IResponsable } from 'app/shared/model//responsable.model';
import { IReservation } from 'app/shared/model//reservation.model';
import { ISpectacle } from 'app/shared/model//spectacle.model';
import { ISalle } from 'app/shared/model//salle.model';

export interface INote {
    id?: number;
    contenu?: string;
    responsable?: IResponsable;
    reservations?: IReservation[];
    spectacles?: ISpectacle[];
    salles?: ISalle[];
}

export class Note implements INote {
    constructor(
        public id?: number,
        public contenu?: string,
        public responsable?: IResponsable,
        public reservations?: IReservation[],
        public spectacles?: ISpectacle[],
        public salles?: ISalle[]
    ) {}
}
