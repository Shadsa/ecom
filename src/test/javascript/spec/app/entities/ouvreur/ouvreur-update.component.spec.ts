/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LocalversionTestModule } from '../../../test.module';
import { OuvreurUpdateComponent } from 'app/entities/ouvreur/ouvreur-update.component';
import { OuvreurService } from 'app/entities/ouvreur/ouvreur.service';
import { Ouvreur } from 'app/shared/model/ouvreur.model';

describe('Component Tests', () => {
    describe('Ouvreur Management Update Component', () => {
        let comp: OuvreurUpdateComponent;
        let fixture: ComponentFixture<OuvreurUpdateComponent>;
        let service: OuvreurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LocalversionTestModule],
                declarations: [OuvreurUpdateComponent]
            })
                .overrideTemplate(OuvreurUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OuvreurUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OuvreurService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Ouvreur(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ouvreur = entity;
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
                    const entity = new Ouvreur();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.ouvreur = entity;
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
