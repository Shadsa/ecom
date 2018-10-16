import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from './spectacle.service';

@Component({
    selector: 'jhi-spectacle-delete-dialog',
    templateUrl: './spectacle-delete-dialog.component.html'
})
export class SpectacleDeleteDialogComponent {
    spectacle: ISpectacle;

    constructor(private spectacleService: SpectacleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.spectacleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'spectacleListModification',
                content: 'Deleted an spectacle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-spectacle-delete-popup',
    template: ''
})
export class SpectacleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spectacle }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpectacleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.spectacle = spectacle;
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
