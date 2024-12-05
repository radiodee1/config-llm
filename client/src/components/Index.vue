<script>

import dict from '../js/dict.js';

export default {
    data() {
        return {
            var: 'something', 
            vars: dict.var,
            configs: dict.config,
            lists: dict.list,
            options: dict.options,
            filename: dict.filename,
            showUserPicker: false,
            item: "",
            userdir: "",
            textfile: "",
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
        },
        returnApply: function () {
            // like 'close' but saves file.
        },
        matchValue: function (v) {
            return v
        },
    },
    mounted() {
        
    }
};


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
      :returnApply="returnApply"
    />

  <div class="card">

      <router-link :to="{name:'home'}"
          @click="passStringVar('home', 'there')"
          >
          <button>Home</button>
      </router-link><br>

      <router-link  to="/about"><button>About</button></router-link><br>
      <table v-if="! showUserPicker">
          <tr 
          v-for="item in configs"
          key="item"
        >
        <td> {{ matchValue(item) }} </td>
        <td>
        <router-link to="/config" 
            @click="passStringVar(item, 'here again')"
            >
            <button>Config {{ item }}</button>
        </router-link>
        </td>
        <td> {{ item }} </td>
          </tr>

        <tr 
          v-for="item in lists"
          key="item"
        >
        <td> {{ matchValue(item) }} </td>
        <td>
      <router-link to="/list"
        @click="passStringVar(item, 'here')"
          >
          <button>List {{ item }} </button>
      </router-link>
        </td>
        <td> {{ item }}</td>
        </tr>
        
        
    <tr  
          v-for="item in vars"
          key="item"
        >
        <td> {{ matchValue(item) }} </td>
        <td>
      <router-link 
          :to="{name:'variable'}" 
          @click="passStringVar(item, 'here')">

          <button>Var {{ item }}</button><br>
      </router-link>
        </td>
        <td>{{ item }}</td>
    </tr>
      </table>

      <div v-if="showUserPicker"> show user picker </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
