<script >

const host =  import.meta.env.VITE_HOST;

export default {
    props: {
        var: String,
        item: String,
        userdir: String,
        returnStringVar: Function
    },
    data() {
        return {
            msg: 'some thing',
            inputText: null,
            file: null,
            filename: 'Specify File',
            disableEnvForm: true 
        }
    },
    methods: {
        clickFormCheckbox: function () {
            this.disableEnvForm = ! this.disableEnvForm;
        },
        handleFileChange : function (event) {
          this.file = event.target.files[0];
          this.filename = event.target.files[0].name;
          console.log(this.file.text());
        },
        uploadFile: async function () {
          if (!this.file) return;
          //let text = this.file.replace(/\n/g, '\\n');
  
          const url = `http://${host}:8008/credential`;
          
          //formData.append('file', this.file);
          //formData.append("filename", "/home/" + this.userdir + "/.llm." + this.var + ".json");
          const form = {
            "destination":  "/home/" + this.userdir + "/.llm." + this.var + ".json",
            //"file": this.file  
          }

          const formData = new FormData();
          formData.append('file', this.file)

          for ( const [key, val] of Object.entries(form) ) {
            formData.append(key, val);
          }

          console.log(formData.get("filename"), 'formData')

            try {
                const response = await fetch(url , {
                    method: "PUT",
                    body: formData, // JSON.stringify(formData), 
                    //mode: 'cors',
                    //headers: {
                    //    "Access-Control-Allow-Origin": "*",
                    //    "Access-Control-Allow-Methods": "GET, OPTIONS, PUT, POST",
                    //    "Access-Control-Allow-Headers": "X-Requested-With",
                    //    "Content-Type": "multipart/form-data"
                    //}
                });
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                this.returnStringVar(this.var, form["destination"]);

                //this.textfile = await response.text() ; 
                //console.log(this.textfile) 
            } catch (error) {
                console.error(error.message);
            }

        },// end function here...

    },
    mounted () {
        this.inputText = this.item;
    }
}

</script>

<template>
  <div>
      <h1> Credentials JSON </h1> <br>
      {{ var }} <br>
      {{ item }} <br>
      <div class="container">
        <div class="inputclass"> 
            Switch File Upload :
        </div>
        <div class="checkboxclass">
        <label >
            <input type="checkbox" @click="clickFormCheckbox()"   >
            <span class="slider"></span>
        </label>
        </div>
      </div>
      <br>
    <div v-if="! this.disableEnvForm">
    <input v-model="inputText" placeholder="Paste text here"  />
        
    <p>You entered: {{ inputText }}</p>

    <button @click="returnStringVar(this.var, this.inputText)">return and apply</button>
    </div>

    <div v-if="this.disableEnvForm">
    <button @click="$refs.file.click()"> {{ filename }} </button> <br>
    
    <input type="file" ref="file" @change="handleFileChange" accept=".json" 
     id="file-upload" style="display: none;" /> <br>
    
    <button @click="uploadFile" >Upload</button> <br> <br>
    </div>


  </div>
</template>

<style scoped>
input {
    height: 30px;
    width: 100%;
}
.inputclass {
    height: 30px;
    width: 100%;
    display: inline;
}
.checkboxclass {
    display: block;
}
.container {
    position: relative;
    border: 3px solid black;
}
</style>
