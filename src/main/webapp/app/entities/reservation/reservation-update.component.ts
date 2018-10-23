import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from './reservation.service';
import { ISpectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from 'app/entities/spectacle';
import { IQRCode } from 'app/shared/model/qr-code.model';
import { QRCodeService } from 'app/entities/qr-code';
import { INote } from 'app/shared/model/note.model';
import { NoteService } from 'app/entities/note';

@Component({
    selector: 'jhi-reservation-update',
    templateUrl: './reservation-update.component.html'
})
export class ReservationUpdateComponent implements OnInit {
    private _reservation: IReservation;
    isSaving: boolean;

    spectacles: ISpectacle[];

    qrcodes: IQRCode[];

    notes: INote[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private reservationService: ReservationService,
        private spectacleService: SpectacleService,
        private qRCodeService: QRCodeService,
        private noteService: NoteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reservation }) => {
            this.reservation = reservation;
        });
        this.spectacleService.query({ filter: 'reservation-is-null' }).subscribe(
            (res: HttpResponse<ISpectacle[]>) => {
                if (!this.reservation.spectacle || !this.reservation.spectacle.id) {
                    this.spectacles = res.body;
                } else {
                    this.spectacleService.find(this.reservation.spectacle.id).subscribe(
                        (subRes: HttpResponse<ISpectacle>) => {
                            this.spectacles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.qRCodeService.query().subscribe(
            (res: HttpResponse<IQRCode[]>) => {
                this.qrcodes = res.body;
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
        if (this.reservation.id !== undefined) {
            this.subscribeToSaveResponse(this.reservationService.update(this.reservation));
        } else {
            this.subscribeToSaveResponse(this.reservationService.create(this.reservation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>) {
        result.subscribe((res: HttpResponse<IReservation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSpectacleById(index: number, item: ISpectacle) {
        return item.id;
    }

    trackQRCodeById(index: number, item: IQRCode) {
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
    get reservation() {
        return this._reservation;
    }

    set reservation(reservation: IReservation) {
        this._reservation = reservation;
    }
}
