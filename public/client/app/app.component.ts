import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { Book } from './models/book.model';
import { Author } from './models/author.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    author = new Author();
    authors: Author[] = [];
    book = new Book();
    books: Book[] = [];
    selectedAuthor: Author;
    selectedBook: Book;
    title = 'Books and Authors API App';
    constructor(private _httpService: HttpService) {}

    ngOnInit() {
      this.getAuthors();
      this.getBooks();
    }

    getAuthors(): void {
      this._httpService.getAuthors()
      .subscribe(authors => {
        this.authors = authors;
        console.log('these authors are back from subscription', authors);
      });
    }
    getBooks(): void {
      this._httpService.getBooks()
      .subscribe(books => {
        this.books = books;
        console.log('these books are back from subscription', books);
      });
    }
    submitAuthor(event: Event, form: NgForm): void {
      console.log('new author form submitted', this.author);
      this._httpService.createAuthor(this.author)
      .subscribe(data => {
        this.authors.push(data);
        this.author = new Author;
        form.reset();
      });
    }
    submitBook(event: Event, form: NgForm): void {
      console.log('printing book form', this.book);
      this._httpService.createBook(this.book)
      .subscribe(data => {
          this.books.push(data);
          this.book = new Book;
          form.reset();
      });
    }
    getAuthor(author: Author): void {
      if (this.selectedAuthor === author) {
        this.selectedAuthor = null;
      } else {
        this.selectedAuthor = author;
      }
    }
    getBook(book: Book): void {
      if (this.selectedBook === book) {
        this.selectedBook = null;
      } else {
        this.selectedBook = book;
      }
    }
    deleteAuthor(_id: number): void {
      this.selectedAuthor = null;
      this._httpService.deleteAuthor(_id)
      .subscribe(data => {
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i]._id === data._id) {
            this.authors.splice(i, 1);
            }
        }
      });
    }
    deleteBook(_id: number): void {
        this.selectedBook = null;
        this._httpService.deleteBook(_id)
        .subscribe(data => {
          for (let i = 0; i < this.books.length; i++) {
              if (this.books[i]._id === data._id) {
              this.books.splice(i, 1);
              }
          }
        });
    }
    updateAuthor(author: Author): void {
        console.log('component got a request to update author', author);
        this._httpService.updateAuthor(author)
        .subscribe(data => console.log('updated author data', data));
    }
    updateBook(book: Book): void {
        console.log('component got a request to update book', book);
        this._httpService.updateBook(book)
        .subscribe(data => console.log('updated book data', data));
    }
}

// export class AppComponent {
//   title = 'public';

//   constructor(private _httpService: HttpService) { }

//   ngOnInit(): void {
// called after the constructor, initializing input properties,
// and the first call to ngOnChanges.
//     // add 'implements OnInit' to the class.
//     this.getAllAuthors();
//     this.getAllBooks();
//   }

//   getAllAuthors(){
//     this._httpService.getAuthors().subscribe(data => {
//       console.log(data);
//     });
//   }

//   getAllBooks(){
//     this._httpService.getBooks().subscribe(data => {
//       console.log(data);
//     });
//   }
// }
