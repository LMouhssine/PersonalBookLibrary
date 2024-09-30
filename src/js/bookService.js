export default class BookService {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
    }

    getBooks() {
        return this.books;
    }

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

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();
    }

    updateBook(id, updatedBook) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedBook };
            this.saveBooks();
        }
    }

    saveBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
    }
}