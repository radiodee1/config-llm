<script >

export default {
    props: {
        var: String,
        item: String,
        returnStringVar: Function,
        options: Object
    },
    data() {
        return {
            msg: 'some thing',
            inputText: null,
            nameListArgs: null,
            nameListFlags: null,
            oldItemArray: null,
            oldItemPosition : null,
            consumeDone: false,
            token: "",
            outputText: "",
            modelArgsArray: []
        }
    },
    methods: {
        buildNameList: function (obj) {
            const list = [];
            for (let i in obj) {
                const item = obj[i];
                list.push(item.name);
            }
            return list;
        },
        buildOldArray: function() {
            const item = this.item.trim();
            let ii = item;
            if ( ii.startsWith("'") || ii.startsWith('"') ) {
                ii = ii.slice(1, ii.length)
            }
            if (ii.endsWith("'") || ii.endsWith('"')) {
                ii = ii.slice(0, -1)
            }
            const arr = ii.split(' ');
            this.oldItemArray = [];
            for (let i in arr) {
                const x = arr[i].trim();
                if (x == "") {
                    continue;
                }
                this.oldItemArray.push(x)
            }
        },
        parseOldString: function () {
            this.consumeDone = false;
            this.oldItemPosition = 0;
            let num = 0;
            const endloop = this.oldItemArray.length + 1;
            while (!this.consumeDone && this.oldItemPosition < this.oldItemArray.length &&
                    num < endloop ) {

                this.consumeArgs();
                this.consumeFlags();
                num += 1;

            }
            
        },
        consumeArgs: function () {
            this.token = this.oldItemArray[this.oldItemPosition];
            if ( this.nameListArgs.includes(this.token) ) {
                const key = this.token;
                this.advance();
                if (this.consumeDone) {
                    return;
                }
                const val = this.oldItemArray[this.oldItemPosition];
                this.saveArgs(key, val);
                this.advance();
            }
        },
        consumeFlags: function () {
            this.token = this.oldItemArray[this.oldItemPosition];
            if ( this.nameListFlags.includes(this.token) ) {
                const key = this.token;
                this.saveFlags(key);
                this.advance();
            }

        },
        advance: function () {
            this.oldItemPosition += 1;
            if (this.oldItemPosition >= this.oldItemArray.length) {
                this.consumeDone = true;
            }
        },
        saveArgsClick : function (key, val) {
            for (let i in this.options.args) {
                const arg = this.options.args[i];
                if ( arg.name == key ) {
                    if (val != null && val != "" ) {

                        this.options.args[i].selected = ! this.options.args[i].selected;
                        this.options.args[i].actual = val;
                    }
                    break;
                }
            }
            console.log(key, val);
        },
        saveFlagsClick: function ( val ) {
            for (let i in this.options.flags) {
                const flag = this.options.flags[i];
                if ( flag.name == val ) {
                    this.options.flags[i].selected = ! this.options.flags[i].selected;
                    break;
                }
            }
            console.log(val);

        },

        saveArgs : function (key, val) {
            for (let i in this.options.args) {
                const arg = this.options.args[i];
                if ( arg.name == key ) {
                    if (val != null && val != "" ) {

                        this.options.args[i].selected = true; 
                        this.options.args[i].actual = val;
                    }
                    break;
                }
            }
            console.log(key, val);
        },
        saveFlags: function ( val ) {
            for (let i in this.options.flags) {
                const flag = this.options.flags[i];
                if ( flag.name == val ) {
                    this.options.flags[i].selected = true; 
                    break;
                }
            }
            console.log(val);

        },
        clickFlag: function (val) {
            this.saveFlagsClick(val);
        },
        clickArgs: function (key, val) {
            this.saveArgsClick(key, val);
            this.inputText = "";
        },
        clickReturn: function () {
            let text = "'" + this.outputText + "'";

            this.returnStringVar(this.var, text);
        },
        buildOutput: function () {
            let out = "";
            for (let i in this.options.flags) {
                const flag = this.options.flags[i];
                if (flag.selected) {
                    out += flag.name + " ";
                }
            }
            for (let i in this.options.args) {
                const arg = this.options.args[i];
                if (arg.selected && arg.actual != null && arg.actual.trim() != "") {
                    out += arg.name + " ";
                    out += arg.actual + " ";
                }
            }
            this.outputText = out;
        }
    },
    mounted () {
        for (let i in this.options.args) {
            this.modelArgsArray.push('');
        }
        this.nameListArgs = this.buildNameList(this.options.args);
        this.nameListFlags = this.buildNameList(this.options.flags);
        this.buildOldArray();
        console.log (this.oldItemArray);
        this.parseOldString();
    }
}

</script>

<template>
  <div>
      Config Variable <br>
      {{ var }} <br>
      {{ item }} <br>

    <!-- input v-model="inputText" placeholder="Paste text here" / -->
        <!-- p>You entered: {{ inputText }}</p -->

        <table>
        <tbody>
            <tr>
                <td>
                    <div  v-for="option in options.flags"  >
            <button @click="clickFlag(option.name)" :class="{selected: option.selected}">
                {{ option.name }} 

            </button>
            {{ option.help }}
        </div>
                </td>
                <td>

                    <div  v-for="(option, index) in options.args" :key="index">
            <button @click="clickArgs(options.args[index].name, modelArgsArray[index])" :class="{selected: options.args[index].selected}" >
                {{ option.name }} <div :v-if="options.args[index].selected">  {{ option.actual }} </div>
                
            </button> 
            <input v-model="modelArgsArray[index]" placeholder="Paste text here" />
            <br>
            {{ option.help }}
        </div>
                </td>
            </tr>
        </tbody>
        </table>
        <br>
    <button @click="buildOutput()">build output</button>
    <input v-model="outputText" placeholder="View output" />
    <br><br>
    <button @click="clickReturn()">return and apply</button>


  </div>
</template>

<style scoped>
input {
    height: 30px;
    width: 100%;
}
td {
    vertical-align: top;
}
.selected {
    border: 6px solid blue;
}
</style>
