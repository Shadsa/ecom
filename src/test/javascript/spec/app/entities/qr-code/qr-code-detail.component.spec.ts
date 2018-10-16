/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { QRCodeDetailComponent } from 'app/entities/qr-code/qr-code-detail.component';
import { QRCode } from 'app/shared/model/qr-code.model';

describe('Component Tests', () => {
    describe('QRCode Management Detail Component', () => {
        let comp: QRCodeDetailComponent;
        let fixture: ComponentFixture<QRCodeDetailComponent>;
        const route = ({ data: of({ qRCode: new QRCode(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [QRCodeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(QRCodeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(QRCodeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.qRCode).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
