/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalversionTestModule } from '../../../test.module';
import { SalleComponent } from 'app/entities/salle/salle.component';
import { SalleService } from 'app/entities/salle/salle.service';
import { Salle } from 'app/shared/model/salle.model';

describe('Component Tests', () => {
    describe('Salle Management Component', () => {
        let comp: SalleComponent;
        let fixture: ComponentFixture<SalleComponent>;
        let service: SalleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SalleComponent],
                providers: []
            })
                .overrideTemplate(SalleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SalleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Salle(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.salles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
