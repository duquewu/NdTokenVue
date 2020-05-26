<template>
    <div>
        <p>Code :{{code}}</p>
        <p> TODO: 详情待完善</p>
        <el-progress :percentage='0'/>
        <el-button type="primary" @click="refreshCode">刷新2FA</el-button>
        <el-button type="danger" @click="resetCode">重置</el-button>
    </div>
</template>

<script>
  import {getCode1} from "../utils/2FAUtils";

  export default {
    name: "TokenDetail",
    data() {
      return {
        code: ''
      }
    },
    created() {
      if (localStorage.ndKey === undefined) {
        this.resetCode()
        this.go2Login()
      } else {
        this.code = getCode1(localStorage.ndKey)
      }
    },
    methods: {
      refreshCode() {
        this.code = ""
        this.code = getCode1(localStorage.ndKey)
      },
      resetCode() {
        localStorage.removeItem('ndKey')
        localStorage.removeItem('ndUrl')
      },
      go2Login() {
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>

</style>
