import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorsComponent } from './components/add-authors/add-authors.component';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { AuthorMenuComponent } from './components/author-menu/author-menu.component';
import { BookMenuComponent } from './components/book-menu/book-menu.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { DeleteBooksComponent } from './components/delete-books/delete-books.component';
import { UpdateAuthorComponent } from './components/update-author/update-author.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/book-list', pathMatch: 'full'
  },
  {
    path: 'book-list', component: BooksListComponent
  },
  {
    path: "book-menu", component: BookMenuComponent,
    children: [
      { path: "add-books", component: AddBooksComponent },
      { path: "delete-books", component: DeleteBooksComponent }
    ]
  },
  {
    path: "author-menu", component: AuthorMenuComponent,
    children: [

      { path: "add-author", component: AddAuthorsComponent},
      { path: "update-author", component: UpdateAuthorComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  BookMenuComponent,
  AddBooksComponent,
  DeleteBooksComponent,
  AuthorMenuComponent,
  AddAuthorsComponent,
  UpdateAuthorComponent,
  BooksListComponent
]
