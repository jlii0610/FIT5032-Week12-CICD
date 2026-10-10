<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4">
      <h1 class="mb-4">Add Book</h1>

      <form @submit.prevent="addBook">
        <div class="mb-3">
          <label for="isbn" class="form-label">ISBN</label>
          <input
            type="text"
            v-model="isbn"
            id="isbn"
            class="form-control"
            placeholder="Enter ISBN"
            required
          >
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Book Name</label>
          <input
            type="text"
            v-model="name"
            id="name"
            class="form-control"
            placeholder="Enter book name"
            required
          >
        </div>

        <button type="submit" class="btn btn-primary">
          Add Book
        </button>
      </form>

         <p v-if="message" class="mt-3">
          {{ message }}
        </p>
      </div>

    <div class="mt-4">
      <BookList />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const message = ref('')

const addBook = async () => {
  try {
    const response = await axios.post(
      'https://us-central1-fit5032-538dc.cloudfunctions.net/addBook',
      {
        isbn: Number(isbn.value),
        name: name.value
      }
    )

    console.log(response.data)
    message.value = response.data.message

  } catch (error) {
    console.error('Error adding book: ', error)
  }
}
</script>