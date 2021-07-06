import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  authors_URL = " https://bookapp-project.herokuapp.com/authors";
  books_URL = " https://bookapp-project.herokuapp.com/books";
  constructor(private http: HttpClient) { }

  getAuthors() {
    return this.http.get<any>(this.authors_URL)
  }

  getAuthorByName(authorName: string) {
    return this.http.get<any>(this.authors_URL + `/${authorName}`)
  }

  postAuthor(authorData: any) {
    return this.http.post<any>(this.authors_URL + `/`, authorData)
  }

  updateAuthorDetails(authorData: any) {
    return this.http.patch<any>(this.authors_URL + `/${authorData.authorName}`, authorData)
  }

  getBooks() {
    return this.http.get<any>(this.books_URL)
  }

  getBookByName(bookName: string) {
    return this.http.get<any>(this.books_URL + `/${bookName}`)
  }

  postBook(bookData: any) {
    return this.http.post<any>(this.books_URL + `/`, bookData)
  }

  deleteBook(bookName: string) {
    return this.http.delete<any>(this.books_URL + `/${bookName}`)
  }

  getAllBooksByWebApi(bookName: any) {
    return this.http.get<any>(`https://www.googleapis.com/books/v1/volumes?q=${bookName}`)
  }

}
