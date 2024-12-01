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
      Home <br>
    {{ msg }}
  </div>
</template>

<style scoped>

</style>
