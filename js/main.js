const LOCAL_STORAGE_KEY = 'Bookshelf_APPS';
const RENDER_EVENT = 'render-book';
let bookshelf_APPS = [];

function checkStorage() {
    return typeof Storage !== undefined;
}

if (checkStorage()) {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) !== null ) {
      bookshelf_APPS = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    }else {
      bookshelf_APPS = [];
    }
    localStorage.setItem(localStorage, JSON.stringify(bookshelf_APPS));
}
window.addEventListener("load", function () {
  if (checkStorage) {
      bookDisplay(bookshelf_APPS);
  } else {
    alert("Browser ini tidak mempunyai web stoage");
  }
});


const incompleteBookshelfListId = 'incompleteBookshelfList';
const completeBookshelfListId = 'completeBookshelfList';
function bookDisplay(bookshelf_APPS) {
    const incompleteBookshelfList = document.getElementById(incompleteBookshelfListId);
    const completeBookshelfList = document.getElementById(completeBookshelfListId);
    
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';

    for (const book of bookshelf_APPS.keys()) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book_item');

        const bookTitle = document.createElement('h2');
        bookTitle.innerHTML = bookshelf_APPS[book].title;
        
        const bookAuthor = document.createElement('p');
        bookAuthor.innerHTML = 'Penulis: '+bookshelf_APPS[book].author;
        
        const bookYear = document.createElement('h2');
        bookYear.innerHTML = 'Tahun: '+bookshelf_APPS[book].year;

        const bookAction = document.createElement('div');
        bookAction.classList.add('action');

        const  buttonComplete= document.createElement('button');

        if (bookshelf_APPS[book].isComplete == true) {
            buttonComplete.classList.add("green");
            buttonComplete.setAttribute('id', bookshelf_APPS[book].id);
            buttonComplete.innerHTML = "Belum Selesai Dibaca";
            buttonComplete.addEventListener("click", function() {
                unfinishedRead(book);
            });
        } else {
            buttonComplete.classList.add("green");
            buttonComplete.setAttribute('id', bookshelf_APPS[book].id);
            buttonComplete.innerHTML = "Selesai Dibaca";
            buttonComplete.addEventListener("click", function() {
                 finishedRead(book);
            });
          }
        
        const buttonDelete  = document.createElement('button');
        buttonDelete.setAttribute('id', bookshelf_APPS[book].id);
        buttonDelete.classList.add('red');
        buttonDelete.innerHTML = 'Hapus Buku';
        buttonDelete.addEventListener("click", function (){
            deleteBook(book);
        })

        bookAction.append(buttonComplete, buttonDelete);
        bookItem.append(bookTitle, bookAuthor, bookYear, bookAction);

        if (bookshelf_APPS[book].isComplete == true) {
            completeBookshelfList.append(bookItem);
          } else {
            incompleteBookshelfList.append(bookItem);
          }
    }
}

const bookSubmit = document.getElementById('bookSubmit');
bookSubmit.addEventListener('click', function(event){

    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const iscomplete = document.getElementById('inputBookIsComplete').checked;

    const bookshelfObject = {
        id: +new Date(),
        title: title,
        author: author,
        year: year,
        isComplete: iscomplete
    }

    bookshelf_APPS.push(bookshelfObject);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookshelf_APPS));

    bookDisplay(bookshelf_APPS);
    alert("Buku berhasil ditambahkan");
})

function finishedRead  (BOOK) {
    bookshelf_APPS[BOOK].isComplete = true;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify (
      bookshelf_APPS));
    bookDisplay(bookshelf_APPS);
};

function unfinishedRead  (BOOK) {
    bookshelf_APPS[BOOK].isComplete = false;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(
      bookshelf_APPS));
        bookDisplay(bookshelf_APPS);
};

function deleteBook  (BOOK) {
    bookshelf_APPS.splice(BOOK, 1);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify (bookshelf_APPS));
    bookDisplay(bookshelf_APPS);
    alert("Buku berhasil dihapus");
};

