import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IQRCode } from 'app/shared/model/qr-code.model';
import { QRCodeService } from './qr-code.service';

@Component({
    selector: 'jhi-qr-code-delete-dialog',
    templateUrl: './qr-code-delete-dialog.component.html'
})
export class QRCodeDeleteDialogComponent {
    qRCode: IQRCode;

    constructor(private qRCodeService: QRCodeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.qRCodeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'qRCodeListModification',
                content: 'Deleted an qRCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-qr-code-delete-popup',
    template: ''
})
export class QRCodeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ qRCode }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(QRCodeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.qRCode = qRCode;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
