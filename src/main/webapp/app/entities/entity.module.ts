import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LocalversionQRCodeModule } from './qr-code/qr-code.module';
import { LocalversionSpectacleModule } from './spectacle/spectacle.module';
import { LocalversionReservationModule } from './reservation/reservation.module';
import { LocalversionResponsableModule } from './responsable/responsable.module';
import { LocalversionSalleModule } from './salle/salle.module';
import { LocalversionOuvreurModule } from './ouvreur/ouvreur.module';
import { LocalversionNoteModule } from './note/note.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LocalversionQRCodeModule,
        LocalversionSpectacleModule,
        LocalversionReservationModule,
        LocalversionResponsableModule,
        LocalversionSalleModule,
        LocalversionOuvreurModule,
        LocalversionNoteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalversionEntityModule {}
