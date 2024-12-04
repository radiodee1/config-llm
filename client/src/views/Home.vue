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
    }
}

</script>

<template>
  <div>
      Home <br>
    {{ var }}
    {{ item }}
  </div>
</template>

<style scoped>

</style>
