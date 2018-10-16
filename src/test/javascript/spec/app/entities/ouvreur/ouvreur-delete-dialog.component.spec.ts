/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LocalversionTestModule } from '../../../test.module';
import { OuvreurDeleteDialogComponent } from 'app/entities/ouvreur/ouvreur-delete-dialog.component';
import { OuvreurService } from 'app/entities/ouvreur/ouvreur.service';

describe('Component Tests', () => {
    describe('Ouvreur Management Delete Component', () => {
        let comp: OuvreurDeleteDialogComponent;
        let fixture: ComponentFixture<OuvreurDeleteDialogComponent>;
        let service: OuvreurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [OuvreurDeleteDialogComponent]
            })
                .overrideTemplate(OuvreurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OuvreurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OuvreurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
