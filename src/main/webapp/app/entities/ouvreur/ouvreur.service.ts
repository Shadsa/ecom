import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOuvreur } from 'app/shared/model/ouvreur.model';

type EntityResponseType = HttpResponse<IOuvreur>;
type EntityArrayResponseType = HttpResponse<IOuvreur[]>;

@Injectable({ providedIn: 'root' })
export class OuvreurService {
    private resourceUrl = SERVER_API_URL + 'api/ouvreurs';

    constructor(private http: HttpClient) {}

    create(ouvreur: IOuvreur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ouvreur);
        return this.http
            .post<IOuvreur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ouvreur: IOuvreur): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ouvreur);
        return this.http
            .put<IOuvreur>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOuvreur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOuvreur[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(ouvreur: IOuvreur): IOuvreur {
        const copy: IOuvreur = Object.assign({}, ouvreur, {
            dateNaissance: ouvreur.dateNaissance != null && ouvreur.dateNaissance.isValid() ? ouvreur.dateNaissance.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateNaissance = res.body.dateNaissance != null ? moment(res.body.dateNaissance) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((ouvreur: IOuvreur) => {
            ouvreur.dateNaissance = ouvreur.dateNaissance != null ? moment(ouvreur.dateNaissance) : null;
        });
        return res;
    }
}
