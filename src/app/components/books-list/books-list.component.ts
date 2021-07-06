import { Component, OnInit } from '@angular/core';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  bookName: string;
  booksData:any[] = [];
  constructor(private bookService: BookStoreService){ }

  ngOnInit() {
  }

  getData(bookName: string){
    this.bookService.getAllBooksByWebApi(bookName).subscribe(data => {
      this.booksData = data.items;
      console.log(this.booksData)
    },
    err => console.log(err))
  }

}
