import { IResponsable } from 'app/shared/model//responsable.model';
import { ISpectacle } from 'app/shared/model//spectacle.model';
import { INote } from 'app/shared/model//note.model';

export interface ISalle {
    id?: number;
    nom?: string;
    nbMaxPlace?: number;
    localisation?: string;
    longitude?: number;
    latitude?: number;
    responsable?: IResponsable;
    spectacles?: ISpectacle[];
    notes?: INote[];
}

export class Salle implements ISalle {
    constructor(
        public id?: number,
        public nom?: string,
        public nbMaxPlace?: number,
        public localisation?: string,
        public longitude?: number,
        public latitude?: number,
        public responsable?: IResponsable,
        public spectacles?: ISpectacle[],
        public notes?: INote[]
    ) {}
}
