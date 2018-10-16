import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalversionSharedModule } from 'app/shared';
import {
    OuvreurComponent,
    OuvreurDetailComponent,
    OuvreurUpdateComponent,
    OuvreurDeletePopupComponent,
    OuvreurDeleteDialogComponent,
    ouvreurRoute,
    ouvreurPopupRoute
} from './';

const ENTITY_STATES = [...ouvreurRoute, ...ouvreurPopupRoute];

@NgModule({
    imports: [LocalversionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OuvreurComponent,
        OuvreurDetailComponent,
        OuvreurUpdateComponent,
        OuvreurDeleteDialogComponent,
        OuvreurDeletePopupComponent
    ],
    entryComponents: [OuvreurComponent, OuvreurUpdateComponent, OuvreurDeleteDialogComponent, OuvreurDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalversionOuvreurModule {}
