export default class UI {
    constructor() {
        this.bookList = document.getElementById('books');
    }

    displayBooks(books) {
        this.bookList.innerHTML = '';
        books.forEach(book => this.addBookToList(book));
    }

    addBookToList(book) {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.status}</p>
            <button class="edit" data-id="${book.id}">Edit</button>
            <button class="delete" data-id="${book.id}">Delete</button>
        `;
        this.bookList.appendChild(bookElement);
    }

    updateBook(id, updatedBook) {
        const bookElement = document.querySelector(`[data-id="${id}"]`).parentElement;
        bookElement.innerHTML = `
            <h3>${updatedBook.title}</h3>
            <p>Author: ${updatedBook.author}</p>
            <p>Pages: ${updatedBook.pages}</p>
            <p>Status: ${updatedBook.status}</p>
            <button class="edit" data-id="${id}">Edit</button>
            <button class="delete" data-id="${id}">Delete</button>
        `;
    }

    deleteBook(target) {
        if(target.classList.contains('delete')) {
            target.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('status').value = 'unread';
        document.getElementById('book-form').removeAttribute('data-id');
    }

    fillForm(book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('pages').value = book.pages;
        document.getElementById('status').value = book.status;
        document.getElementById('book-form').setAttribute('data-id', book.id);
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('main');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}