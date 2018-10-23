import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalversionSharedModule } from 'app/shared';
import {
    ResponsableComponent,
    ResponsableDetailComponent,
    ResponsableUpdateComponent,
    ResponsableDeletePopupComponent,
    ResponsableDeleteDialogComponent,
    responsableRoute,
    responsablePopupRoute
} from './';

const ENTITY_STATES = [...responsableRoute, ...responsablePopupRoute];

@NgModule({
    imports: [LocalversionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ResponsableComponent,
        ResponsableDetailComponent,
        ResponsableUpdateComponent,
        ResponsableDeleteDialogComponent,
        ResponsableDeletePopupComponent
    ],
    entryComponents: [ResponsableComponent, ResponsableUpdateComponent, ResponsableDeleteDialogComponent, ResponsableDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalversionResponsableModule {}
