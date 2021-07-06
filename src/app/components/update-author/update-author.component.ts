import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookStoreService } from 'src/app/services/book-store.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {

  bool: boolean = false;
  allAuthors: any[] = [];
  authorName = new FormControl('', [Validators.required]);
  authorAge = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]);
  authorAwards = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/)]);
  authorForm! :FormGroup

  constructor(private fb: FormBuilder, private bookService: BookStoreService) {
    this.authorForm = this.fb.group({
      authorName: this.authorName,
      authorAge : this.authorAge,
      authorAwards: this.authorAwards
    })
   }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.bookService.getAuthors().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.allAuthors[i] = data[i].authorName
      }
    }, err => console.log(err))
  }

  updateAuthorDetails(){
    const newdirectorDetail = {
      authorName: this.authorForm.value.authorName,
      authorAge : this.authorForm.value.authorAge,
      authorAwards : this.authorForm.value.authorAwards
    }

    this.bookService.updateAuthorDetails(newdirectorDetail).subscribe(data => {
      this.bool = true;
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
  }

}
