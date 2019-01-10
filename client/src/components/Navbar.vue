<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark text-white rounded">
        <button class="navbar-toggle"
        type="button"
        data-toggle="collapse"
        data-target="#navbar1"
        aria-controls="navbar1"
        aria-expanded="false"
        aria-label="Toggle navgation">
            <span class="navbar-toggle-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav ">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item" v-if="auth==''">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li class="nav-item" v-if="auth==''">
                    <router-link class="nav-link" to="/login">login</router-link>
                </li>
                <li class="nav-item" v-if="auth=='loggedin'">
                    <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li class="nav-item" v-if="auth=='loggedin'">
                    <router-link class="nav-link" to="/todo">todolist</router-link>
                </li>
                <li class="nav-item" v-if="auth=='loggedin'">
                    <a href="" class="nav-link" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
    <!-- <nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
</nav> -->
</template>

<script>
import EventBus from './EventBus'
EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  data () {
    return {
      auth: '',
      user: ''
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('usertoken')
    }
  },
  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>
