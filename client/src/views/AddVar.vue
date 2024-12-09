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
            inputText: null
        }
    }
}

</script>

<template>
  <div>
      Var <br>
      {{ var }} <br>
      {{ item }}

    <input v-model="inputText" placeholder="Enter text here" />
        <p>You entered: {{ inputText }}</p>
    <button @click="returnStringVar(this.var, this.inputText)">return</button>

  </div>
</template>

<style scoped>
</style>
