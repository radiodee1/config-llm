<template>
  <div>
      Select user from list : 
    <select >
      <option v-for="option in userlist" :key="option" >
        {{ option }}
      </option>
    </select>
  </div>

</template>

<script>
export default {
  name: 'Users',
    props: {
        chooseUser: Function,
        userlist: Object,
    } ,
  data() {
    return {
      selectedValue: null,
      
    }
  }
}
</script>
