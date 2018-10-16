import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISpectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from './spectacle.service';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';
import { IOuvreur } from 'app/shared/model/ouvreur.model';
import { OuvreurService } from 'app/entities/ouvreur';
import { INote } from 'app/shared/model/note.model';
import { NoteService } from 'app/entities/note';

@Component({
    selector: 'jhi-spectacle-update',
    templateUrl: './spectacle-update.component.html'
})
export class SpectacleUpdateComponent implements OnInit {
    private _spectacle: ISpectacle;
    isSaving: boolean;

    salles: ISalle[];

    reservations: IReservation[];

    ouvreurs: IOuvreur[];

    notes: INote[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private spectacleService: SpectacleService,
        private salleService: SalleService,
        private reservationService: ReservationService,
        private ouvreurService: OuvreurService,
        private noteService: NoteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ spectacle }) => {
            this.spectacle = spectacle;
        });
        this.salleService.query().subscribe(
            (res: HttpResponse<ISalle[]>) => {
                this.salles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.reservationService.query().subscribe(
            (res: HttpResponse<IReservation[]>) => {
                this.reservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.ouvreurService.query().subscribe(
            (res: HttpResponse<IOuvreur[]>) => {
                this.ouvreurs = res.body;
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
        this.spectacle.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.spectacle.id !== undefined) {
            this.subscribeToSaveResponse(this.spectacleService.update(this.spectacle));
        } else {
            this.subscribeToSaveResponse(this.spectacleService.create(this.spectacle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISpectacle>>) {
        result.subscribe((res: HttpResponse<ISpectacle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSalleById(index: number, item: ISalle) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }

    trackOuvreurById(index: number, item: IOuvreur) {
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
    get spectacle() {
        return this._spectacle;
    }

    set spectacle(spectacle: ISpectacle) {
        this._spectacle = spectacle;
        this.date = moment(spectacle.date).format(DATE_TIME_FORMAT);
    }
}
