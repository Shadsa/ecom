import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalversionSharedModule } from 'app/shared';
import {
    SpectacleComponent,
    SpectacleDetailComponent,
    SpectacleUpdateComponent,
    SpectacleDeletePopupComponent,
    SpectacleDeleteDialogComponent,
    spectacleRoute,
    spectaclePopupRoute
} from './';

const ENTITY_STATES = [...spectacleRoute, ...spectaclePopupRoute];

@NgModule({
    imports: [LocalversionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SpectacleComponent,
        SpectacleDetailComponent,
        SpectacleUpdateComponent,
        SpectacleDeleteDialogComponent,
        SpectacleDeletePopupComponent
    ],
    entryComponents: [SpectacleComponent, SpectacleUpdateComponent, SpectacleDeleteDialogComponent, SpectacleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalversionSpectacleModule {}
