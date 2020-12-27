<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" :label="$t('email')" />
              <q-input square filled clearable v-model="password" type="password" :label="$t('password')" />
              <q-input square filled clearable v-model="link" type="text" :label="$t('link')" />
              <q-input square filled clearable v-model="tunneler" type="text" :hint="$t('tunnelerHint')" :label="$t('tunneler')" />
              <q-checkbox v-model="rememberMe" :label="$t('rememberMe')" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn @click="tryToLogin" unelevated color="black" size="lg" class="full-width" label="Login" />
          </q-card-actions>
        </q-card>
      </div>
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
      rememberMe: false
    }
  },
  mounted() {
    if (window.localStorage && window.localStorage.lastOpenBalenaUrl) {
      this.link = window.localStorage.lastOpenBalenaUrl
    }
    if (window.localStorage && window.localStorage.lastTunnelerUrl) {
      this.tunneler = window.localStorage.lastTunnelerUrl
    }
    if (window.localStorage && window.localStorage.rememberMe) {
      this.rememberMe = (window.localStorage.rememberMe === "true")
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
      this.$router.push("home")

      if (window.localStorage) {
        window.localStorage.lastOpenBalenaUrl = this.link
        if (this.tunneler) {
          window.localStorage.lastTunnelerUrl = this.tunneler
        } else {
          delete window.localStorage.lastTunnelerUrl
        }
        window.localStorage.rememberMe = this.rememberMe
      }
    }
  }
}
</script>
