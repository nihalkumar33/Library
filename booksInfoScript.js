
const stringifiedBooksArray = localStorage.getItem("ApiResponse")
const booksArray = JSON.parse(stringifiedBooksArray)

const id = localStorage.getItem("bookId");


console.log(booksArray)
console.log(id)

function info() {
    let book;
    for (let i=0; i<booksArray.length; i++) {
        const type = booksArray[i].volumeInfo.industryIdentifiers[0].type
        const identifier = booksArray[i].volumeInfo.industryIdentifiers[0].identifier

        const ID = `${type}${identifier}`

        if (ID == id) {
            book = i;
            break;
        }
    }
    
    return book;
}

const selectedBook = info();
const thisBook = booksArray[selectedBook];

document.addEventListener("DOMContentLoaded", () => {
    function rightSideDetails() {
        // book title 
        const bookTitle = document.createElement("h1")
        bookTitle.classList.add("book-title")
        
        bookTitle.innerText = thisBook.volumeInfo.title
        
        // book title
        const bookSubTitle = document.createElement("div")
        bookSubTitle.classList.add("book-subtitle")
        
        bookSubTitle.innerText = thisBook.volumeInfo.subtitle
        
        // author
        const authors = thisBook.volumeInfo.authors;
        let authorText = '';
        
        authors.forEach((author) => {
            authorText += `, ${author}`
        })
        
        authorText = authorText.slice(2,);
        
        const pForAuthor = createBookInfo(authorText, "Author: ");
        
        // category
        const catetgories = thisBook.volumeInfo.categories;
        let categoryText = '';
        
        catetgories.forEach((category) => {
            categoryText += `, ${category}`
        })
        
        categoryText = categoryText.slice(2, );
        
        const pForCategory = createBookInfo(categoryText, "");
        
        // publisher
        const publisher = thisBook.volumeInfo.publisher
        const pForPublisher = createBookInfo(publisher, "Publisher: ");
        
        
        // ISBN
        const ISBN = thisBook.volumeInfo.industryIdentifiers[0].identifier
        const pForISBN = createBookInfo(ISBN, "ISBN: ");
        
        // page count
        const pageCount = thisBook.volumeInfo.pageCount;
        const pForPagecount = createBookInfo(pageCount, "Pages: ");
        
        // language
        const language = thisBook.volumeInfo.language;
        const pForLanguage = createBookInfo(language, "Language: ");
        
        // rating
        const averageRating = thisBook.volumeInfo.averageRating;
        const pForAverageRating = createBookInfo(averageRating, "Rating: ");
        
        // price
        
        console.log("I am in right side")
        // const amount = thisBook.saleInfo.listPrice.amount
        // const currencyCode = thisBook.saleInfo.listPrice.currencyCode
        
        // const priceText = `${amount} ${currencyCode}`;
        // const pForAmount = createBookInfo(priceText);
        
        // description
        const description = thisBook.volumeInfo.description;
        const pForDescription = createBookInfo(description, "Description: ");
        
        // adding them to page RIGHT COLUMN
        const mainDivRightColumn = document.createElement("div");
        mainDivRightColumn.classList.add("col-md-8")

        mainDivRightColumn.appendChild(bookTitle)
        mainDivRightColumn.appendChild(bookSubTitle)
        mainDivRightColumn.appendChild(pForAuthor)
        mainDivRightColumn.appendChild(pForCategory)
        mainDivRightColumn.appendChild(pForPublisher)
        mainDivRightColumn.appendChild(pForISBN)
        mainDivRightColumn.appendChild(pForPagecount)
        mainDivRightColumn.appendChild(pForLanguage)
        mainDivRightColumn.appendChild(pForAverageRating)
        // mainDivRightColumn.appendChild(pForAmount)
        mainDivRightColumn.appendChild(pForDescription)

        return mainDivRightColumn;
    }

    function createBookInfo(data, message) {
        const p = document.createElement("p");
        p.classList.add("mb-2")
        
        const span = document.createElement("span");
        console.log("Inside create book info")
        span.classList.add("info-label")
        data = `${message}${data}`
        span.innerText = data;

        p.appendChild(span);
        return p;
    }

    function leftSideDetails() {
        const bookCover = document.createElement("div")
        bookCover.classList.add("col-md-4")
        bookCover.classList.add("book-cover")
        bookCover.classList.add("text-center")
        
        // book image
        const image = document.createElement("img")
        const thumbnail = thisBook.volumeInfo.imageLinks.thumbnail
        image.src = thumbnail
        image.alt = "Book Image"
        
        bookCover.appendChild(image)
        
        return bookCover;
    }

    const parentOfBookCover = document.createElement("div")
    parentOfBookCover.classList.add("row") 
    parentOfBookCover.classList.add("g-4")
    parentOfBookCover.classList.add("align-items-center")
    
    const leftChild = leftSideDetails();
    console.log(leftChild)
    const rightChild = rightSideDetails();
    console.log("I have reached here")
    
    parentOfBookCover.appendChild(leftChild)
    parentOfBookCover.appendChild(rightChild)
    
    // anchor tag
    const buyLink = thisBook.volumeInfo.canonicalVolumeLink;
    const buyButton = document.createElement("a")

    buyButton.setAttribute("href", buyLink)
    buyButton.setAttribute("target", "_blank")
    buyButton.classList.add("btn-buy")
    buyButton.innerText = "Buy Now"
    
    const bookCard = document.getElementById("bookCard")
    bookCard.innerHTML = "";

    console.log(parentOfBookCover)
    console.log(buyButton)
    bookCard.appendChild(parentOfBookCover)
    bookCard.appendChild(buyButton)

    console.log(parentOfBookCover)

})