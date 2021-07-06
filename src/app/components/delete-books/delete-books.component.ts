import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-delete-books',
  templateUrl: './delete-books.component.html',
  styleUrls: ['./delete-books.component.css']
})
export class DeleteBooksComponent implements OnInit {

  bool : boolean = false;
  allbooks: any[] = []
  bookName =  new FormControl('', [Validators.required]);
  bookForm! : FormGroup

  constructor(private fb: FormBuilder, private bookService: BookStoreService) {
    this.bookForm = this.fb.group({
      bookName: this.bookName
    })
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.bookService.getBooks().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.allbooks[i] = data[i].bookName
      }
    }, err => console.log(err))
  }

  deleteBookDetails(){
    this.bookService.deleteBook(this.bookForm.value.bookName).subscribe(res => {
      this.bool = true
      setTimeout(() => {
      this.bool = false
      window.location.reload();
      }, 3000);
    })
    this.bookForm.reset();
  }

}
