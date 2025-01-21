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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    }
  },
  methods: {
    handleLogin() {
      console.log('Login Info:')
      console.log('Email:', this.loginEmail)
      console.log('Password:', this.loginPassword)
      // Clear the form
      this.loginEmail = ''
      this.loginPassword = ''
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
