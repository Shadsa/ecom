/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { QRCodeUpdateComponent } from 'app/entities/qr-code/qr-code-update.component';
import { QRCodeService } from 'app/entities/qr-code/qr-code.service';
import { QRCode } from 'app/shared/model/qr-code.model';

describe('Component Tests', () => {
    describe('QRCode Management Update Component', () => {
        let comp: QRCodeUpdateComponent;
        let fixture: ComponentFixture<QRCodeUpdateComponent>;
        let service: QRCodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [QRCodeUpdateComponent]
            })
                .overrideTemplate(QRCodeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QRCodeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QRCodeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QRCode(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qRCode = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new QRCode();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.qRCode = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
