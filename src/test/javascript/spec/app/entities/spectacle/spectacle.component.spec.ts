/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LocalversionTestModule } from '../../../test.module';
import { SpectacleComponent } from 'app/entities/spectacle/spectacle.component';
import { SpectacleService } from 'app/entities/spectacle/spectacle.service';
import { Spectacle } from 'app/shared/model/spectacle.model';

describe('Component Tests', () => {
    describe('Spectacle Management Component', () => {
        let comp: SpectacleComponent;
        let fixture: ComponentFixture<SpectacleComponent>;
        let service: SpectacleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SpectacleComponent],
                providers: []
            })
                .overrideTemplate(SpectacleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpectacleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpectacleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Spectacle(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.spectacles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
