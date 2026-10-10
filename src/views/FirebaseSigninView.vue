<template>
  <div class="container mt-5">
    <h1>Firebase Sign In</h1>

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

    <div class="mb-3">
      <label for="role" class="form-label">Role</label>
      <select
        id="role"
        v-model="role"
        class="form-select"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <button class="btn btn-primary" @click="signin">
      Sign in via Firebase
    </button>

    <p class="mt-3" v-if="message">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const role = ref('user')
const message = ref('')

const signin = () => {
  const auth = getAuth()

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const currentEmail = userCredential.user.email

      if (
        role.value === 'admin' &&
        currentEmail === 'week7admin@example.com'
      ) {
        message.value = 'Signed in successfully as Admin'
        console.log('Current role: Admin')
        console.log(auth.currentUser)
        console.log('After sign in:', auth.currentUser)
      } else if (
        role.value === 'user' &&
        currentEmail === 'week7test@example.com'
      ) {
        message.value = 'Signed in successfully as User'
        console.log('Current role: User')
        console.log(auth.currentUser)
        console.log('After sign in:', auth.currentUser)
      } else {
        message.value = 'Role does not match this account'
      }
    })
    .catch((error) => {
      console.log(error.code)
      message.value = error.code
    })
}
</script>