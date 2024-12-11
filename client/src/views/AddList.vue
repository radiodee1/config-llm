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
      List Variable <br>
      {{ var }} <br>
      {{ item }} <br>

    <input v-model="inputText" placeholder="Paste text here" />
        <p>You entered: {{ inputText }}</p>
    <button @click="returnStringVar(this.var, this.inputText)">return and apply</button>

  </div>
</template>

<style scoped>
input {
    height: 30px;
}
</style>
