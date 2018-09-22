<template>
  <div>
    <div class="login card">
      <div class="card-body">
        <h2>GM Chat Login</h2>

        <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
          <ul class="list-unstyled">
            <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
          </ul>
        </div>

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
            If you don't have an account, 
            <router-link :to="{ name: 'Register' }">Register here</router-link>.
          </small>
        </div>

        <button :disabled="isDisabled" class="btn btn-block btn-primary" @click="signin()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { firebaseApp } from '../firebase/index'

  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
        errors: [],
        isDisabled: false,
      }
    },

    methods: {
      signin() {
        this.isDisabled = true
        this.clearErrors()

        if (!this.email) {
          this.setErrors('Email must be filled in.')
        }

        if (!this.password) {
          this.setErrors('Password must be filled in.')
        }

        if (!this.isErrors()) {
          firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password).then(
            (user) => {
              this.isDisabled = false
              this.$router.push({ name: 'Chat', params: { email: user.user.email } })
            },
            (err) => {
              this.isDisabled = false
              this.setErrors(err.message)
            }
          )
        } else {
          this.isDisabled = false
        }
      },
      setErrors(message) {
        this.errors.push(message)
      },
      clearErrors() {
        this.errors = []
      },
      isErrors() {
        if (this.errors.length > 0) 
          return true
        return false
      }
    }
  }
</script>

<style>
  .login {
    width: 30rem;
    margin: 60px auto;
  }

  .info {
    margin-top: 10px;
    padding: 5px;
  }
</style>