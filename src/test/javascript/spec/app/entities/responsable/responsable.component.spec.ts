/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalversionTestModule } from '../../../test.module';
import { ResponsableComponent } from 'app/entities/responsable/responsable.component';
import { ResponsableService } from 'app/entities/responsable/responsable.service';
import { Responsable } from 'app/shared/model/responsable.model';

describe('Component Tests', () => {
    describe('Responsable Management Component', () => {
        let comp: ResponsableComponent;
        let fixture: ComponentFixture<ResponsableComponent>;
        let service: ResponsableService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [ResponsableComponent],
                providers: []
            })
                .overrideTemplate(ResponsableComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ResponsableComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ResponsableService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Responsable(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.responsables[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
