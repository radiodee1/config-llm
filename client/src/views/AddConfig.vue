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
        }
    }
}

</script>

<template>
  <div>
      Config <br>
      {{ var }} <br>
      {{ item }}
  </div>
</template>

<style scoped>
</style>
