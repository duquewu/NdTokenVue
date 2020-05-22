<template>
  <div id="app">
    <TFA msg="xxxx"/>
  </div>
</template>

<script>
import TFA from './components/TFACode.vue'

export default {
  name: 'App',
  components: {
    TFA
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
