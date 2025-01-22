<template>
  <div>
    <h1>Welcome, {{ userEmail }}!</h1>
    <p>You have successfully logged in.</p>
    <br />
    <button class="logout-button" @click="handleLogout">Logout</button>
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

<style scoped>
.logout-button {
  background: linear-gradient(90deg, #ff6a5f, #ff9472);
  border: none;
  border-radius: 30px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.logout-button:hover {
  background: linear-gradient(90deg, #ff9472, #ff6a5f);
  transform: scale(1.05);
}

.logout-button:active {
  transform: scale(0.98);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
