<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">

        <li class="nav-item">
          <router-link
            to="/"
            class="nav-link"
            active-class="active"
            aria-current="page"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

        <li class="nav-item" v-if="isAuthenticated">
           <button
              class="nav-link"
              @click="logout"
            >
            Logout
          </button>
        </li>

        <li class="nav-item" v-else>
          <router-link
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </router-link>
        </li>  
        
        <li class="nav-item">
          <router-link
            to="/FireLogin"
            class="nav-link"
            active-class="active"
          >
            Firebase Login
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/FireRegister"
            class="nav-link"
            active-class="active"
          >
            Firebase Register
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/FireLogout"
            class="nav-link"
            active-class="active"
          >
            Firebase Logout
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/addbook"
            class="nav-link"
            active-class="active"
          >
            Add Book
          </router-link>
        </li>
      
        <li class="nav-item">
          <router-link
            to="/getbookcount"
            class="nav-link"
            active-class="active"
          >
            Get Book Count
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/WeatherCheck"
            class="nav-link"
            active-class="active"
          >
            Get Weather
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/CountBookAPI"
            class="nav-link"
            active-class="active"
          >
            Count Book API
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/GetAllBookAPI"
            class="nav-link"
            active-class="active"
          >
            Get All Book API
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>


<script setup>
import { isAuthenticated } from '../auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  isAuthenticated.value = false
  router.push('/login')
}
</script>