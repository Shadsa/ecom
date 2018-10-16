import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IResponsable } from 'app/shared/model/responsable.model';

type EntityResponseType = HttpResponse<IResponsable>;
type EntityArrayResponseType = HttpResponse<IResponsable[]>;

@Injectable({ providedIn: 'root' })
export class ResponsableService {
    private resourceUrl = SERVER_API_URL + 'api/responsables';

    constructor(private http: HttpClient) {}

    create(responsable: IResponsable): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(responsable);
        return this.http
            .post<IResponsable>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(responsable: IResponsable): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(responsable);
        return this.http
            .put<IResponsable>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IResponsable>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IResponsable[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(responsable: IResponsable): IResponsable {
        const copy: IResponsable = Object.assign({}, responsable, {
            dateNaissance:
                responsable.dateNaissance != null && responsable.dateNaissance.isValid() ? responsable.dateNaissance.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateNaissance = res.body.dateNaissance != null ? moment(res.body.dateNaissance) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((responsable: IResponsable) => {
            responsable.dateNaissance = responsable.dateNaissance != null ? moment(responsable.dateNaissance) : null;
        });
        return res;
    }
}
