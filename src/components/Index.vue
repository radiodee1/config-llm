<script>

export default {
    data() {
        return {
            var: 'something' 
            //count: ref(0)
            }
        }
    }

</script>

<template>
  <h1>{{ msg }}</h1>
  <router-view :var="var" />

  <div class="card">
      <!-- button type="button" @click="count++">count is {{ count }}</button><br -->
      <router-link  to="{path:'/home', props:var}"><button>Home</button></router-link><br>

      <router-link  to="/about"><button>About</button></router-link><br>

      <router-link to="/config"><button>Config</button></router-link><br>

      <router-link to="/list"><button>List</button></router-link><br>

      <router-link to="{path:'/variable', props:var}"><button>Var</button></router-link>

  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
