<template>
  <div class="container mt-5">
    <h1>Firebase Registration</h1>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        class="form-control"
      />
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        class="form-control"
      />
    </div>

    <button class="btn btn-primary" @click="register">
      Register
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')

const register = () => {
  const auth = getAuth()

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Successfully registered!')
      console.log(userCredential.user)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>