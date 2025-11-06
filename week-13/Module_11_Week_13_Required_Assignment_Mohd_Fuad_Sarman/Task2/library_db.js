// a) Create a MongoDB database called LibraryDB
// use LibraryDB (this is not needed if we run the run.sh script since the URL already specifies the database - putting it here just for a note)

db.Books.drop();

// b) Create a collection Books and insert at least three documents with fields like title, author, year, and genre.
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
        title: "The Midnight Library",
        author: "Matt Haig",
        year: 2020,
        genre: "Fantasy"
    }
]);

print("Total number of books:");
print(db.Books.countDocuments());

// c) Use the find command to fetch all books where year is greater than 2000.
print("Books published after the year 2000:");
printjson(
    db.Books.find({ year: { $gt: 2000 } }).toArray()
);

print("Number of books published after 2000:");
print(db.Books.countDocuments({ year: { $gt: 2000 } }));
