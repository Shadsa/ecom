import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LocalversionSharedModule } from 'app/shared';
import { LocalversionAdminModule } from 'app/admin/admin.module';
import {
    QRCodeComponent,
    QRCodeDetailComponent,
    QRCodeUpdateComponent,
    QRCodeDeletePopupComponent,
    QRCodeDeleteDialogComponent,
    qRCodeRoute,
    qRCodePopupRoute
} from './';

const ENTITY_STATES = [...qRCodeRoute, ...qRCodePopupRoute];

@NgModule({
    imports: [LocalversionSharedModule, LocalversionAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [QRCodeComponent, QRCodeDetailComponent, QRCodeUpdateComponent, QRCodeDeleteDialogComponent, QRCodeDeletePopupComponent],
    entryComponents: [QRCodeComponent, QRCodeUpdateComponent, QRCodeDeleteDialogComponent, QRCodeDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalversionQRCodeModule {}
