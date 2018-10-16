import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISpectacle } from 'app/shared/model/spectacle.model';

type EntityResponseType = HttpResponse<ISpectacle>;
type EntityArrayResponseType = HttpResponse<ISpectacle[]>;

@Injectable({ providedIn: 'root' })
export class SpectacleService {
    private resourceUrl = SERVER_API_URL + 'api/spectacles';

    constructor(private http: HttpClient) {}

    create(spectacle: ISpectacle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(spectacle);
        return this.http
            .post<ISpectacle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(spectacle: ISpectacle): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(spectacle);
        return this.http
            .put<ISpectacle>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISpectacle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISpectacle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(spectacle: ISpectacle): ISpectacle {
        const copy: ISpectacle = Object.assign({}, spectacle, {
            date: spectacle.date != null && spectacle.date.isValid() ? spectacle.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((spectacle: ISpectacle) => {
            spectacle.date = spectacle.date != null ? moment(spectacle.date) : null;
        });
        return res;
    }
}
