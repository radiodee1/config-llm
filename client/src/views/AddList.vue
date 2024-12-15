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
            modelArgsArray: [""],
        }
    },
    methods: {
        addArgument: function () {
            this.modelArgsArray.push("");
            //console.log(this.modelArgsArray.length)
        },
        buildOutput: function () {
            let out = "";
            for (let i in this.modelArgsArray) {
                const line = this.modelArgsArray[i];
                if (line != null) {
                    const item = line.trim();
                    if (item != "") {
                        out += item + ",";
                    }
                }
            }
            if (out.endsWith(",")) {
                out = out.slice(0,-1);
            }
            this.inputText = out;
        }
    }
}

</script>

<template>
  <div>
      List Variable <br>
      {{ var }} <br>
      {{ item }} <br>

    <div v-for="(option, index) in this.modelArgsArray" :key="index">
    <input v-model="this.modelArgsArray[index]" placeholder="Paste text here" />
    </div>

    <button @click="addArgument()">add argument</button>
    <button @click="buildOutput()">build output string</button>


    <input v-model="inputText" placeholder="Paste text here" />
        <p>You entered: {{ inputText }}</p>
    <button @click="returnStringVar(this.var, this.inputText)">return and apply</button>

  </div>
</template>

<style scoped>
input {
    height: 30px;
    width: 100%;
}
</style>
