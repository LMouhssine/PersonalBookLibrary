import BookService from './bookService.js';
import UI from './ui.js';

class App {
    constructor() {
        this.bookService = new BookService();
        this.ui = new UI();
        this.editMode = false;
        this.initializeApp();
    }

    initializeApp() {
        // Load and display books
        this.ui.displayBooks(this.bookService.getBooks());

        // Add/Edit book event
        document.getElementById('book-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const pages = document.getElementById('pages').value.trim();
            const status = document.getElementById('status').value;

            if(this.validateForm(title, author, pages)) {
                if(this.editMode) {
                    const id = e.target.getAttribute('data-id');
                    const updatedBook = { title, author, pages: Number(pages), status };
                    this.bookService.updateBook(id, updatedBook);
                    this.ui.updateBook(id, updatedBook);
                    this.editMode = false;
                    this.ui.showAlert('Book updated', 'success');
                } else {
                    const newBook = this.bookService.addBook(title, author, pages, status);
                    this.ui.addBookToList(newBook);
                    this.ui.showAlert('Book added', 'success');
                }
                this.ui.clearFields();
            }
        });

        // Delete book event
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('delete')) {
                if(confirm('Are you sure you want to delete this book?')) {
                    const id = e.target.getAttribute('data-id');
                    this.bookService.removeBook(id);
                    this.ui.deleteBook(e.target);
                    this.ui.showAlert('Book removed', 'success');
                }
            }
        });

        // Mark as read/unread event
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('mark-read')) {
                const id = e.target.getAttribute('data-id');
                const book = this.bookService.getBook(id);
                const newStatus = book.status === 'completed' ? 'unread' : 'completed';
                this.bookService.updateBook(id, { ...book, status: newStatus });
                this.ui.updateBook(id, { ...book, status: newStatus });
            }
        });

        // Edit book event
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('edit')) {
                const id = e.target.getAttribute('data-id');
                const book = this.bookService.getBook(id);
                this.ui.fillForm(book);
                this.editMode = true;
            }
        });
    }

    validateForm(title, author, pages) {
        if(title === '' || author === '' || pages === '') {
            this.ui.showAlert('Please fill in all fields', 'error');
            return false;
        }
        if(isNaN(pages) || Number(pages) <= 0) {
            this.ui.showAlert('Pages must be a positive number', 'error');
            return false;
        }
        return true;
    }
}

const app = new App();
