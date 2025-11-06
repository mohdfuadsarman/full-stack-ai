var editMode = 'create';

var books = [
    {'Bid':'B001', 'Bname':'The Great Gatsby', 'Bpd':'2022-06-15', 'Bcountry':'USA', 'Bprice':15.99},
    {'Bid':'B002', 'Bname':'To Kill a Mockingbird', 'Bpd':'2022-07-05', 'Bcountry':'USA', 'Bprice':12.50},
    {'Bid':'B003', 'Bname':'Pride and Prejudice', 'Bpd':'2022-06-30', 'Bcountry':'England', 'Bprice':10.99},
    {'Bid':'B004', 'Bname':'1984', 'Bpd':'2022-08-10', 'Bcountry':'UK', 'Bprice':14.75},
    {'Bid':'B005', 'Bname':'The Catcher in the Rye', 'Bpd':'2022-07-20', 'Bcountry':'USA', 'Bprice':13.25}
]



function renderBooksTable()
{
    var tBody = document.getElementById('booksTable').tBodies[0];
    
    for(var book of books)
    {
        // console.log(book);

        var row = tBody.insertRow(-1);

        row.insertCell(0).innerHTML = book.Bid;
        row.insertCell(1).innerHTML = book.Bname;
        row.insertCell(2).innerHTML = book.Bpd;
        row.insertCell(3).innerHTML = book.Bcountry;
        row.insertCell(4).innerHTML = book.Bprice;
        row.insertCell(5).innerHTML = '<a href="#" onclick="updateBook(\'' + book.Bid + '\')">Update</a> | <a href="#" onclick="deleteBook(\'' + book.Bid + '\')">Delete</a>';
    }
}



function updateBook(Bid)
{
    console.log('updateBook: ' + Bid);

    for(var book of books)
    {
        if(book.Bid == Bid)
        {
            document.getElementById('Bid').value = book.Bid;
            document.getElementById('Bname').value = book.Bname;
            document.getElementById('Bpd').value = book.Bpd;
            document.getElementById('Bcountry').value = book.Bcountry;
            document.getElementById('Bprice').value = book.Bprice;

            document.getElementById('Bid').readOnly = true;

            editMode = 'update';

            break;
        }
    }
}



function deleteBook(Bid)
{
    console.log('deleteBook: ' + Bid);

    if(confirm('Confirm delete book ' + Bid + '?'))
    {
        var i;

        for(i = 0; i < books.length; i++)
        {
            if(books[i].Bid == Bid)
            {
                break;
            }
        }

        books.splice(i, 1);

        var table = document.getElementById('booksTable');
        table.tBodies[0].remove();
        table.createTBody();
        renderBooksTable();
    }
}



function createUpdateBook()
{
    console.log('createUpdateBook: ');

    var Bid = document.getElementById('Bid').value;
    var Bname = document.getElementById('Bname').value;
    var Bpd = document.getElementById('Bpd').value;
    var Bcountry = document.getElementById('Bcountry').value;
    var Bprice = document.getElementById('Bprice').value;

    if(editMode == 'create')
    {
        var newBook = {'Bid':Bid, 'Bname':Bname, 'Bpd':Bpd, 'Bcountry':Bcountry, 'Bprice':Bprice};
        console.log(newBook);
        books.push(newBook);
    }
    else if(editMode == 'update')
    {
        for(var i = 0; i < books.length; i++)
        {
            if(books[i].Bid == document.getElementById('Bid').value)
            {
                books[i].Bname = document.getElementById('Bname').value;
                books[i].Bpd = document.getElementById('Bpd').value;
                books[i].Bcountry = document.getElementById('Bcountry').value;
                books[i].Bprice = document.getElementById('Bprice').value;

                document.getElementById('Bid').readOnly = false;
                document.getElementById('bookForm').reset();

                break;
            }
        }
    }

    var table = document.getElementById('booksTable');
    table.tBodies[0].remove();
    table.createTBody();
    renderBooksTable();

    editMode = 'create';
    
    return false;
}