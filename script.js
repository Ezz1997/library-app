let myLibrary = new Map();

function Book(title, author, pagesNum, isRead) {
  if (!new.target) {
    throw Error("Use new before creating an object");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesNum = pagesNum;
  this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(bookTitle, author, pagesNum, isRead) {
  // take params, create a book then store it in the array
  let book = new Book(bookTitle, author, pagesNum, isRead);
  myLibrary.set(book.id, book);

  console.log(myLibrary);
  createBookCard(book);
}

function createBookCard(book) {
  const cardsContainer = document.querySelector("#cards-container");
  let card = document.createElement("div");
  const titleElement = document.createElement("h2");
  const authorElement = document.createElement("p");
  const pagesNumElement = document.createElement("p");
  const isReadElement = document.createElement("input");
  const removeButtonElement = document.createElement("button");
  const checkboxWrapperDiv = document.createElement("div");
  const checkBoxLabel = document.createElement("label");

  card.classList.add("card-style");

  titleElement.textContent = book.title;
  authorElement.textContent = `Author: ${book.author}`;
  pagesNumElement.textContent = `Pages Num: ${book.pagesNum}`;

  checkBoxLabel.for = "isReadElement";
  checkBoxLabel.textContent = "Is Read";

  isReadElement.type = "checkbox";
  isReadElement.id = "isReadElement";
  isReadElement.checked = book.isRead;

  isReadElement.addEventListener("click", (e) => {
    book.toggleReadStatus();
  })

  checkboxWrapperDiv.append(checkBoxLabel);
  checkboxWrapperDiv.append(isReadElement);

  removeButtonElement.textContent = "Remove";
  removeButtonElement.classList.add("btn");
  removeButtonElement.classList.add("remove");

  removeButtonElement.addEventListener("click", () => {
    const bookId = card.getAttribute("data-index-number");
    myLibrary.delete(bookId);
    console.log(myLibrary);
    card.remove();
  });

  card.appendChild(titleElement);
  card.appendChild(authorElement);
  card.appendChild(pagesNumElement);
  card.appendChild(checkboxWrapperDiv);
  card.appendChild(removeButtonElement);

  card.setAttribute("data-index-number", book.id);

  cardsContainer.appendChild(card);
}

function displayAllBooks() {
  for (let book of myLibrary.values()) {
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

function initLibrary() {
  // read
  addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 527, true);
  addBookToLibrary("Kafka on the Shore", "Haruki Murakami", 505, true);
  addBookToLibrary("The Silent Patient", "Alex Michaelides", 336, true);
  addBookToLibrary("Animal Farm", "George Orwell", 112, true);
  addBookToLibrary("Meditations", "Marcus Aurelius", 254, true);
  addBookToLibrary("1984", "George Orwell", 328, true);
}

initLibrary();

