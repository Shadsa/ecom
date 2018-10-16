import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INote } from 'app/shared/model/note.model';
import { Principal } from 'app/core';
import { NoteService } from './note.service';

@Component({
    selector: 'jhi-note',
    templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit, OnDestroy {
    notes: INote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private noteService: NoteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.noteService.query().subscribe(
            (res: HttpResponse<INote[]>) => {
                this.notes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: INote) {
        return item.id;
    }

    registerChangeInNotes() {
        this.eventSubscriber = this.eventManager.subscribe('noteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
