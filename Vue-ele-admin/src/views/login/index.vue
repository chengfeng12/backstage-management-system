<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="title-container">
          <h3 class="title">{{ $t('login.title') }}</h3>
          <lang-select class="set-language"/>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user"/>
          </span>
          <el-input
            v-model="loginForm.username"
            :placeholder="$t('login.username')"
            name="username"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :placeholder="$t('login.password')"
            name="password"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:10px;" @click="handleLogin">{{ $t('login.logIn') }}</el-button>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      // 在这里使用正则表单验证规则
      if (!isvalidUsername(value)) {
        // 可以调用一下cookie中的语言，进行判断输出
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false
    }
  },
  components: { LangSelect },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      // 这是表单验证成功之后的返回的布尔值
      this.$refs.loginForm.validate(value => {
        if (value) {
          this.loading = true
          // 调用全局的方法存储token然后进行路由跳转
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;
  // 判断浏览器是否支持特性
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: #333;
      &::first-line {
        color: #333;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        // -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  height: 100%;
  background-color: $bg;
  background: url('./bgsky.jpg');
  overflow: hidden;
  .login-form {
    position: absolute;
    left: 50%;
    top: 30%;
    width: 520px;
    margin-left: -260px;
    max-width: 100%;
    overflow: hidden;
    background-color: #fff;
    padding: 20px 50px 25px;
    border-radius: 6px;
    box-shadow: 1px 1px 2px #eee;
    &::before {
      content: '';
      position: absolute;
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      box-shadow: 0 0 10px #aaa;
      width: 100%;
      top: 0;
      left: 0;
      height: 70px;
    }
    .title-container {
      position: relative;
      height: 30px;
      margin-bottom: 50px;
      h3 {
        font-size: 26px;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}
</style>
