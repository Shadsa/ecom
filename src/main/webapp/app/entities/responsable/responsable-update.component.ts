import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IResponsable } from 'app/shared/model/responsable.model';
import { ResponsableService } from './responsable.service';
import { ISalle } from 'app/shared/model/salle.model';
import { SalleService } from 'app/entities/salle';

@Component({
    selector: 'jhi-responsable-update',
    templateUrl: './responsable-update.component.html'
})
export class ResponsableUpdateComponent implements OnInit {
    private _responsable: IResponsable;
    isSaving: boolean;

    salles: ISalle[];
    dateNaissance: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private responsableService: ResponsableService,
        private salleService: SalleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ responsable }) => {
            this.responsable = responsable;
        });
        this.salleService.query({ filter: 'responsable-is-null' }).subscribe(
            (res: HttpResponse<ISalle[]>) => {
                if (!this.responsable.salle || !this.responsable.salle.id) {
                    this.salles = res.body;
                } else {
                    this.salleService.find(this.responsable.salle.id).subscribe(
                        (subRes: HttpResponse<ISalle>) => {
                            this.salles = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.responsable.dateNaissance = moment(this.dateNaissance, DATE_TIME_FORMAT);
        if (this.responsable.id !== undefined) {
            this.subscribeToSaveResponse(this.responsableService.update(this.responsable));
        } else {
            this.subscribeToSaveResponse(this.responsableService.create(this.responsable));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IResponsable>>) {
        result.subscribe((res: HttpResponse<IResponsable>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get responsable() {
        return this._responsable;
    }

    set responsable(responsable: IResponsable) {
        this._responsable = responsable;
        this.dateNaissance = moment(responsable.dateNaissance).format(DATE_TIME_FORMAT);
    }
}
