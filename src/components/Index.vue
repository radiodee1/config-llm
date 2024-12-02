<script>

import dict from '../js/dict.js'

export default {
    data() {
        return {
            var: 'something', 
            vars: dict.var,
            configs: dict.config,
            lists: dict.list,
            options: dict.options,
            filename: dict.filename,
            item: "",
            userdir: "",
            returnKey: "",
            returnVal: "",
            }
        },
    methods: {
        passStringVar: function (v, x) {
            this.var = v;
            this.item = x;
        },
        returnStringVar: function (v, x) {
            this.returnKey = v;
            this.returnVal = x;
        }
    }
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <br>
  {{ vars }} <br>
  {{ filename }} <br>
  {{ returnKey }} : {{ returnVal }}
  <router-view 
      :var="var"
      :item="item"
      :returnStringVar="returnStringVar"
    />

  <div class="card">
      <!-- button type="button" @click="count++">count is {{ count }}</button><br -->
      <router-link :to="{name:'home'}"
          @click="passStringVar('home', 'there')"
          >
          <button>Home</button>
      </router-link><br>

      <router-link  to="/about"><button>About</button></router-link><br>

      <router-link to="/config"><button>Config</button></router-link><br>
      <div 
          v-for="item in lists"
          key="item"
        >

      <router-link to="/list"
        @click="passStringVar(item, 'here')"
          >
          <button>List {{ item }} </button>
      </router-link><br>
      </div>
      
      <div 
          v-for="item in vars"
          key="item"
        >
      <router-link 
          :to="{name:'variable'}" 
          @click="passStringVar(item, 'here')">

          <button>Var {{ item }}</button><br>
      </router-link>
      </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
