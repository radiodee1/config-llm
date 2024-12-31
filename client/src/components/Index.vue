<script >

import dict from '../js/dict.js';

//import { useRouter } from 'vue-router';
//const router = useRouter();

import { toast } from 'vue3-toastify';
//const toast = useToast();

export default {
    data() {
        return {
            var: '', 
            vars: dict.var,
            configs: dict.config,
            lists: dict.list,
            options: dict.options,
            filename: dict.filename,
            creds: dict.cred,
            files: dict.file,
            envFile: `/home/${this.userdir}/${this.filename}`,
            showUserPicker: false,
            showProperties: false,
            item: "",
            userdir: "",
            userlist: "",
            textfile: "", //` ENV_VAR=some values\nENV_VAR2=some other values`,
            returnKey: "",
            returnVal: "",
            optionStart: null,
            noBackend: false,
            testConfigInput : "", // "'--file --temp 0.5     --loop_wait' "
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
            this.var = x;
            this.showProperties = false;
            this.insertVarInTextfile();
            this.writeConfigFile();
            this.$forceUpdate(); // test
        },
        returnApply: function () {
            // like 'close' but saves file.
        },
        startValues: function () {
            this.$router.push('/home');
            this.showProperties = true;
        },
        returnWithoutSaving: function () {
            this.showProperties = false;
            this.readConfigFile();
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
            this.readConfigFile();
            this.envFile= `/home/${this.userdir}/${this.filename}`;
            this.startValues();
            //this.$forceUpdate();
        },
        showToast: function () {
            toast.error("No Backend: No data will be read or saved.");
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
                    this.chooseUser(this.userlist[0]);
                    this.showUserPicker = false;
                    this.readConfigFile();
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
                this.showToast();
                if (this.textfile.length == 0) {
                    this.textfile = ` ENV_VAR=some values\nENV_VAR2=some other values`;
                }
                
                this.showUserPicker = true;
            }

        },// end of method??
        //////////////////
        writeRestartFile: async function() {
            const filename = ".llm.restart";
            const url = "http://localhost:8008/restart";
            const bodyObj =  "{\"path\": \"/home/" + this.userdir + "/" + filename + "\"}";
            
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

                //this.textfile = await response.text() ; 
                //console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
            }

        },// end of function...

        readConfigFile: async function() {
            if (this.noBackend == true) {
                console.log("no backend");
                this.showToast();
                return;
            }
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
                //console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
                this.noBackend = true;
            }
            this.$forceUpdate();

        },// end of function...
        writeConfigFile: async function() {
            if (this.noBackend == true) {
                console.log ('no backend');
                this.showToast();
                return;
            }

            if (this.textfile.length == 0) {
                this.textfile = ` ENV_VAR=some values\nENV_VAR2=some other values`;
            }
            
            let text = this.textfile.replace(/\n/g, '\\n');
            const url = "http://localhost:8008/config";
            let bodyObj = {
                "path": "/home/" + this.userdir + "/" + this.filename,
                 "body": text 
                }

            const bodyJson =  JSON.stringify(bodyObj);
            //console.log(bodyJson);
            
            try {
                const response = await fetch(url , {
                    method: "PUT",
                    body: bodyJson, // bodyObj,
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
            this.textfile = newlist.trim();
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
      :envFile="envFile"
      :userdir="userdir"
      :noBackend="noBackend"
    />

  <br>
  <div v-if="(! showUserPicker) && (! showProperties)"> 
  {{ returnKey }}={{ returnVal }} <br>
  <h1> /home/{{ userdir }}/{{filename}} </h1> <br>
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
          <button>Home/Backup</button>
      </router-link><br>
          
          </td>
          </tr>
          <tr>
          
          <td></td>
          <td>

      <router-link  :to="{'name':'about'}" 
          @click="passStringVar('about', 'there')"
          >
          <button>About</button>
      </router-link><br>
          </td>
          <td></td>
          </tr>

          <!-- +++++++++++++++++++++ -->
          <tr 
          v-for="itemx in configs"
          key="itemx"
        >
        <td> {{ itemx }}={{ matchValue(itemx) }} </td>
        <td>
        <router-link to="/config" 
            @click="passStringVar(itemx, matchValue(itemx))"
            >
            <button> {{ itemx }}</button>
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
        @click="passStringVar(item, matchValue(item))"
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
          @click="passStringVar(item, matchValue(item))">

          <button> {{ item }}</button><br>
      </router-link>
        </td>
        <td> </td>
    </tr>

        <!-- +++++++++++++++++++++ -->
        <tr  
          v-for="item in creds"
          key="item"
        >
        <td>  {{ item }}={{ matchValue(item) }} </td>
        <td>
      <router-link 
          :to="{name:'cred'}" 
          @click="passStringVar(item, matchValue(item))">

          <button> {{ item }}</button><br>
      </router-link>
        </td>
        <td> </td>
    </tr>

        <!-- +++++++++++++++++++++ -->
        <tr  
          v-for="item in files"
          key="item"
        >
        <td>  {{ item }}={{ matchValue(item) }} </td>
        <td>
      <router-link 
          :to="{name:'file'}" 
          @click="passStringVar(item, matchValue(item))">

          <button> {{ item }}</button><br>
      </router-link>
        </td>
        <td> </td>
    </tr>

        <!-- +++++++++++++++++++++ -->



      </tbody>
      </table>
    
      <br>
      <button v-if="(! showUserPicker) && (! showProperties)"  @click="writeRestartFile()"> SCHEDULE RESTART </button> 

      <div v-if="(! showUserPicker) && (! showProperties)" > <br> </div>
      
      <button v-if="(! showUserPicker) && (! showProperties)"  @click="readConfigFile()"> RELOAD CONFIG FILE </button>

      <div v-if="showUserPicker">
          
            <h1> Choose User Dir </h1>

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

      <button v-if="showProperties && ! showUserPicker" @click="showProperties = false; returnWithoutSaving()"> return (without saving) </button>
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
