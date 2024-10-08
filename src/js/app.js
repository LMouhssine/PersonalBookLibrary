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

        // Ajouter/Editer un livre avec validation du formulaire
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

        // Écouteur pour le tri
        document.getElementById('sort-by').addEventListener('change', () => {
            this.sortBooks();
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

    // Méthode pour trier les livres
    sortBooks() {
        const sortBy = document.getElementById('sort-by').value;
        const sortedBooks = this.bookService.getBooks().sort((a, b) => {
            if (sortBy === 'pages') {
                return a[sortBy] - b[sortBy];
            }
            return a[sortBy].localeCompare(b[sortBy]);
        });
        this.ui.displayBooks(sortedBooks);
    }

    // Validation du formulaire
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
