import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISalle } from 'app/shared/model/salle.model';

@Component({
    selector: 'jhi-salle-detail',
    templateUrl: './salle-detail.component.html'
})
export class SalleDetailComponent implements OnInit {
    salle: ISalle;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ salle }) => {
            this.salle = salle;
        });
    }

    previousState() {
        window.history.back();
    }
}
