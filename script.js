const myLibrary = [];

function Book(title, author) {
  if(!new.target){
    throw Error("Use new before creating an object");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
}

function addBookToLibrary(bookTitle, author) {
  // take params, create a book then store it in the array
  let book = new Book(bookTitle, author);
  myLibrary.push(book);

  console.log(myLibrary);
  createBookCard(book);
}

function createBookCard(book){
  const cardsContainer = document.querySelector("#cards-container");
  const card = document.createElement("div");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");

  card.style.border = "1px solid black";
  card.style.height = "300px";
  card.style.width = "300px";

  h1.textContent = `Title: ${book.title}`;
  p.textContent = `Author: ${book.author}`;
  
  card.appendChild(h1);
  card.appendChild(p);

  cardsContainer.appendChild(card);
}

function displayAllBooks(){
  for(let book of myLibrary){
    createBookCard(book);
  }
}

const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const values = Object.fromEntries(data.entries());

  addBookToLibrary(values["book-title"], values["book-author"]);
});

