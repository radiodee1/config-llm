<script >

export default {
    props: {
        var: String,
    },
    data() {
        return {
            msg: this.var
        }
    }
}

</script>

<template>
  <div>
      Var <br>
    {{ msg }}    
  </div>
</template>

<style scoped>
</style>
