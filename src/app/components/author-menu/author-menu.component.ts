import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
//import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-author-menu',
  templateUrl: './author-menu.component.html',
  styleUrls: ['./author-menu.component.css']
})
export class AuthorMenuComponent implements OnInit, AfterViewInit {

  authorData: any;
  dataSource: any;
  displayedColumns: any[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  constructor( private bookservice: BookStoreService) { }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.bookservice.getAuthors().subscribe(data => {
      this.authorData = data
      console.log(this.authorData)
      this.dataSource = new MatTableDataSource(this.authorData)
      this.displayedColumns = ['authorName', 'authorAge', 'authorGender', 'authorAwards'];
      this.dataSource.paginator = this.paginator
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
