/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalversionTestModule } from '../../../test.module';
import { OuvreurComponent } from 'app/entities/ouvreur/ouvreur.component';
import { OuvreurService } from 'app/entities/ouvreur/ouvreur.service';
import { Ouvreur } from 'app/shared/model/ouvreur.model';

describe('Component Tests', () => {
    describe('Ouvreur Management Component', () => {
        let comp: OuvreurComponent;
        let fixture: ComponentFixture<OuvreurComponent>;
        let service: OuvreurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [OuvreurComponent],
                providers: []
            })
                .overrideTemplate(OuvreurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OuvreurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OuvreurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ouvreur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ouvreurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
