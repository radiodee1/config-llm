<script >

</script>

<template>
  <div>
      <h1> About </h1>


The idea behind this program is to provide a way to edit the config file for the pi-llm project. I want to make it so that the config can be changed here, and then the pi-llm code would see the change and start over and load the new config without stopping the program and re-starting it.
<br>
This can be achieved by editing the pi-llm project slightly and coding this project to save all config changes immediately, so that the "~\.llm.env" file is updated often. 
<br>
This project uses docker and two docker images. One image is the client, which has the graphical interface that we like. The other image, the express server, is used as a backend, and is responsible for manipulating the files on the host system. The whole thing should be usable on the raspberry pi.
<br>
The pi-llm project uses a wifi connenction on the raspberry pi to access AI Api's from the web.


  </div>
</template>

<style scoped>
</style>
