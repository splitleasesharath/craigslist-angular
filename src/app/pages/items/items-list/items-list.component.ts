import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  @ViewChild('rowDetailTpl', { static: true }) rowDetailTpl: TemplateRef<any>;

  options = {checkboxes:true}
  data = [];
  columns: any = [];

  optionsWithRowDetail = {}
  dataWithRowDetail = [];
  columnsWithRowDetail: any = [];

  constructor(private appService:AppService) { }
  ngOnInit(): void {
    
      this.columns = [
          { key: 'id', title: "ID",  width: 50, sorting: true },
          { key: 'name', title: 'Name', width: 100},
          { key: 'phone', title: 'Phone',  align: { head: 'center' }, width: 120, sorting: true, noWrap: { head: true, body: true } },
          { key: 'company', title: 'Company', width: 300, sorting: true, align: { head: 'left', body: 'right' }, noWrap: { head: true, body: true } },
          { key: 'date', title: 'Date', width: 100, sorting: false, pinned: false },
          { key: 'phone', title: 'Phone' ,width: 120},
          { key: 'company', title: 'Company', width: 200, noWrap: { head: true, body: true } },
          { key: 'zip', title: 'ZIP', sorting: false ,width: 120 }
      ]
      this.data = this.appService.getData();



      this.optionsWithRowDetail = {
          checkboxes: true,
          rowDetailTemplate:this.rowDetailTpl
      }
      this.dataWithRowDetail = this.appService.getData();
      this.columnsWithRowDetail = [
          { key: 'id', title: "ID", width: 50, sorting: true },
          { key: 'name', title: 'Name', width: 100},
          { key: 'phone', title: 'Phone',  align: { head: 'center' }, width: 120, sorting: true, noWrap: { head: true, body: true } },
          { key: 'company', title: 'Company', width: 300, sorting: true, align: { head: 'left', body: 'right' }, noWrap: { head: true, body: true } },
          { key: 'date', title: 'Date', width: 100, sorting: false, pinned: false },
          { key: 'phone', title: 'Phone' ,width: 120},
          { key: 'company', title: 'Company', width: 200, noWrap: { head: true, body: true } },
          { key: 'zip', title: 'ZIP', sorting: false, width: 120 }
      ];
     
  }

  onCheckboxClick(selectCheckBoxArr) { 
      alert(JSON.stringify(selectCheckBoxArr));
  }



}
