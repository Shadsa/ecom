import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOuvreur } from 'app/shared/model/ouvreur.model';
import { OuvreurService } from './ouvreur.service';

@Component({
    selector: 'jhi-ouvreur-delete-dialog',
    templateUrl: './ouvreur-delete-dialog.component.html'
})
export class OuvreurDeleteDialogComponent {
    ouvreur: IOuvreur;

    constructor(private ouvreurService: OuvreurService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ouvreurService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ouvreurListModification',
                content: 'Deleted an ouvreur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ouvreur-delete-popup',
    template: ''
})
export class OuvreurDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ouvreur }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OuvreurDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ouvreur = ouvreur;
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
