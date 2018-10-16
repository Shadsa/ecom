import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Responsable } from 'app/shared/model/responsable.model';
import { ResponsableService } from './responsable.service';
import { ResponsableComponent } from './responsable.component';
import { ResponsableDetailComponent } from './responsable-detail.component';
import { ResponsableUpdateComponent } from './responsable-update.component';
import { ResponsableDeletePopupComponent } from './responsable-delete-dialog.component';
import { IResponsable } from 'app/shared/model/responsable.model';

@Injectable({ providedIn: 'root' })
export class ResponsableResolve implements Resolve<IResponsable> {
    constructor(private service: ResponsableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((responsable: HttpResponse<Responsable>) => responsable.body));
        }
        return of(new Responsable());
    }
}

export const responsableRoute: Routes = [
    {
        path: 'responsable',
        component: ResponsableComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.responsable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'responsable/:id/view',
        component: ResponsableDetailComponent,
        resolve: {
            responsable: ResponsableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.responsable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'responsable/new',
        component: ResponsableUpdateComponent,
        resolve: {
            responsable: ResponsableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.responsable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'responsable/:id/edit',
        component: ResponsableUpdateComponent,
        resolve: {
            responsable: ResponsableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.responsable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const responsablePopupRoute: Routes = [
    {
        path: 'responsable/:id/delete',
        component: ResponsableDeletePopupComponent,
        resolve: {
            responsable: ResponsableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.responsable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
