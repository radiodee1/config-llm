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
            textfile: "", //` ENV_VAR=some values\nENV_VAR2=some other values`,
            returnKey: "",
            returnVal: "",
            optionStart: null,
            noBackend: true,
            testConfigInput : "'--file --temp 0.5     --loop_wait' "
            }
        },
    methods: {
        passStringVar: function (v, x) {
            this.var = v;
            this.item = x;
            if (this.item == "" || this.item == null) {
                this.item = this.matchValue(this.var);
            }
            this.showProperties = true;
            this.readConfigFile()
        },
        returnStringVar: function (v, x) {
            this.returnKey = v;
            this.returnVal = x;
            this.showProperties = false;
            this.insertVarInTextfile();
            this.writeConfigFile();
            this.$forceUpdate(); // test
        },
        returnApply: function () {
            // like 'close' but saves file.
        },
        matchValue: function (v) {
            const vin = v.trim();
            const text = this.textfile;
            const list = text.split('\n');
            if (list.length == 0) {
                return "";
            }
            let x = "";
            for (let i in list) {
                const linein = list[i];
                const linev = linein.trim();
                const z = linev.split("=");

                if ( z.length < 2 ) {
                    
                    continue ;
                }
                const key = z[0];
                const kk = key.trim();
                const val = z[1];
                const vv = val.trim();
                if ( kk == vin  ) {
                    x = vv;
                }
            }
            return x
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
                this.noBackend = true;

                if (this.textfile.length == 0) {
                    this.textfile = ` ENV_VAR=some values\nENV_VAR2=some other values`;
                }
                
                this.showUserPicker = true;
            }

        },// end of method??
        //////////////////
        readConfigFile: async function() {
            const url = "http://localhost:8008/config";
            const bodyObj =  "{\"path\": \"/home/" + this.userdir + "/" + this.filename + "\"}";
            
            console.log(bodyObj)
            
            try {
                const response = await fetch(url , {
                    method: "POST",
                    body: bodyObj,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS, PUT",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                    return;
                }

                this.textfile = await response.text() ; 
                console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
            }
            this.$forceUpdate();

        },// end of function...
        writeConfigFile: async function() {
            if (this.textfile.length == 0) {
                this.textfile = ` ENV_VAR=some values\nENV_VAR2=some other values`;
            }
            
            let text = this.textfile.replace(/\n/g, '\\n');
            const url = "http://localhost:8008/config";
            const bodyObj =  "{" +
                    ' \"path\": "/home/' + this.userdir + "/" + this.filename + '\",'
                    + '"body": \"' + text + '\"' + "}";
            
            //console.log(bodyObj)
            
            try {
                const response = await fetch(url , {
                    method: "PUT",
                    body: bodyObj,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, OPTIONS, PUT, POST",
                        "Access-Control-Allow-Headers": "X-Requested-With",
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                //this.textfile = await response.text() ; 
                //console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
            }

        },// end of function...
        insertVarInTextfile: function () {
            if (this.returnKey == null || this.returnVal == null) {
                return;
            }
            const key = this.returnKey;
            const val = this.returnVal;
            const list = this.textfile.split('\n');
            var newlist = "";
            var entered = false;
            const newentry = key.trim() + "=" + val.trim();
            for (let i in list) {
                const l = list[i].trim();
                if ( l.startsWith(key.trim()) && ! entered ) {
                    //
                    newlist += newentry + "\n";
                    entered = true;
                }
                else {
                    newlist += list[i] + "\n";
                }
            }
            if (! entered) {
                newlist += newentry ; // put it at the end!!
            }
            this.textfile = newlist;
            //console.log(this.textfile);
            //this.$forceUpdate();
        }// end of function...

    },
    mounted() {
        if (this.userlist.length == 0){
            this.readUserlist();
        } 
    },
    
};


</script>

<template>
    <div class="card">

  <router-view v-if="showProperties"
      :var="var"
      :item="item"
      :returnStringVar="returnStringVar"
      :returnApply="returnApply"
      :options="options"
    />

  <br>
  <div v-if="(! showUserPicker) && (! showProperties)"> 
  {{ returnKey }}={{ returnVal }} <br>
  /home/{{ userdir }}/{{filename}} <br>
  </div>

  <div class="oldcard">

      <table v-if="(! showUserPicker) && (! showProperties)">
          <tbody>

          <!-- +++++++++++++++++++++ -->

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

          <!-- +++++++++++++++++++++ -->
          <tr 
          v-for="item in configs"
          key="item"
        >
        <td> {{ item }}={{ matchValue(item) }} </td>
        <td>
        <router-link to="/config" 
            @click="passStringVar(item, testConfigInput)"
            >
            <button> {{ item }}</button>
        </router-link>
        </td>
        <td> </td>
          </tr>
        <!-- +++++++++++++++++++++ -->

        <tr 
          v-for="item in lists"
          key="item"
        >
        <td>  {{ item }}={{ matchValue(item) }} </td>
        <td>
      <router-link to="/list"
        @click="passStringVar(item, '')"
          >
          <button> {{ item }} </button>
      </router-link>
        </td>
        <td> </td>
        </tr>
        
        <!-- +++++++++++++++++++++ -->

    <tr  
          v-for="item in vars"
          key="item"
        >
        <td>  {{ item }}={{ matchValue(item) }} </td>
        <td>
      <router-link 
          :to="{name:'variable'}" 
          @click="passStringVar(item, '')">

          <button> {{ item }}</button><br>
      </router-link>
        </td>
        <td> </td>
    </tr>

        <!-- +++++++++++++++++++++ -->

      </tbody>
      </table>

      <div v-if="showUserPicker">
          


            <div  >
                Select user from list : {{ userlist }} <br>
            <select name="user" id="user" v-model="optionStart">
              <option v-for="option in userlist" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
            <button @click="chooseUser(optionStart)">choose {{ optionStart }}</button>

         </div>

      <button v-if="showProperties && ! showUserPicker" @click="showProperties = false"> return without saving </button>
  </div>

    </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.card {
    border: 3px solid black;
}
</style>
