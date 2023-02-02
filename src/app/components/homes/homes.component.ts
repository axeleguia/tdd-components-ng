import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import { DialogService } from 'src/app/services/dialog.service';
import { BookComponent } from '../book/book.component';
import { Homes } from './homes';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent {

  homes$!: Observable<Homes[]>;

  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.homes$ = this.dataService.getHomes$();
  }

  openDialog(home: any) {
    this.dialogService.open(BookComponent, {
      width: '500px',
      data: { home }
    });
  }

}
