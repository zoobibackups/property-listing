<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style>
* {
  scrollbar-width: thin;
  /* scrollbar-color: blue orange; */
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.8);
}

*::-webkit-scrollbar-thumb {
  background-color: rgb(211, 211, 223);
  border-radius: 20px;
  border: 3px solid rgba(0, 0, 0, 0.8);;
}
</style>
