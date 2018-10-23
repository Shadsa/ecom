import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResponsable } from 'app/shared/model/responsable.model';

@Component({
    selector: 'jhi-responsable-detail',
    templateUrl: './responsable-detail.component.html'
})
export class ResponsableDetailComponent implements OnInit {
    responsable: IResponsable;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ responsable }) => {
            this.responsable = responsable;
        });
    }

    previousState() {
        window.history.back();
    }
}
