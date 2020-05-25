<template>
    <div v-if="isLogin">
        <token-detail/>
    </div>
    <div v-else>
        <t-f-a-code/>
    </div>
</template>

<script>
  import TokenDetail from "./TokenDetail";
  import TFACode from "./TFACode";

  export default {
    name: "Dispacher",
    data() {
      return {
        isLogin: !(localStorage.ndUrl === null)
      }
    },
    components: {
      TFACode, TokenDetail
    }

  }
</script>

<style scoped>

</style>
