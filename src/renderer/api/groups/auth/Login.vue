<template>
  <div class="login">
    <div class="login-wrapper">
      <transition-group name="transformation" mode="out-in">
        <div v-show="!isLoadingUser" class="form" :key="'form'">
          <form method="post" action="/auth/login" name="login">
            <div class="form-group">
              <label class="control-label">Email</label><i class="bar"></i>
              <b-form-input v-model="email"
                            type="email"
              ></b-form-input>
            </div>
            <div class="form-group">
              <label class="control-label">Contraseña</label><i class="bar"></i>
              <b-form-input v-model="password"
                            type="password"
              ></b-form-input>
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
  export default {
    data () {
      return {
        isLoadingUser: false,
        email: '',
        password: ''
      }
    },
    name: 'login',
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
            window.localStorage.setItem('AccessToken', JSON.stringify(token))
            Notifications.info(_this, 'Bienvendio al sistema de industria')
            _this.$router.push({path: '*'})
          }).catch(e => {
            console.log(e)
            _this.isLoadingUser = false
            Notifications.error(_this, e)
          })
        }, 3000)
      }
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
