import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISalle } from 'app/shared/model/salle.model';
import { Principal } from 'app/core';
import { SalleService } from './salle.service';

@Component({
    selector: 'jhi-salle',
    templateUrl: './salle.component.html'
})
export class SalleComponent implements OnInit, OnDestroy {
    salles: ISalle[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private salleService: SalleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.salleService.query().subscribe(
            (res: HttpResponse<ISalle[]>) => {
                this.salles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSalles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISalle) {
        return item.id;
    }

    registerChangeInSalles() {
        this.eventSubscriber = this.eventManager.subscribe('salleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
