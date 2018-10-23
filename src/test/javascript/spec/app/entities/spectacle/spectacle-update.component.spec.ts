/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { SpectacleUpdateComponent } from 'app/entities/spectacle/spectacle-update.component';
import { SpectacleService } from 'app/entities/spectacle/spectacle.service';
import { Spectacle } from 'app/shared/model/spectacle.model';

describe('Component Tests', () => {
    describe('Spectacle Management Update Component', () => {
        let comp: SpectacleUpdateComponent;
        let fixture: ComponentFixture<SpectacleUpdateComponent>;
        let service: SpectacleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SpectacleUpdateComponent]
            })
                .overrideTemplate(SpectacleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpectacleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpectacleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Spectacle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.spectacle = entity;
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
                    const entity = new Spectacle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.spectacle = entity;
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
