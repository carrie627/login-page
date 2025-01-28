<template>
  <div>
    <h1>Welcome, {{ userEmail }}!</h1>
    <p>You have successfully logged in.</p>
    <br />
    <button class="logout-button" @click="handleLogout">Logout</button>
    <router-link class="button" to="/videorecorder">Recorder</router-link>
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
  border-radius: 12px;
  color: white;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.logout-button:hover {
  background: linear-gradient(90deg, #ff9472, #ff6a5f);
  transform: scale(1.05);
}

.logout-button:active {
  transform: scale(0.98);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.button {
  width: auto;
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  text-decoration: none;
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
