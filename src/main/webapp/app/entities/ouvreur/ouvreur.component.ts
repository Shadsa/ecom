import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOuvreur } from 'app/shared/model/ouvreur.model';
import { Principal } from 'app/core';
import { OuvreurService } from './ouvreur.service';

@Component({
    selector: 'jhi-ouvreur',
    templateUrl: './ouvreur.component.html'
})
export class OuvreurComponent implements OnInit, OnDestroy {
    ouvreurs: IOuvreur[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ouvreurService: OuvreurService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.ouvreurService.query().subscribe(
            (res: HttpResponse<IOuvreur[]>) => {
                this.ouvreurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOuvreurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOuvreur) {
        return item.id;
    }

    registerChangeInOuvreurs() {
        this.eventSubscriber = this.eventManager.subscribe('ouvreurListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
