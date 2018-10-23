import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOuvreur } from 'app/shared/model/ouvreur.model';

@Component({
    selector: 'jhi-ouvreur-detail',
    templateUrl: './ouvreur-detail.component.html'
})
export class OuvreurDetailComponent implements OnInit {
    ouvreur: IOuvreur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ouvreur }) => {
            this.ouvreur = ouvreur;
        });
    }

    previousState() {
        window.history.back();
    }
}
