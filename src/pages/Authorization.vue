<template>
  <q-page class="window-height window-width row justify-center items-center">
        <div class="col-lg-4 col-md-6 col-10">
        <q-card square bordered class="q-pa-lg col-12 shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" :label="$t('email')" />
              <q-input square filled clearable v-model="password" type="password" :label="$t('password')" />
              <q-input square filled clearable v-model="link" type="text" :label="$t('link')" />
              <q-input square filled clearable v-model="tunneler" type="text" :hint="$t('tunnelerHint')" :label="$t('tunneler')" />
              <q-input square filled clearable v-model="letsencryptdomain" type="text" :hint="$t('letsEncryptSuffixHint')" :label="$t('letsEncryptSuffix')" />
              <q-checkbox v-model="rememberMe" :label="$t('rememberMe')" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn @click="tryToLogin" unelevated color="black" size="lg" class="full-width" label="Login" />
          </q-card-actions>
        </q-card>
      </div>
  </q-page>
</template>

<script>
import { getSdk } from 'balena-sdk'

export default {

  data() {
    return {
      email: "",
      password: "",
      link: "",
      tunneler: "",
      rememberMe: false,
      letsencryptdomain: ""
    }
  },
  mounted() {
    if (window.localStorage && window.localStorage.rememberMe) {
      this.rememberMe = (window.localStorage.rememberMe === "true")
    }
    if (window.localStorage && window.localStorage.lastOpenBalenaUrl && this.rememberMe) {
      this.link = window.localStorage.lastOpenBalenaUrl
    }
    if (window.localStorage && window.localStorage.lastTunnelerUrl && this.rememberMe) {
      this.tunneler = window.localStorage.lastTunnelerUrl
    }
    if (window.localStorage && window.localStorage.lastSSLSuffix && this.rememberMe) {
      this.letsencryptdomain = window.localStorage.lastSSLSuffix
    }
  },
  methods: {
    async tryToLogin() {
      const balena = getSdk({
          apiUrl: this.link
      })
      balena.interceptors.push({
          responseError: (error) => {
              this.$q.notify({
                color: "negative",
                message: error.toString()
              })
              throw error
          }
        }
      )
      balena.interceptors.push({
          requestError: (error) => {
              this.$q.notify({
                color: "negative",
                message: error.toString()
              })
              throw error
          }
        }
      )
      
      const token = await balena.auth.authenticate({ email: this.email, password: this.password })
      await balena.auth.loginWithToken(token)
      this.$store.commit("main/setToken", token)
      this.$store.commit("main/setSDK", balena)
      this.$store.commit("main/setTunnelerUrl", this.tunneler)
      this.$store.commit("main/setSSLSuffix", this.letsencryptdomain)
      this.$router.push("home")

      if (window.localStorage) {
        if (this.rememberMe) {
          window.localStorage.lastOpenBalenaUrl = this.link
          if (this.tunneler) {
            window.localStorage.lastTunnelerUrl = this.tunneler
          }
          if (this.letsencryptdomain) {
            window.localStorage.lastSSLSuffix = this.letsencryptdomain
          }
          window.localStorage.rememberMe = this.rememberMe
        } else {
          delete window.localStorage.lastTunnelerUrl
          delete window.localStorage.lastOpenBalenaUrl
          delete window.localStorage.rememberMe
        }
      }
    }
  }
}
</script>
