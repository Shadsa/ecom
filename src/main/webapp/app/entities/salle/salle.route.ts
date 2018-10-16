import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Salle } from 'app/shared/model/salle.model';
import { SalleService } from './salle.service';
import { SalleComponent } from './salle.component';
import { SalleDetailComponent } from './salle-detail.component';
import { SalleUpdateComponent } from './salle-update.component';
import { SalleDeletePopupComponent } from './salle-delete-dialog.component';
import { ISalle } from 'app/shared/model/salle.model';

@Injectable({ providedIn: 'root' })
export class SalleResolve implements Resolve<ISalle> {
    constructor(private service: SalleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((salle: HttpResponse<Salle>) => salle.body));
        }
        return of(new Salle());
    }
}

export const salleRoute: Routes = [
    {
        path: 'salle',
        component: SalleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'salle/:id/view',
        component: SalleDetailComponent,
        resolve: {
            salle: SalleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'salle/new',
        component: SalleUpdateComponent,
        resolve: {
            salle: SalleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'salle/:id/edit',
        component: SalleUpdateComponent,
        resolve: {
            salle: SalleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sallePopupRoute: Routes = [
    {
        path: 'salle/:id/delete',
        component: SalleDeletePopupComponent,
        resolve: {
            salle: SalleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.salle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
