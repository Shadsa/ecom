import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { QRCode } from 'app/shared/model/qr-code.model';
import { QRCodeService } from './qr-code.service';
import { QRCodeComponent } from './qr-code.component';
import { QRCodeDetailComponent } from './qr-code-detail.component';
import { QRCodeUpdateComponent } from './qr-code-update.component';
import { QRCodeDeletePopupComponent } from './qr-code-delete-dialog.component';
import { IQRCode } from 'app/shared/model/qr-code.model';

@Injectable({ providedIn: 'root' })
export class QRCodeResolve implements Resolve<IQRCode> {
    constructor(private service: QRCodeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((qRCode: HttpResponse<QRCode>) => qRCode.body));
        }
        return of(new QRCode());
    }
}

export const qRCodeRoute: Routes = [
    {
        path: 'qr-code',
        component: QRCodeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.qRCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qr-code/:id/view',
        component: QRCodeDetailComponent,
        resolve: {
            qRCode: QRCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.qRCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qr-code/new',
        component: QRCodeUpdateComponent,
        resolve: {
            qRCode: QRCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.qRCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'qr-code/:id/edit',
        component: QRCodeUpdateComponent,
        resolve: {
            qRCode: QRCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.qRCode.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const qRCodePopupRoute: Routes = [
    {
        path: 'qr-code/:id/delete',
        component: QRCodeDeletePopupComponent,
        resolve: {
            qRCode: QRCodeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.qRCode.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
