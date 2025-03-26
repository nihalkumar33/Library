// data from freeApi

const url = "https://api.freeapi.app/api/v1/public/books";

// const response = async function() {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log("Inside try")

//         return data;

//     } catch (error) {
//         console.log(`Error in fetching data: ${error}`)
//     }
// }

const booksContainer = document.getElementById("booksContainer")


const apiFetchCall = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;

    } catch (error) {
        console.log(`Error in fetching data: ${error}`)
    }
}

// Now I'll store that data
apiFetchCall()
    .then(response => response.data)
    .then((response) => { handleData(response) })


function handleData(allBooks) {
    // Now I am having data of books stored in an array
    const booksArray = allBooks.data;
    console.log(allBooks)

    booksArray.forEach(book => { createBookElement(book) });

}

function createBookElement(book) {
    // creating book div (parent)
    const booksDiv = document.createElement('div')
    booksDiv.classList.add('col-sm-6')
    booksDiv.classList.add('col-md-4')
    booksDiv.classList.add('col-lg-3')

    const type = book.volumeInfo.industryIdentifiers[0].type
    const identifier = book.volumeInfo.industryIdentifiers[0].identifier
    
    booksDiv.id = `${type}${identifier}`
    
    // creating other nested elements
    
    // anchor tag
    const linkToDetails = document.createElement("a")
    linkToDetails.setAttribute('herf', 'booksInfo.html')
    linkToDetails.setAttribute('style', 'text-decoration: none;')
    
    // book-card
    const card = document.createElement("div")
    card.classList.add('card') 
    card.classList.add('book-card') 
    card.classList.add('h-100')
    
    // image tag
    const smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail;

    const imageTag = document.createElement("img")
    imageTag.classList.add('card-img-top')
    imageTag.src = smallThumbnail
    imageTag.alt = "Book Image"
    
    // card body
    const cardBody = document.createElement('div')
    cardBody.classList.add("card-body")
    
    // title 
    const titleText = book.volumeInfo.title

    const title = document.createElement('h5')
    title.classList.add('card-title')
    title.innerText = titleText

    // author
    const authors = book.volumeInfo.authors
    let authorText = '';

    authors.forEach((author) => {
        authorText += `, ${author}`
    })

    authorText = authorText.slice(2, );
    const pForAuthor = createBookInfo(`Author: ${authorText}`)
    
    // publisher
    const publisher = `Publisher: ${book.volumeInfo.publisher}`
    const pForPublisher = createBookInfo(publisher)
    
    // publishedDate
    const publishedDate = `Published Date: ${book.volumeInfo.publishedDate}`
    const pForPublishedDate = createBookInfo(publishedDate)

    cardBody.appendChild(title)
    cardBody.appendChild(pForAuthor)
    cardBody.appendChild(pForPublisher)
    cardBody.appendChild(pForPublishedDate)

    booksDiv.appendChild(linkToDetails)
    linkToDetails.appendChild(card)
    card.appendChild(imageTag)
    card.appendChild(cardBody)

    console.log(booksDiv)

    // Adding booksDiv in booksContainer
    booksContainer.appendChild(booksDiv)
}


function createBookInfo(info) {
    const pTag = document.createElement('p')
    pTag.classList.add('card-text')

    const smallTag = document.createElement('small')
    smallTag.innerText = info
    pTag.appendChild(smallTag)

    return pTag;
    
}

