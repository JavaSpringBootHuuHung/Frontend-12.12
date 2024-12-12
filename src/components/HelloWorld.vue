<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <router-link to="/dictionary">Go to Dictionary</router-link>
    <router-link to="/calculator">Go to calculator</router-link>
    <router-link to="/greeting">Go to greeting </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>