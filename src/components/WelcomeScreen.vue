<template>
  <div>
    <h1>Welcome, {{ userEmail }}!</h1>
    <p>You have successfully logged in.</p>
    <br />
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: localStorage.getItem('user_email'), // Store the user's email or any relevant data
    }
  },
  methods: {
    handleLogout() {
      // Clear the user email and token
      localStorage.removeItem('user_email')
      localStorage.removeItem('auth_token')
      // Redirect to Login page
      this.$router.push('/login')
    },
  },
}
</script>
