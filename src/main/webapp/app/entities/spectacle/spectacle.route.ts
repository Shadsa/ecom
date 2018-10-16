import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Spectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from './spectacle.service';
import { SpectacleComponent } from './spectacle.component';
import { SpectacleDetailComponent } from './spectacle-detail.component';
import { SpectacleUpdateComponent } from './spectacle-update.component';
import { SpectacleDeletePopupComponent } from './spectacle-delete-dialog.component';
import { ISpectacle } from 'app/shared/model/spectacle.model';

@Injectable({ providedIn: 'root' })
export class SpectacleResolve implements Resolve<ISpectacle> {
    constructor(private service: SpectacleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((spectacle: HttpResponse<Spectacle>) => spectacle.body));
        }
        return of(new Spectacle());
    }
}

export const spectacleRoute: Routes = [
    {
        path: 'spectacle',
        component: SpectacleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.spectacle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'spectacle/:id/view',
        component: SpectacleDetailComponent,
        resolve: {
            spectacle: SpectacleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.spectacle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'spectacle/new',
        component: SpectacleUpdateComponent,
        resolve: {
            spectacle: SpectacleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.spectacle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'spectacle/:id/edit',
        component: SpectacleUpdateComponent,
        resolve: {
            spectacle: SpectacleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.spectacle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const spectaclePopupRoute: Routes = [
    {
        path: 'spectacle/:id/delete',
        component: SpectacleDeletePopupComponent,
        resolve: {
            spectacle: SpectacleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'localversionApp.spectacle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
