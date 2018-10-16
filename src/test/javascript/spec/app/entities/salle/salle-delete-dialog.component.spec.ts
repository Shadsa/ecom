/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LocalversionTestModule } from '../../../test.module';
import { SalleDeleteDialogComponent } from 'app/entities/salle/salle-delete-dialog.component';
import { SalleService } from 'app/entities/salle/salle.service';

describe('Component Tests', () => {
    describe('Salle Management Delete Component', () => {
        let comp: SalleDeleteDialogComponent;
        let fixture: ComponentFixture<SalleDeleteDialogComponent>;
        let service: SalleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SalleDeleteDialogComponent]
            })
                .overrideTemplate(SalleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleService);
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
