import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IQRCode } from 'app/shared/model/qr-code.model';
import { Principal } from 'app/core';
import { QRCodeService } from './qr-code.service';

@Component({
    selector: 'jhi-qr-code',
    templateUrl: './qr-code.component.html'
})
export class QRCodeComponent implements OnInit, OnDestroy {
    qRCodes: IQRCode[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private qRCodeService: QRCodeService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.qRCodeService.query().subscribe(
            (res: HttpResponse<IQRCode[]>) => {
                this.qRCodes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInQRCodes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IQRCode) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInQRCodes() {
        this.eventSubscriber = this.eventManager.subscribe('qRCodeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
