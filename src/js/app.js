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
        // Charger et afficher les livres
        this.ui.displayBooks(this.bookService.getBooks());

        // Ajouter/Editer un livre
        document.getElementById('book-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const status = document.getElementById('status').value;

            if(title && author && pages) {
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
            } else {
                this.ui.showAlert('Please fill in all fields', 'error');
            }
        });

        // Supprimer un livre
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('delete')) {
                const id = e.target.getAttribute('data-id');
                this.bookService.removeBook(id);
                this.ui.deleteBook(e.target);
                this.ui.showAlert('Book removed', 'success');
            }
        });

        // Modifier un livre
        document.getElementById('books').addEventListener('click', (e) => {
            if(e.target.classList.contains('edit')) {
                const id = e.target.getAttribute('data-id');
                const book = this.bookService.getBook(id);
                this.ui.fillForm(book);
                this.editMode = true;
            }
        });

        // Écouteurs pour la recherche et le filtre
        document.getElementById('search').addEventListener('input', () => {
            this.filterBooks();
        });

        document.getElementById('filter-status').addEventListener('change', () => {
            this.filterBooks();
        });
    }

    // Méthode pour filtrer les livres
    filterBooks() {
        const searchTerm = document.getElementById('search').value.toLowerCase();
        const filterStatus = document.getElementById('filter-status').value;
        const filteredBooks = this.bookService.getBooks().filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || 
                                  book.author.toLowerCase().includes(searchTerm);
            const matchesStatus = filterStatus === 'all' || book.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
        this.ui.displayBooks(filteredBooks);
    }
}

const app = new App();
