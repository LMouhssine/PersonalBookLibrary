export default class BookService {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
    }

    // Récupérer tous les livres
    getBooks() {
        return this.books;
    }

    // Récupérer un livre spécifique par son ID
    getBook(id) {
        return this.books.find(book => book.id === id);
    }

    // Ajouter un livre
    addBook(title, author, pages, status) {
        const book = {
            id: Date.now().toString(),
            title,
            author,
            pages: Number(pages),
            status
        };
        this.books.push(book);
        this.saveBooks();
        return book;
    }

    // Supprimer un livre par son ID
    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();
    }

    // Mettre à jour un livre existant par son ID
    updateBook(id, updatedBook) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedBook };
            this.saveBooks();
        }
    }

    // Sauvegarder les livres dans le localStorage
    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    // Méthode pour trier les livres par un critère donné (titre, auteur, ou nombre de pages)
    sortBooks(sortBy) {
        return this.books.sort((a, b) => {
            if (sortBy === 'pages') {
                return a.pages - b.pages;
            }
            return a[sortBy].localeCompare(b[sortBy]);
        });
    }
}
