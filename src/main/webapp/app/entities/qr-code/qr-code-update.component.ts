import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IQRCode } from 'app/shared/model/qr-code.model';
import { QRCodeService } from './qr-code.service';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-qr-code-update',
    templateUrl: './qr-code-update.component.html'
})
export class QRCodeUpdateComponent implements OnInit {
    private _qRCode: IQRCode;
    isSaving: boolean;

    reservations: IReservation[];

    users: IUser[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private qRCodeService: QRCodeService,
        private reservationService: ReservationService,
        private userService: UserService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ qRCode }) => {
            this.qRCode = qRCode;
        });
        this.reservationService.query({ filter: 'code-is-null' }).subscribe(
            (res: HttpResponse<IReservation[]>) => {
                if (!this.qRCode.reservation || !this.qRCode.reservation.id) {
                    this.reservations = res.body;
                } else {
                    this.reservationService.find(this.qRCode.reservation.id).subscribe(
                        (subRes: HttpResponse<IReservation>) => {
                            this.reservations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.qRCode, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.qRCode.id !== undefined) {
            this.subscribeToSaveResponse(this.qRCodeService.update(this.qRCode));
        } else {
            this.subscribeToSaveResponse(this.qRCodeService.create(this.qRCode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IQRCode>>) {
        result.subscribe((res: HttpResponse<IQRCode>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get qRCode() {
        return this._qRCode;
    }

    set qRCode(qRCode: IQRCode) {
        this._qRCode = qRCode;
    }
}
