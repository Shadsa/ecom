/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LocalversionTestModule } from '../../../test.module';
import { QRCodeDeleteDialogComponent } from 'app/entities/qr-code/qr-code-delete-dialog.component';
import { QRCodeService } from 'app/entities/qr-code/qr-code.service';

describe('Component Tests', () => {
    describe('QRCode Management Delete Component', () => {
        let comp: QRCodeDeleteDialogComponent;
        let fixture: ComponentFixture<QRCodeDeleteDialogComponent>;
        let service: QRCodeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [QRCodeDeleteDialogComponent]
            })
                .overrideTemplate(QRCodeDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QRCodeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QRCodeService);
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
