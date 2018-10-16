import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INote } from 'app/shared/model/note.model';
import { NoteService } from './note.service';
import { IResponsable } from 'app/shared/model/responsable.model';
import { ResponsableService } from 'app/entities/responsable';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';
import { ISpectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from 'app/entities/spectacle';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';

@Component({
    selector: 'jhi-note-update',
    templateUrl: './note-update.component.html'
})
export class NoteUpdateComponent implements OnInit {
    private _note: INote;
    isSaving: boolean;

    responsables: IResponsable[];

    reservations: IReservation[];

    spectacles: ISpectacle[];

    salles: ISalle[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private noteService: NoteService,
        private responsableService: ResponsableService,
        private reservationService: ReservationService,
        private spectacleService: SpectacleService,
        private salleService: SalleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ note }) => {
            this.note = note;
        });
        this.responsableService.query().subscribe(
            (res: HttpResponse<IResponsable[]>) => {
                this.responsables = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.reservationService.query().subscribe(
            (res: HttpResponse<IReservation[]>) => {
                this.reservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.spectacleService.query().subscribe(
            (res: HttpResponse<ISpectacle[]>) => {
                this.spectacles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.salleService.query().subscribe(
            (res: HttpResponse<ISalle[]>) => {
                this.salles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.note.id !== undefined) {
            this.subscribeToSaveResponse(this.noteService.update(this.note));
        } else {
            this.subscribeToSaveResponse(this.noteService.create(this.note));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<INote>>) {
        result.subscribe((res: HttpResponse<INote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }

    trackSpectacleById(index: number, item: ISpectacle) {
        return item.id;
    }

    trackSalleById(index: number, item: ISalle) {
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
    get note() {
        return this._note;
    }

    set note(note: INote) {
        this._note = note;
    }
}
