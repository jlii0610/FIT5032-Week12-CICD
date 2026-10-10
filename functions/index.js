const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).json({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});


exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;

      const capitalisedName = name.toUpperCase();

      const docRef = await admin.firestore().collection("books").add({
        isbn: Number(isbn),
        name: capitalisedName,
      });

      res.status(200).json({
        message: "Book added successfully",
        id: docRef.id,
      });
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});


exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      const books = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(books);
    } catch (error) {
      console.error("Error getting all books:", error.message);
      res.status(500).send("Error getting all books");
    }
  });
});


