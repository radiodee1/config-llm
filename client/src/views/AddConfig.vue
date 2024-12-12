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
            token: ""
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
            const end = this.oldItemArray.length + 1;
            while (!this.consumeDone && this.oldItemPosition < this.oldItemArray.length && num < end ) {
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
        saveArgs : function (key, val) {
            console.log(key, val);
        },
        saveFlags: function ( val ) {
            console.log(val);
        }
    },
    mounted () {
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

    <input v-model="inputText" placeholder="Paste text here" />
        <p>You entered: {{ inputText }}</p>
    <button @click="returnStringVar(this.var, this.inputText)">return and apply</button>


    <div v-for="option in options.flags"> {{ option.name }} </div>
    <div v-for="option in options.args"> {{ option.name }} </div>

  </div>
</template>

<style scoped>
input {
    height: 30px;
}
</style>
