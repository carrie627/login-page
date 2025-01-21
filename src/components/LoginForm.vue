<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label for="loginEmail">Email:</label>
      <input type="email" v-model="loginEmail" id="loginEmail" required />

      <label for="loginPassword">Password:</label>
      <input type="password" v-model="loginPassword" id="loginPassword" required />

      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/register">Register</router-link></p>
  </div>
</template>

<script>
import { loginUser } from '@/api'

export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await loginUser(this.loginEmail, this.loginPassword)
        const token = res.data.token

        // Store token in localStorage so that u don't have to login again and again
        localStorage.setItem('user_email', this.loginEmail)
        localStorage.setItem('auth_token', token)

        // Clear the form
        this.loginEmail = ''
        this.loginPassword = ''

        // Redirect to the welcome page
        this.$router.push('/')
      } catch (error) {
        console.log('Failed to log in user.', error.response.data)
      }
    },
  },
}
</script>

<style scoped>
.form-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin: 10px 0 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}
</style>
