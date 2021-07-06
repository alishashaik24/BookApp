import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.css']
})
export class BookMenuComponent implements OnInit, AfterViewInit {

  bookData: any;
  dataSource: any;
  displayedColumns: any[] = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private bookservice: BookStoreService ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.bookservice.getBooks().subscribe(data => {
      this.bookData = data
      console.log(this.bookData)
      this.dataSource = new MatTableDataSource(this.bookData)
      this.displayedColumns = ['isbn', 'bookName', 'bookAuthor', 'bookPublisher', 'bookRating', 'bookPrice'];
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
