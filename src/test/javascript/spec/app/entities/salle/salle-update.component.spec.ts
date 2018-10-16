/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { SalleUpdateComponent } from 'app/entities/salle/salle-update.component';
import { SalleService } from 'app/entities/salle/salle.service';
import { Salle } from 'app/shared/model/salle.model';

describe('Component Tests', () => {
    describe('Salle Management Update Component', () => {
        let comp: SalleUpdateComponent;
        let fixture: ComponentFixture<SalleUpdateComponent>;
        let service: SalleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [SalleUpdateComponent]
            })
                .overrideTemplate(SalleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SalleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Salle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salle = entity;
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
                    const entity = new Salle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.salle = entity;
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
