<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <div class="d-flex flex-row justify-content-center align-items-center gap-3">
      <router-link class="btn btn-primary" to="/dictionary">Go to Dictionary</router-link>
      <router-link class="btn btn-secondary" to="/calculator">Go to calculator</router-link>
      <router-link class="btn btn-info" to="/greeting">Go to greeting </router-link>
      <router-link class="btn btn-danger" to="/employee">Go to employee </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>