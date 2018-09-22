<template>
  <div>
    <div class="register card">
      <div class="card-body">
        <h2>GM Chat Register</h2>

        <div class="form-group">
          <label for="username">Email:</label>
          <input type="email" class="form-control" v-model="email"/>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" class="form-control" v-model="password"/>
        </div>

        <div class="info alert alert-light" role="alert">
          <small>
            If you have an account, 
            <router-link :to="{ name: 'Login' }">Signin here</router-link>.
          </small>
        </div>

        <button :disabled="isDisabled" class="btn btn-block btn-primary" @click="register()">Register Now</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { firebaseApp } from '../firebase'

  export default {
    name: 'Register',
    data() {
      return {
        email: '',
        password: '',
        isDisabled: false
      }
    },

    methods: {
      register() {
        this.isDisabled = true
        firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.isDisabled = false
            this.$router.push({ name: 'Login' })
          },
          (err) => {
            this.isDisabled = false
            console.log(err)
          })
      }
    }
  }
</script>

<style>
  .register {
    width: 30rem;
    margin: 60px auto;
  }

  .info {
    margin-top: 10px;
    padding: 5px;
  }
</style>