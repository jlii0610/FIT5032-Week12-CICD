<template>
  <div class="container mt-5">
    <h1>Firebase Logout</h1>

    <p v-if="!authReady">
        Checking authentication...
    </p>
    <p v-else>
        Current User:
        {{ currentUserEmail || 'No user signed in' }}
    </p>

    <button class="btn btn-danger" @click="logout">
      Logout
    </button>

    <p class="mt-3" v-if="message">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'


const auth = getAuth()

const currentUserEmail = ref('')
const authReady = ref(false)
const message = ref('')

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserEmail.value = user.email
  } else {
    currentUserEmail.value = ''
  }

  authReady.value = true
})

const logout = () => {
  console.log('Current user before logout:', auth.currentUser)

  signOut(auth)
    .then(() => {
      message.value = 'Logged out successfully'
      console.log('Current user after logout:', auth.currentUser)
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>