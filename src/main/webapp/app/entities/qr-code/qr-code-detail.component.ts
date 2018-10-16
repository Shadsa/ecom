import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IQRCode } from 'app/shared/model/qr-code.model';

@Component({
    selector: 'jhi-qr-code-detail',
    templateUrl: './qr-code-detail.component.html'
})
export class QRCodeDetailComponent implements OnInit {
    qRCode: IQRCode;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qRCode }) => {
            this.qRCode = qRCode;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
