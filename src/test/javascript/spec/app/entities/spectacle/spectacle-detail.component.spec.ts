/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { SpectacleDetailComponent } from 'app/entities/spectacle/spectacle-detail.component';
import { Spectacle } from 'app/shared/model/spectacle.model';

describe('Component Tests', () => {
    describe('Spectacle Management Detail Component', () => {
        let comp: SpectacleDetailComponent;
        let fixture: ComponentFixture<SpectacleDetailComponent>;
        const route = ({ data: of({ spectacle: new Spectacle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SpectacleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SpectacleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpectacleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.spectacle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
