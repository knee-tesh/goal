import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list-entries',
  templateUrl: './list-entries.component.html',
  styleUrls: ['./list-entries.component.scss']
})
export class ListEntriesComponent implements OnInit {

  listentries:any;
  tableData:any[] = [];
  pendingStatus:boolean = false;
  statusSelected:string = 'pending';

  constructor(private ds:DataService) { 
    const x = ds.getEntries();
    this.listentries = x;
    this.seggregateTableData(this.statusSelected);
  }


  ngOnInit(): void {
  }

  seggregateTableData(statusSelect){
    this.statusSelected = statusSelect;
    this.pendingStatus = statusSelect == 'pending' ? true : false;
    this.tableData = this.listentries.filter(({status}) => status == statusSelect);
    console.log('table data :: ',this.tableData);
  }

  changesState(data,bool){
    data.status = bool ? 'approved' : 'reject';
    this.seggregateTableData('pending');
  }

  searchItem(event){
    const item = event.target.value;
    const itemsList = this.tableData.filter(({brand_name}) => brand_name.toLowerCase().includes(item));
    this.tableData = itemsList;
    if(item == "") this.seggregateTableData(this.statusSelected); 
  }

}
