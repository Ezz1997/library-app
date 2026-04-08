let myLibrary = new Map();

function Book(title, author, pagesNum, isRead) {
  if(!new.target){
    throw Error("Use new before creating an object");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesNum = pagesNum;
  this.isRead = isRead;
}

function addBookToLibrary(bookTitle, author, pagesNum, isRead) {
  // take params, create a book then store it in the array
  let book = new Book(bookTitle, author, pagesNum, isRead);
  myLibrary.set(book.id, book);

  console.log(myLibrary);
  createBookCard(book);
}

function createBookCard(book){
  const cardsContainer = document.querySelector("#cards-container");
  let card = document.createElement("div");
  const titleElement = document.createElement("h1");
  const authorElement = document.createElement("p");
  const pagesNumElement = document.createElement("p");
  const isReadElement = document.createElement("p");
  const removeButtonElement = document.createElement("button");

  card.style.border = "1px solid black";
  card.style.height = "300px";
  card.style.width = "300px";

  titleElement.textContent = `Title: ${book.title}`;
  authorElement.textContent = `Author: ${book.author}`;
  pagesNumElement.textContent = `Pages Num: ${book.pagesNum}`;
  isReadElement.textContent = `IsRead: ${book.isRead ? "Yes" : "No"}`;
  removeButtonElement.textContent = "Remove";

  removeButtonElement.addEventListener("click", () =>{
    let bookId = card.getAttribute("data-index-number");
    myLibrary.delete(bookId);
    console.log(myLibrary);
    card.remove();
  });
  
  card.appendChild(titleElement);
  card.appendChild(authorElement);
  card.appendChild(pagesNumElement);
  card.appendChild(isReadElement);
  card.appendChild(removeButtonElement);

  card.setAttribute("data-index-number", book.id);

  cardsContainer.appendChild(card);
}

function displayAllBooks(){
  for(let book of myLibrary.values()){
    createBookCard(book);
  }
}

const bookForm = document.querySelector("#book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const values = Object.fromEntries(data.entries());

  addBookToLibrary(values["book-title"], values["book-author"], 
                   values["pages-num"], values["isRead"]);
});

