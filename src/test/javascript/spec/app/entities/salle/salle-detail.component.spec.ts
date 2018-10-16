/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { SalleDetailComponent } from 'app/entities/salle/salle-detail.component';
import { Salle } from 'app/shared/model/salle.model';

describe('Component Tests', () => {
    describe('Salle Management Detail Component', () => {
        let comp: SalleDetailComponent;
        let fixture: ComponentFixture<SalleDetailComponent>;
        const route = ({ data: of({ salle: new Salle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SalleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SalleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SalleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.salle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
