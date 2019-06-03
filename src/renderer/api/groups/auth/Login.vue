<template>
  <div class="login">
    <div class="login-wrapper">
      <transition-group name="transformation" mode="out-in">
        <div v-show="!isLoadingUser" class="form" :key="'form'">
          <form method="post" action="/auth/login" name="login">
            <div class="form-group">
              <label class="control-label">Email</label><i class="bar"></i>
              <mau-form-input-text
                  v-model="email"
                  :type="'email'"
                  :initialValue="initialEmail"
                  :error="''"
                  :name="'email'"
              ></mau-form-input-text>
            </div>
            <div class="form-group">
              <label class="control-label">Contraseña</label><i class="bar"></i>
              <mau-form-input-text
                  v-model="password"
                  :type="'password'"
                  :initialValue="initialPassword"
                  :error="''"
                  :name="'password'"
              ></mau-form-input-text>
            </div>
            <div class="d-flex justify-content-start align-content-center align-items-center">
              <mau-form-input-check-box
                      class="mr-2"
                      v-model="rememberCredentials"
                      :initialValue="initialRememberCredentials"
              >
              </mau-form-input-check-box>
              <label>Recordar</label>
            </div>
            <div class="d-flex flex-row flex-lg-row justify-content-center align-items-center down-container">
              <button class="btn btn-primary" type="submit" v-on:click.prevent="submit">
                Ingresar
              </button>
              <!--<router-link class='link' :to="{name: 'Signup'}">Create account</router-link>-->
            </div>
          </form>
        </div>
        <div v-show="isLoadingUser" class="text" :key="'text'">Validando...</div>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import GenericApiOperations from 'renderer/api/functions/GenericApiOperations'
  import Notifications from 'renderer/api/functions/Notifications'
  import Vue from 'vue'
  export default {
    data () {
      return {
        isLoadingUser: false,
        email: '',
        initialEmail: '',
        password: '',
        initialPassword: '',
        rememberCredentials: '',
        initialRememberCredentials: ''
      }
    },
    name: 'login',
    created () {
      let password = JSON.parse(window.localStorage.getItem('Password'))
      let email = JSON.parse(window.localStorage.getItem('Email'))
      if (password !== null && email !== null) {
        this.initialEmail = email
        this.initialPassword = password
        this.initialRememberCredentials = 1
      } else {
        this.initialRememberCredentials = 0
      }
    },
    methods: {
      submit () {
        if (!this.email || !this.password) {
          return
        }
        this.isLoadingUser = true
        let _this = this
        setTimeout(function () {
          GenericApiOperations.generateToken(_this.email, _this.password).then(result => {
            let token = result.token
            Vue.http.headers.common['Accept'] = 'Application/json'
            Vue.http.headers.common['Authorization'] = 'Bearer ' + token
            window.localStorage.setItem('AccessToken', JSON.stringify(token))
            if (_this.rememberCredentials === 1) {
              window.localStorage.setItem('Email', JSON.stringify(_this.email))
              window.localStorage.setItem('Password', JSON.stringify(_this.password))
            } else {
              window.localStorage.removeItem('Email')
              window.localStorage.removeItem('Password')
            }
            Notifications.info(_this, 'Bienvendio!')
            _this.$router.push({path: '*'})
          }).catch(e => {
            console.log(e)
            _this.isLoadingUser = false
            Notifications.error(_this, e)
          })
        }, 3000)
      }
    },
    components: {
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    .down-container {
      margin-top: 3.125rem;
    }
  }
  .login-wrapper{
    position: relative;
    width: 300px;
  }
  .form{
    position: relative;
    width: 100%;
  }
  .text {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .form.transformation-enter-active, .form.transformation-leave-active {
    transition: all .7s ease;
  }
  .text.transformation-enter-active, .text.transformation-leave-active {
    transition: all .3s ease;
  }
  .text.transformation-enter-active {
    transition-delay: .7s;
  }
  .text.transformation-enter, .text.transformation-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .transformation-enter-active {
    transition-delay: .3s;
  }
  .form.transformation-enter, .form.transformation-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
