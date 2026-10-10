<template>
  <pre>
    {{ jsondata }}
  </pre>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const jsondata = ref(null)
const error = ref(null)

const getAllBookAPI = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-538dc.cloudfunctions.net/getAllBooks'
    )

    jsondata.value = JSON.stringify(response.data, null, 2)
    error.value = null
  } catch (err) {
    error.value = 'Error fetching all books'
    jsondata.value = null
  }
}

onMounted(() => {
  getAllBookAPI()
})
</script>