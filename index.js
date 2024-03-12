import { DataService } from "./src/data.service.js";
import { Book } from "./src/book.model.js";
import { createPath } from "./utils.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

const getAllBooks = async () => {
  const books = await DataService.readJSONFile(BOOKS_PATH);

  return books;
};

const saveBooks = async (books) => {
  await DataService.saveJSONFile(BOOKS_PATH, books);
};

const createBook = async (title, author, publicationYear, quantity) => {
  const books = await getAllBooks();

  const newBook = new Book(title, author, publicationYear, quantity);

  const updatedBooks = [...books, newBook];

  await saveBooks(updatedBooks);
};

const getBookById = async (bookId) => {
  const books = await getAllBooks();

  const foundBook = books.find((book) => book.id === bookId);

  if (!foundBook) throw new Error("BOOK NOT FOUND!");

  return foundBook;
};
//5. Update User
const updateBook = async (bookId, newTitle, newQuantity) => {
  //1. Get all users
  const books = await getAllBooks();

  const idExists = books.some((book) => book.id === bookId);
  //   const idExists = users.find(user => user.id === userId);

  if (!idExists) throw new Error("Can't update book! Book not found!");

  const updatedBooks = books.map((book) => {
    if (book.id === bookId) {
      return { ...book, title: newTitle, quantity: newQuantity };
    } else {
      return book;
    }
  });

  await saveBooks(updatedBooks);
};

const deleteBook = async (bookId) => {
  const books = await getAllBooks();

  const updatedBooks = books.filter((book) => book.id !== bookId);

  if (books.length === updatedBooks.length)
    throw new Error("Can't delete book! Book not found!");

  await saveBooks(updatedBooks);
};

const deleteAllBooks = async () => {
  await saveBooks([]);
};
const app = async () => {
  try {
    // await createBook("TheTwoTowers", "Tolkien", 1954, 10);
    // await createBook("The Fellowship of the Ring", "Tolkien", 1954, 10);
    // await createBook("The Return of the King", "Tolkien", 1955, 10);
    // await createBook("TheSilmairilion", "Tolkien", 1977, 10);
    // await createBook("TheHobbit", "Tolkien", 1937, 10);

    // await updateBook(
    //   "5fb3033d-9e38-4312-8177-445c8ee0f1eb",
    //   "The-Two-Towers",
    //   "6"
    // );
    const part1 = await getBookById("e79ab291-d406-4b0b-8d3f-e4908d407cf2");
    console.log("the beggining of the journey", part1);
    // await deleteAllBooks();
    // await deleteBook("b1e6a212-db6a-4733-bede-59e12c90ce0c");

    // const books = await getAllBooks();
    // console.log(books);
  } catch (error) {
    console.error(error);
  }
};
app();
