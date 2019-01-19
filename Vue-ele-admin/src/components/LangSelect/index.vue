<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <svg-icon class-name="international-icon" icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">中文</el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">Español</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language () {
      console.log(this.$store.getters.language)
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage (lang) {
      // console.log(this.$i18n.locale)
      this.$i18n.locale = lang
      // 调用全局中的方法，进行设置语言
      // 因为是全局中引入的ElementUI所以不需要单独的引用Message了
      this.$store.dispatch('setLanguage', lang)
      // 设置的ElementUI中的提示信息
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
}
</style>
