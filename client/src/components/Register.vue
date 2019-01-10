<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="register">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                        <label for="first_name">First Name</label>
                        <input type="text" v-model="first_name" name="first_name" placeholder="first name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="last_name">Last Name</label>
                        <input type="text" v-model="last_name" name="last_name" placeholder="last name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" v-model="email" name="email" placeholder="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password Address</label>
                        <input type="password" v-model="password" name="password" placeholder="password" class="form-control">
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('/users/register', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('usertoken', res.data)
        this.first_name = ''
        this.last_name = ''
        this.email = ''
        this.password = ''
        router.push({name: 'Login'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
