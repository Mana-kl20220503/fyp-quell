<template>
  <header class="header">
    <h1 class="title">VapeQuell</h1>
    <nav class="navbar">
      <!-- navigation links here -->
      <a href="/dashboard" class="nav-link">Dashboard</a>
      <a href="/craving-diary" class="nav-link">Craving Diary</a>
      <a href="/vapelog" class="nav-link">Vape Log</a>
      <a href="/community" class="nav-link">Community</a>
      <a href="/healthinfo" class="nav-link">Health Info</a>
      <button class="logout-button">Log out</button>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const model = ref(null); // if you have a default value, set it here

    // Setup function returns all the reactive data to the template
    return {
      model,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ultra&family=Work+Sans:wght@400;700&display=swap');

.header {
  background: url('@/assets/header-background.png') no-repeat center top;
  background-size: cover;
  width: 100%;
  height: 150px;

  color: #fff;
}

.navbar {
  /* Navigation bar styling */
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 1rem; */
  font-size: 16px;
}

.nav-link {
  font-family: 'Work Sans', sans-serif;
  text-decoration: none;
  color: #fff;
  margin-right: 3rem;
  align-self: flex-end;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px 10px;
}

.nav-link:hover {
  background-color: #717d96;
}

.logout-button {
  background-color: #fff; /* Adjust the color to match your exact shade */
  color: #000; /* Text color */
  padding: 10px 20px; /* Padding inside the button */
  border: none; /* No border */
  border-radius: 6px; /* Rounded corners */
  font-size: 16px; /* Text size */
  font-weight: bold; /* Bold text */
  box-shadow: 4px 4px 0px #000000; /* Box shadow to create the 'border' effect */
  cursor: pointer; /* Mouse pointer on hover */
  outline: none; /* Remove outline on focus */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.logout-button:hover {
  background-color: #717d96; /* Darker shade on hover */
}

.logout-button:active {
  box-shadow: 1px 1px 0px #000000; /* Smaller shadow for pressed effect */
  transform: translate(
    2px,
    2px
  ); /* Slightly move the button down and to the right */
}

.title {
  font-family: 'Ultra', serif;
  text-align: center;
  margin: 0;
  font-size: 45px;
  padding-top: 20px;
}
</style>
