<script >

const host =  import.meta.env.VITE_HOST;

export default {
    props: {
        var: String,
        item: String,
        envFile: String,
        userdir: String
    },
    data() {
        return {
            msg: "some text",
            listbackup: ['backup1', 'backup2', 'backup3'],
            backupName: "",
            recentBackup: "",
            prospectiveBackup: "llm.backup.xxx.txt" 
        }
    },
    methods: {
        backup: async function () {
            const url = `http://${host}:8008/backup`;
            const bodyObj =  "{\"path\": \"/home/" + this.userdir + "/.llm.env\"}";
            
            console.log(bodyObj)
            
            try {
                const response = await fetch(url , {
                    method: "POST",
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
                    return;
                }

                this.backupName = await response.text() ; 
                console.log(this.backupName); 
            } catch (error) {
                console.error(error.message);
            }
            this.$forceUpdate();
            this.getListBackup();

            console.log('backup');
        },
        restore: async function () {

            const backupNameArray = this.backupName.split('/');
            if (backupNameArray.length > 1) {
                this.backupName = backupNameArray[ backupNameArray.length - 1 ];
            }
            const url = `http://${host}:8008/restore`;
            const bodyObj =  "{\"path\": \"/home/" + this.userdir + "/" + this.backupName + "\"}";
            
            console.log(bodyObj)
            
            try {
                const response = await fetch(url , {
                    method: "POST",
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
                    return;
                }

                this.backupName = await response.text() ; 
                console.log(this.backupName); 
            } catch (error) {
                console.error(error.message);
            }
            this.$forceUpdate();

            console.log('restore');
            console.log(this.envFile);
            console.log(this.userdir);
        },
        getListBackup:  async function() {
            if (this.backupName.trim().length == 0) {
                this.backupName = '/home/' + this.userdir ; //+ "/.llm.env";
            }
            const url = `http://${host}:8008/listbackup`;
            const bodyObj =  "{\"path\": \""  + this.backupName + "\"}";
            
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

                this.listbackup = await response.json() ; 
                console.log(this.listbackup); 
            } catch (error) {
                console.error(error.message);
            }
            //this.prospectiveBackup = this.listbackup[this.listbackup.length - 1];
            this.$forceUpdate();

        },// end of function...

    },
    mounted () {
        this.getListBackup()
    }
}

</script>

<template>
  <div class="hometext">
       <h1>Home </h1> <br>

    It is strongly recomended that you backup your configuration files before using this
    program. This code automatically writes over your configuration files. The file that
    is over-written is: 
    <pre> ~/.llm.env </pre> 
    Note that this is a dot file, the first character in the name is a dot, so the file does not show
    up in a normal listing.

    <div class="outlined" >
        <pre> {{ prospectiveBackup }} </pre> 
        Note that 'xxx' is replaced by a number reflecting the size of the list of
        backups that are already present. You can and should look at your backups from
        your home directory. 
        <button @click="this.backup()">make new backup</button><br>
    </div>

    <br>
        <div class="outlined" >


            <div  >
                Select backup from drop down :  <br>
                <select name="backup" id="backup" v-model="backupName">
                  <option v-for="option in listbackup" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
            </div>
        
            <button @click="this.restore()"> restore</button>
        </div>
  </div>
</template>

<style scoped>

.hometext {
    width: 400px;
}
.outlined {
    border: 3px solid black;
}
</style>
