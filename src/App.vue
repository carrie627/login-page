<template>
  <div id="app">
    <div class="container" v-if="isLoginForm">
      <LoginForm />
      <p>Don't have an account? <a href="#" @click="toggleForm">Register</a></p>
    </div>

    <div class="container" v-else>
      <RegistrationForm />
      <p>Already have an account? <a href="#" @click="toggleForm">Login</a></p>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegistrationForm from './components/RegistrationForm.vue'

export default {
  components: {
    LoginForm,
    RegistrationForm,
  },
  data() {
    return {
      isLoginForm: true,
    }
  },
  methods: {
    toggleForm() {
      this.isLoginForm = !this.isLoginForm
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f4;
}
</style>
