/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { OuvreurDetailComponent } from 'app/entities/ouvreur/ouvreur-detail.component';
import { Ouvreur } from 'app/shared/model/ouvreur.model';

describe('Component Tests', () => {
    describe('Ouvreur Management Detail Component', () => {
        let comp: OuvreurDetailComponent;
        let fixture: ComponentFixture<OuvreurDetailComponent>;
        const route = ({ data: of({ ouvreur: new Ouvreur(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [OuvreurDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OuvreurDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OuvreurDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ouvreur).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
