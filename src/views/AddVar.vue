<script >

export default {
    props: {
        var: String,
        item: String
    },
    data() {
        return {
            msg: 'some thing',
        }
    }
}

</script>

<template>
  <div>
      Var <br>
      {{ var }} <br>
      {{ item }}
  </div>
</template>

<style scoped>
</style>
