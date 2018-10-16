import { Moment } from 'moment';
import { ISalle } from 'app/shared/model//salle.model';
import { INote } from 'app/shared/model//note.model';

export interface IResponsable {
    id?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Moment;
    email?: string;
    estGestionnaire?: boolean;
    salle?: ISalle;
    notes?: INote[];
}

export class Responsable implements IResponsable {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public dateNaissance?: Moment,
        public email?: string,
        public estGestionnaire?: boolean,
        public salle?: ISalle,
        public notes?: INote[]
    ) {
        this.estGestionnaire = this.estGestionnaire || false;
    }
}
