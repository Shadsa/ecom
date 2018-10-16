import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpectacle } from 'app/shared/model/spectacle.model';

@Component({
    selector: 'jhi-spectacle-detail',
    templateUrl: './spectacle-detail.component.html'
})
export class SpectacleDetailComponent implements OnInit {
    spectacle: ISpectacle;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ spectacle }) => {
            this.spectacle = spectacle;
        });
    }

    previousState() {
        window.history.back();
    }
}
