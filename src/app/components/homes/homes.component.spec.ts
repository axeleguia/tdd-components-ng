import { ComponentFixture, TestBed } from '@angular/core/testing';
import { spyOnClass } from 'jasmine-es6-spies';
import { of } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { HomesComponent } from './homes.component'
import * as homes from 'src/assets/homes.json';

describe('HomesComponent', () => {
    
    let component: HomesComponent;
    let fixture: ComponentFixture<HomesComponent>;
    let dataService: jasmine.SpyObj<DataService>;
    let dialogService: jasmine.SpyObj<DialogService>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [HomesComponent],
            providers: [

                { provide: DataService, useFactory: () => spyOnClass(DataService) },
                { provide: DialogService, useFactory: () => spyOnClass(DialogService) },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(HomesComponent);
        component = fixture.componentInstance;
    });

    beforeEach(() => {
        dataService = TestBed.get(DataService);
        dialogService = TestBed.get(DialogService);
        dataService.getHomes$.and.returnValue(of(homes));
        fixture.detectChanges();
    });

    it('should show homes', () => {
        expect(fixture.nativeElement.querySelectorAll('[data-test="home"]').length).toBe(3);
    });

    it('should show home info', () => {
        const home = fixture.nativeElement.querySelector('[data-test="home"]');
        expect(home.querySelector('[data-test="image"]')).toBeTruthy();
        expect(home.querySelector('[data-test="title"]').innerText).toEqual('Home 1');
        expect(home.querySelector('[data-test="location"]').innerText).toEqual('new york');
    });

    it('should show Book button', () => {
        const home = fixture.nativeElement.querySelector('[data-test="home"]');
        expect(home.querySelector('[data-test="book-btn"]')).toBeTruthy();
    });

    it('should use dialog service to open a dialog when clicking on Book button', () => {
        // grab the button to click
        const bookBtn = fixture.nativeElement.querySelector('[data-test="home"] button');
        // click the button
        bookBtn.click();
        // assert that the dialog service was used to open a dialog
        expect(dialogService.open).toHaveBeenCalled();
    });
});
