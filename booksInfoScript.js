
const stringifiedBooksArray = localStorage.getItem("ApiResponse")
const booksArray = JSON.parse(stringifiedBooksArray)

const id = localStorage.getItem("bookId");


console.log(booksArray)
console.log(id)
// localStorage.clear()    