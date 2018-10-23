import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IQRCode } from 'app/shared/model/qr-code.model';

type EntityResponseType = HttpResponse<IQRCode>;
type EntityArrayResponseType = HttpResponse<IQRCode[]>;

@Injectable({ providedIn: 'root' })
export class QRCodeService {
    private resourceUrl = SERVER_API_URL + 'api/qr-codes';

    constructor(private http: HttpClient) {}

    create(qRCode: IQRCode): Observable<EntityResponseType> {
        return this.http.post<IQRCode>(this.resourceUrl, qRCode, { observe: 'response' });
    }

    update(qRCode: IQRCode): Observable<EntityResponseType> {
        return this.http.put<IQRCode>(this.resourceUrl, qRCode, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IQRCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IQRCode[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
