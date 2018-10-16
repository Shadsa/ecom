import { Moment } from 'moment';
import { ISalle } from 'app/shared/model//salle.model';
import { IReservation } from 'app/shared/model//reservation.model';
import { IOuvreur } from 'app/shared/model//ouvreur.model';
import { INote } from 'app/shared/model//note.model';

export interface ISpectacle {
    id?: number;
    nom?: string;
    date?: Moment;
    duree?: number;
    resume?: string;
    salle?: ISalle;
    reservation?: IReservation;
    ouvreurs?: IOuvreur[];
    notes?: INote[];
}

export class Spectacle implements ISpectacle {
    constructor(
        public id?: number,
        public nom?: string,
        public date?: Moment,
        public duree?: number,
        public resume?: string,
        public salle?: ISalle,
        public reservation?: IReservation,
        public ouvreurs?: IOuvreur[],
        public notes?: INote[]
    ) {}
}
