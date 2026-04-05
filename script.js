const myLibrary = [];

function Book(name, author) {
  if(!new.target){
    throw Error("Use new before creating an object");
  }

  this.id = crypto.randomUUID();
  this.name = name;
  this.author = author;
}

function addBookToLibrary(bookName, author) {
  // take params, create a book then store it in the array
  let book = new Book(bookName, author);
  myLibrary.push(book);

  console.log(myLibrary);

}

const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const values = Object.fromEntries(data.entries());

  addBookToLibrary(values["book-name"], values["book-author"]);
});

