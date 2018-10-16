import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from './salle.service';
import { IResponsable } from 'app/shared/model/responsable.model';
import { ResponsableService } from 'app/entities/responsable';
import { INote } from 'app/shared/model/note.model';
import { NoteService } from 'app/entities/note';

@Component({
    selector: 'jhi-salle-update',
    templateUrl: './salle-update.component.html'
})
export class SalleUpdateComponent implements OnInit {
    private _salle: ISalle;
    isSaving: boolean;

    responsables: IResponsable[];

    notes: INote[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private salleService: SalleService,
        private responsableService: ResponsableService,
        private noteService: NoteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ salle }) => {
            this.salle = salle;
        });
        this.responsableService.query().subscribe(
            (res: HttpResponse<IResponsable[]>) => {
                this.responsables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.noteService.query().subscribe(
            (res: HttpResponse<INote[]>) => {
                this.notes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISalle>>) {
        result.subscribe((res: HttpResponse<ISalle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackResponsableById(index: number, item: IResponsable) {
        return item.id;
    }

    trackNoteById(index: number, item: INote) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
    get salle() {
        return this._salle;
    }

    set salle(salle: ISalle) {
        this._salle = salle;
    }
}
