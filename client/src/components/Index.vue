<script >

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
            showProperties: false,
            item: "",
            userdir: "",
            userlist: "",
            textfile: "",
            returnKey: "",
            returnVal: "",
            optionStart: null
            }
        },
    methods: {
        passStringVar: function (v, x) {
            this.var = v;
            this.item = x;
            this.showProperties = true;
            this.readConfigFile()
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
        chooseUser: function (v) {
            this.userdir = v;
            this.showUserPicker = false;
        },
        readUserlist: async function() {
            const url = "http://localhost:8008/users";
            try {
                const response = await fetch(url , {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS, PUT",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                        "Content-Type": "text/plain"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    this.showUserPicker = true;
                }

                this.userlist = await response.json() ; 
                if (this.userlist.length == 1 ) {
                    this.userdir = this.userlist[0];
                    this.showUserPicker = false;
                }
                else {
                    this.showUserPicker = true;
                }
                console.log(this.userlist + " " + this.userlist.length);
                console.log(this.userdir);
            } catch (error) {
                console.error(error.message);
                this.userlist = [ 'pick', 'some', 'user', 'like', 'dave' ];
                this.showUserPicker = true;
            }

        },// end of method??
        //////////////////
        readConfigFile: async function() {
            const url = "http://localhost:8008/config";
            const bodyObj = {"path": "/home/" + this.userdir + "/.llm.env"};
            console.log(bodyObj)
            try {
                const response = await fetch(url , {
                    method: "POST",
                    body: bodyObj,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS, PUT",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                        "Content-Type": "text/plain"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                this.textfile = await response.json() ; 
                console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
            }

        }// end of function...

    },
    mounted() {
        if (this.userlist.length == 0){
            this.readUserlist();
        } 
    }
};


</script>

<template>
  <h1>{{ msg }}</h1>
  <br>
  {{ vars }} <br>
  {{ filename }} <br>
  {{ returnKey }} : {{ returnVal }} <br>
  {{ userdir }}

  <router-view v-if="showProperties"
      :var="var"
      :item="item"
      :returnStringVar="returnStringVar"
      :returnApply="returnApply"
    />

  <div class="card">

      <table v-if="(! showUserPicker) && (! showProperties)">
          <tbody>
          <tr>
          <td></td>
          <td>
      <router-link :to="{name:'home'}"
          @click="passStringVar('home', 'there')"
          >
          <button>Home</button>
      </router-link><br>

      <router-link  to="/about"><button>About</button></router-link><br>
          </td>
          <td></td>
          </tr>


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
      </tbody>
      </table>

      <div v-if="showUserPicker">
          Here


            <div >
                Select user from list : {{ userlist }} <br>
            <select name="user" id="user" v-model="optionStart">
              <option v-for="option in userlist" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
            <button @click="chooseUser(optionStart)">choose {{ optionStart }}</button>

         </div>

      <button v-if="showProperties && ! showUserPicker" @click="showProperties = false"> reset?? </button>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
