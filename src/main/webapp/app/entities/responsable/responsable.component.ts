import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IResponsable } from 'app/shared/model/responsable.model';
import { Principal } from 'app/core';
import { ResponsableService } from './responsable.service';

@Component({
    selector: 'jhi-responsable',
    templateUrl: './responsable.component.html'
})
export class ResponsableComponent implements OnInit, OnDestroy {
    responsables: IResponsable[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private responsableService: ResponsableService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.responsableService.query().subscribe(
            (res: HttpResponse<IResponsable[]>) => {
                this.responsables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInResponsables();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IResponsable) {
        return item.id;
    }

    registerChangeInResponsables() {
        this.eventSubscriber = this.eventManager.subscribe('responsableListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
