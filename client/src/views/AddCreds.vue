<script >

export default {
    props: {
        var: String,
        item: String,
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
        },
        uploadFile: async function () {
          if (!this.file) return;

          const formData = new FormData();
          formData.append('file', this.file);

          try {
            const response = await axios.post('/api/upload', formData);
            console.log('File uploaded successfully:', response.data);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        },
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
