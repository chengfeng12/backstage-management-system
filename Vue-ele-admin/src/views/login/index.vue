<template>
  <div class="login-container">
    <el-form>
        <div class="title-container">
            <h3 class="title">{{ $t('login.title') }}</h3>
            <lang-select class="set-language"/>
        </div>
    </el-form>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'nihao'
    }
  },
  components: { LangSelect }
}
</script>

<style>

</style>
