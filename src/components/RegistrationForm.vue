<template>
  <div class="form-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <label for="registerEmail">Email:</label>
      <input type="email" v-model="registerEmail" id="registerEmail" required />

      <label for="registerPassword">Password:</label>
      <input type="password" v-model="registerPassword" id="registerPassword" required />

      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import { registerUser } from '@/api'

export default {
  data() {
    return {
      registerEmail: '',
      registerPassword: '',
    }
  },
  methods: {
    async handleRegister() {
      try {
        const res = await registerUser(this.registerEmail, this.registerPassword)
        const token = res.data.token

        // Store token in localStorage so that u don't have to login again and again
        localStorage.setItem('user_email', this.registerEmail)
        localStorage.setItem('auth_token', token)

        // Clear the form
        this.registerEmail = ''
        this.registerPassword = ''

        // Redirect to the welcome page
        this.$router.push('/')
      } catch (error) {
        console.log('Failed to register user.', error.response.data)
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
  margin-bottom: 15px;
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
}

button:hover {
  background-color: #218838;
}
</style>
