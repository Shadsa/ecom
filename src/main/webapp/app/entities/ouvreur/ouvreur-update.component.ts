import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOuvreur } from 'app/shared/model/ouvreur.model';
import { OuvreurService } from './ouvreur.service';
import { ISpectacle } from 'app/shared/model/spectacle.model';
import { SpectacleService } from 'app/entities/spectacle';

@Component({
    selector: 'jhi-ouvreur-update',
    templateUrl: './ouvreur-update.component.html'
})
export class OuvreurUpdateComponent implements OnInit {
    private _ouvreur: IOuvreur;
    isSaving: boolean;

    spectacles: ISpectacle[];
    dateNaissance: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private ouvreurService: OuvreurService,
        private spectacleService: SpectacleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ouvreur }) => {
            this.ouvreur = ouvreur;
        });
        this.spectacleService.query().subscribe(
            (res: HttpResponse<ISpectacle[]>) => {
                this.spectacles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.ouvreur.dateNaissance = moment(this.dateNaissance, DATE_TIME_FORMAT);
        if (this.ouvreur.id !== undefined) {
            this.subscribeToSaveResponse(this.ouvreurService.update(this.ouvreur));
        } else {
            this.subscribeToSaveResponse(this.ouvreurService.create(this.ouvreur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOuvreur>>) {
        result.subscribe((res: HttpResponse<IOuvreur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get ouvreur() {
        return this._ouvreur;
    }

    set ouvreur(ouvreur: IOuvreur) {
        this._ouvreur = ouvreur;
        this.dateNaissance = moment(ouvreur.dateNaissance).format(DATE_TIME_FORMAT);
    }
}
