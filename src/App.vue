<template>
  <div id="app">
    <DIS/>
  </div>
</template>

<script>
import DIS from "./components/Dispacher";

export default {
  name: 'App',
  components: {
    DIS
  }
}
</script>

<style>
#app {
  width: 600px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
