// use LibraryDB (this is not needed if we run the run.sh script since the URL already specifies the database - putting it here just for a note)

db.Books.drop();

// Prepare the database and collection
db.Books.insertMany([
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        year: 1960,
        genre: "Classic"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        year: 1813,
        genre: "Romance"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        genre: "Fantasy"
    },
    {
        title: "The Road",
        author: "Cormac McCarthy",
        year: 2006,
        genre: "Post-apocalyptic"
    },
    {
        title: "The Martian",
        author: "Andy Weir",
        year: 2011,
        genre: "Science Fiction"
    },
    {
        title: "Book1",
        author: "Matt Haig",
        year: 2020,
        genre: "Fantasy"
    }
]);



// a) Use the LibraryDB database and update the genre of the book titled "Book1" to "Classic Fiction".
print("\nChecking for book titled 'Book1' before update:");
printjson(db.Books.findOne({ title: "Book1" }));


print("\nUpdating genre of 'Book1' to 'Classic Fiction'...");
db.Books.updateOne(
    { title: "Book1" },
    { $set: { genre: "Classic Fiction" } }
);


print("\nChecking for book titled 'Book1' after update:");
printjson(db.Books.findOne({ title: "Book1" }));



print("\n--------------\n");



// b) Delete any book in the collection where the year is less than 2000.
print("\nChecking for books with year less than 2000 before deletion:");
printjson(db.Books.find({ year: { $lt: 2000 } }).toArray());

print("\nTotal number of books before deletion:");
print(db.Books.countDocuments());


print("\nDeleting books published before the year 2000...");
db.Books.deleteMany({ year: { $lt: 2000 } });


print("\nChecking for books with year less than 2000 after deletion:");
printjson(db.Books.find({ year: { $lt: 2000 } }).toArray());

print("\nTotal number of books after deletion:");
print(db.Books.countDocuments());
