import { Moment } from 'moment';
import { ISpectacle } from 'app/shared/model//spectacle.model';

export interface IOuvreur {
    id?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Moment;
    email?: string;
    spectacles?: ISpectacle[];
}

export class Ouvreur implements IOuvreur {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public dateNaissance?: Moment,
        public email?: string,
        public spectacles?: ISpectacle[]
    ) {}
}
