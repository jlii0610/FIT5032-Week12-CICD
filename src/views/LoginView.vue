<template>
  <div class="row mt-5">
    <div class="col-md-6 offset-md-3">

      <h1 class="text-center mb-4">Login</h1>

      <form @submit.prevent="handleLogin">

        <div class="mb-3">
          <label for="username" class="form-label">Username</label>

          <input
            type="text"
            id="username"
            class="form-control"
            v-model="username"
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>

          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
          />
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-primary">
            Login
          </button>
        </div>

        <div v-if="errorMessage" class="text-danger text-center mt-3">
          {{ errorMessage }}
        </div>

      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated } from '../auth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const router = useRouter()

const handleLogin = async () => {
  if (username.value === 'admin' && password.value === '123456') {
    isAuthenticated.value = true
    errorMessage.value = ''

    await router.push('/about')
  } else {
    isAuthenticated.value = false
    errorMessage.value = 'Incorrect username or password.'
  }
}
</script>