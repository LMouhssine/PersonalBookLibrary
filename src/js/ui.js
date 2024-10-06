export default class UI {
    constructor() {
        this.bookList = document.getElementById('books');
    }

    // Méthode pour afficher la liste des livres
    displayBooks(books) {
        this.bookList.innerHTML = '';
        if (books.length === 0) {
            this.bookList.innerHTML = '<p>No books found.</p>';
        } else {
            books.forEach(book => this.addBookToList(book));
        }
    }

    // Ajouter un livre à la liste
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

    // Mise à jour d'un livre existant
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

    // Supprimer un livre
    deleteBook(target) {
        if(target.classList.contains('delete')) {
            target.parentElement.remove();
        }
    }

    // Réinitialiser les champs du formulaire
    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('pages').value = '';
        document.getElementById('status').value = 'unread';
        document.getElementById('book-form').removeAttribute('data-id');
    }

    // Remplir le formulaire avec les données du livre
    fillForm(book) {
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('pages').value = book.pages;
        document.getElementById('status').value = book.status;
        document.getElementById('book-form').setAttribute('data-id', book.id);
    }

    // Afficher une alerte
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
