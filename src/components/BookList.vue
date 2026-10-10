<template>
  <div class="card shadow-sm p-4">
    <h2 class="mb-3">Books with ISBN > 1000 (Ordered, Limit 3)</h2>

    <ul class="list-group">
      <li
        v-for="book in books":key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
        <span>
          {{ book.name }} (ISBN: {{ book.isbn }})
        </span>
      
        <div>
          <button
            class="btn btn-primary btn-sm me-2"
            @click="updateBook(book)"
          >
            Update
          </button>

          <button
            class="btn btn-danger btn-sm"
            @click="deleteBook(book.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'

const books = ref([])

const fetchBooks = async () => {
  try {
    const q = query(
      collection(db, 'books'),
      where('isbn', '>', 1000),
      orderBy('isbn', 'asc'),
      limit(3)
    )
    const querySnapshot = await getDocs(q)
    const booksArray = []

    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })

    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id))
    await fetchBooks()
  } catch (error) {
    console.error('Error deleting book: ', error)
  }
}

const updateBook = async (book) => {
  try {
    const newName = prompt('Enter the new book name:', book.name)

    if (newName) {
      await updateDoc(doc(db, 'books', book.id), {
        name: newName
      })

      await fetchBooks()
    }
  } catch (error) {
    console.error('Error updating book: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>