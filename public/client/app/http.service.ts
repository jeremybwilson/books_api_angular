import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Author } from './models/author.model';
import { Book } from './models/book.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    authors$ = new BehaviorSubject<Author[]>([]);
    books$ = new BehaviorSubject<Book[]>([]);

    constructor(private _http: HttpClient) { }

    getAuthors(): Observable<Author[]> {
      this._http.get<Author[]>('/authors')
        .subscribe(data => this.authors$.next(data));
        return this.authors$;
    }

    getBooks(): Observable<Book[]> {
      this._http.get<Book[]>('/books')
        .subscribe(data => this.books$.next(data));
        console.log('got these books!', this.books$);
        return this.books$;
    }

    createAuthor(author: Author): Observable<Author> {
      console.log('http service got a request to create author', author);
      return this._http.post<Author>('/authors', author);
    }

    createBook(book: Book): Observable<Book> {
      console.log('http service got a request to create book', book);
      return this._http.post<Book>('/books', book);
    }

    deleteAuthor(_id: number): Observable<Author> {
      console.log('service got the request to delete author', _id);
      return this._http.delete<Author>(`/authors/${_id}`);
    }

    deleteBook(_id: number): Observable<Book> {
      console.log('service got the request to delete book', _id);
      return this._http.delete<Book>(`/books/${_id}`);
    }

    updateAuthor(author: Author): Observable<Author> {
      console.log('service got the request to update author', author);
      return this._http.put<Author>(`/authors/${author._id}`, author);
    }

    updateBook(book: Book): Observable<Book> {
        console.log('service got the request to update book', book);
        return this._http.put<Book>(`/books/${book._id}`, book);
    }
}

// export class HttpService {
//   constructor(private _http: HttpClient) { }

//   // get all author
//   getAuthors() {
//     return this._http.get('/authors')
//   }

//   getBooks() {
//     return this._http.get('/books')
//   }
// }
