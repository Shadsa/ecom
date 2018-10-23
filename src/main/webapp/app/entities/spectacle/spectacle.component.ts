import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISpectacle } from 'app/shared/model/spectacle.model';
import { Principal } from 'app/core';
import { SpectacleService } from './spectacle.service';

@Component({
    selector: 'jhi-spectacle',
    templateUrl: './spectacle.component.html'
})
export class SpectacleComponent implements OnInit, OnDestroy {
    spectacles: ISpectacle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private spectacleService: SpectacleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.spectacleService.query().subscribe(
            (res: HttpResponse<ISpectacle[]>) => {
                this.spectacles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSpectacles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISpectacle) {
        return item.id;
    }

    registerChangeInSpectacles() {
        this.eventSubscriber = this.eventManager.subscribe('spectacleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
