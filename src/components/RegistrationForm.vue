<template>
  <div class="form-container">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <label for="registerName">Name:</label>
      <input type="text" v-model="registerName" id="registerName" required />

      <label for="registerEmail">Email:</label>
      <input type="email" v-model="registerEmail" id="registerEmail" required />

      <label for="registerPassword">Password:</label>
      <input type="password" v-model="registerPassword" id="registerPassword" required />

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerName: '',
      registerEmail: '',
      registerPassword: '',
    }
  },
  methods: {
    handleRegister() {
      console.log('Register Info:')
      console.log('Name:', this.registerName)
      console.log('Email:', this.registerEmail)
      console.log('Password:', this.registerPassword)
      // Clear the form
      this.registerName = ''
      this.registerEmail = ''
      this.registerPassword = ''
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
