var editMode = "create"; // 'create' or 'update'

const books = [
    { Bid: 'B001', Bname: 'The Great Gatsby', Bpd: '2022-06-15', Bcountry: 'USA', Bprice: 15.99 },
    { Bid: 'B002', Bname: 'To Kill a Mockingbird', Bpd: '2022-07-05', Bcountry: 'USA', Bprice: 12.50 },
    { Bid: 'B003', Bname: 'Pride and Prejudice', Bpd: '2022-06-30', Bcountry: 'England', Bprice: 10.99 },
    { Bid: 'B004', Bname: '1984', Bpd: '2022-08-10', Bcountry: 'UK', Bprice: 14.75 },
    { Bid: 'B005', Bname: 'The Catcher in the Rye', Bpd: '2022-07-20', Bcountry: 'USA', Bprice: 13.25 }
];

function renderBooksTable() {
    const tableBody = document.getElementById('booksTable').tBodies[0];

    books.forEach(book => {
        // Insert a new row at the end of the table
        var row = tableBody.insertRow(-1);
        row.insertCell(0).innerHTML = book.Bid;
        row.insertCell(1).innerHTML = book.Bname;
        row.insertCell(2).innerHTML = book.Bpd;
        row.insertCell(3).innerHTML = book.Bcountry;
        row.insertCell(4).innerHTML = book.Bprice;
        row.insertCell(5).innerHTML = `<a href="#" onclick="updateBook('${book.Bid}')">Update</a> | <a href="#" onclick="deleteBook('${book.Bid}')">Delete</a>`;
    });
}

function updateBook(Bid) {
    console.log('updateBook: ' + Bid);

    const book = books.find(book => book.Bid === Bid);
    if (book) {
        document.getElementById('Bid').value = book.Bid;
        document.getElementById('Bname').value = book.Bname;
        document.getElementById('Bpd').value = book.Bpd;
        document.getElementById('Bcountry').value = book.Bcountry;
        document.getElementById('Bprice').value = book.Bprice;

        document.getElementById('Bid').readOnly = true;

        editMode = 'update';
    }
}

function deleteBook(Bid) {
    console.log('deleteBook: ' + Bid);

    const bookIndex = books.findIndex(book => book.Bid === Bid);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
    }

    // Clear the form
    var tableBody = document.getElementById('booksTable');
    tableBody.tBodies[0].remove();
    tableBody.createTBody();
    renderBooksTable();

    editMode = 'create';
}

function createUpdateBook() {
    const Bid = document.getElementById('Bid').value;
    const Bname = document.getElementById('Bname').value;
    const Bpd = document.getElementById('Bpd').value;
    const Bcountry = document.getElementById('Bcountry').value;
    const Bprice = document.getElementById('Bprice').value;

    if (editMode == 'create') {
        // Create a new book
        const newBook = { Bid, Bname, Bpd, Bcountry, Bprice };
        books.push(newBook);
    } else {
        // Update the existing book
        const bookIndex = books.findIndex(book => book.Bid === Bid);
        if (bookIndex !== -1) {
            books[bookIndex] = { Bid, Bname, Bpd, Bcountry, Bprice };
        }

        document.getElementById('Bid').readOnly = false;
    }

    document.getElementById('bookForm').reset();

    // Clear the form
    var tableBody = document.getElementById('booksTable');
    tableBody.tBodies[0].remove();
    tableBody.createTBody();
    renderBooksTable();

    editMode = 'create';

    return false; // Prevent form submission
}
