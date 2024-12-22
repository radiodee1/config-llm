<script >

export default {
    props: {
        var: String,
        item: String
    },
    data() {
        return {
            msg: "some text"
            
        }
    },
    methods: {
        backup: function () {
            console.log('backup');
        },
        restore: function () {
            console.log('restore');
        }
    }
}

</script>

<template>
  <div class="hometext">
      Home <br>

    It is strongly recomended that you backup your configuration files before using this
    program. This code automatically writes over your configuration files. The file that
    is over-written is: 
    <pre> ~/.llm.env </pre> <br>
    Note that this is a dot file, the first character in the name is a dot, so the file does not show
    up in a normal listing.

    <button @click="this.backup()">backup</button><br>
    <button @click="this.restore()"> restore</button>
  </div>
</template>

<style scoped>

.hometext {
    width: 400px;
}

</style>
