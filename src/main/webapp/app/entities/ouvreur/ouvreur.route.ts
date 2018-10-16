import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ouvreur } from 'app/shared/model/ouvreur.model';
import { OuvreurService } from './ouvreur.service';
import { OuvreurComponent } from './ouvreur.component';
import { OuvreurDetailComponent } from './ouvreur-detail.component';
import { OuvreurUpdateComponent } from './ouvreur-update.component';
import { OuvreurDeletePopupComponent } from './ouvreur-delete-dialog.component';
import { IOuvreur } from 'app/shared/model/ouvreur.model';

@Injectable({ providedIn: 'root' })
export class OuvreurResolve implements Resolve<IOuvreur> {
    constructor(private service: OuvreurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ouvreur: HttpResponse<Ouvreur>) => ouvreur.body));
        }
        return of(new Ouvreur());
    }
}

export const ouvreurRoute: Routes = [
    {
        path: 'ouvreur',
        component: OuvreurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.ouvreur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ouvreur/:id/view',
        component: OuvreurDetailComponent,
        resolve: {
            ouvreur: OuvreurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.ouvreur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ouvreur/new',
        component: OuvreurUpdateComponent,
        resolve: {
            ouvreur: OuvreurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.ouvreur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ouvreur/:id/edit',
        component: OuvreurUpdateComponent,
        resolve: {
            ouvreur: OuvreurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.ouvreur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ouvreurPopupRoute: Routes = [
    {
        path: 'ouvreur/:id/delete',
        component: OuvreurDeletePopupComponent,
        resolve: {
            ouvreur: OuvreurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.ouvreur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
