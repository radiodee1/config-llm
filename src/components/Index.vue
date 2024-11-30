<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
    <router-view >

    </router-view>
  <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button><br>
      <router-link to="/">Home</router-link><br>

      <router-link to="/about">About</router-link><br>

      <router-link to="/config">Config</router-link><br>

      <router-link to="/list">List</router-link><br>

      <router-link to="/var">Var</router-link>

  <p>
      Edit
      <code>components/Index.vue</code> to test
    </p>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
