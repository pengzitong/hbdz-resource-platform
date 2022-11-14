<template>
  <div class="login-container">
    <div></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <el-image
          class="title-logo"
          fit="contain"
          :src="require('@/assets/images/logo.png')"
        ></el-image>
        <span class="title">系统登录</span>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
    <div class="footer">Copyright © 2021-2022 湖北省地质博物馆 版权所有</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { isValidUsername } from '@/utils/validate'
import { login } from '@/api/admin'

@Component({
  name: 'Login',
  components: {}
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: any) => {
    if (!isValidUsername(value)) {
      callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }

  private validatePassword = (rule: any, value: string, callback: any) => {
    if (value.length < 6) {
      callback(new Error('请输入6位以上密码'))
    } else {
      callback()
    }
  }

  private loginForm = {
    username: '',
    password: ''
  }

  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }]
  }

  private passwordType = 'password'
  private loading = false
  private capsTooltip = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  mounted() {
    if (this.loginForm.username === '') {
      ;(this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      ;(this.$refs.password as Input).focus()
    }
  }

  private checkCapslock(e: KeyboardEvent) {
    const { key } = e
    this.capsTooltip = key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      ;(this.$refs.password as Input).focus()
    })
  }

  private handleLogin() {
    ;(this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        try {
          const { Authorization } = await login({
            account_name: this.loginForm.username,
            password: this.loginForm.password
          })
          localStorage.setItem('authorization', Authorization)
          this.$router.push({
            path: '/dashboard',
            query: this.otherQuery
          })
        } catch (e) {
          console.warn(e, 'login')
        } finally {
          this.loading = false
        }
      } else {
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>

<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: #fff;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: url('~@/assets/images/login-background.webp') no-repeat 100% center/cover;
  filter: grayscale(0.2);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .login-form {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 80px 35px 30px;
    margin: 0 auto;
    overflow: hidden;
  }

  .footer {
    line-height: 40px;
    height: 40px;
    bottom: 0;
    color: #fff;
    font-size: 14px;
    text-align: center;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    .title-logo {
      width: 100px;
      height: 60px;
      margin-left: -30px;
      margin-right: -30px;
    }

    .title {
      font-size: 26px;
      text-align: center;
      font-weight: bold;
      margin-left: 20px;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
