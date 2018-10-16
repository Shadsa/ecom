/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalversionTestModule } from '../../../test.module';
import { QRCodeComponent } from 'app/entities/qr-code/qr-code.component';
import { QRCodeService } from 'app/entities/qr-code/qr-code.service';
import { QRCode } from 'app/shared/model/qr-code.model';

describe('Component Tests', () => {
    describe('QRCode Management Component', () => {
        let comp: QRCodeComponent;
        let fixture: ComponentFixture<QRCodeComponent>;
        let service: QRCodeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [QRCodeComponent],
                providers: []
            })
                .overrideTemplate(QRCodeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(QRCodeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(QRCodeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new QRCode(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.qRCodes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
