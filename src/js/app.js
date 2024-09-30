// app.js
import BookService from './bookService.js';
import UI from './ui.js';

class App {
    constructor() {
        this.bookService = new BookService();
        this.ui = new UI();
        this.initializeApp();
    }

    initializeApp() {
        // Load and display books
        this.ui.displayBooks(this.bookService.getBooks());

        // Add book event
        document.getElementById('book-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const status = document.getElementById('status').value;

            if(title && author && pages) {
                const newBook = this.bookService.addBook(title, author, pages, status);
                this.ui.addBookToList(newBook);
                this.ui.clearFields();
            } else {
                this.ui.showAlert('Please fill in all fields', 'error');
            }
        });

        // Delete book event
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('delete')) {
                const id = e.target.getAttribute('data-id');
                this.bookService.removeBook(id);
                this.ui.deleteBook(e.target);
                this.ui.showAlert('Book removed', 'success');
            }
        });
    }
}

const app = new App();