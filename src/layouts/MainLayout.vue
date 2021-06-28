<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar v-if="$store.state.main.loggedIn">
        <q-toolbar-title>
          <div class="row">
            <div class="col">
              <q-img
                src="openbalena_logo.png"
                spinner-color="white"
                class=""
                style="max-width: 150px; filter: invert(1);"
              />
            </div>
            <div v-if="$store.state.main.selectedApplication" class="col">
              <q-badge  style="font-size: 15px;" outline color="green">
                {{$store.state.main.selectedApplication}}
              </q-badge>
              <q-badge  v-if="$store.state.main.selectedDevice" style="font-size: 15px;" outline color="yellow">
               {{$store.state.main.selectedDevice}}
              </q-badge>
            </div>
          </div>
        </q-toolbar-title>
        <q-select
          v-model="lang"
          :options="langOptions"
          dense
          color="white"
          dark
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 150px"
        >
          <template v-slot:prepend>
          <q-icon color="white" name="language" />
        </template>
        </q-select>
        <q-btn flat round dense icon="dark_mode" @click="switchTheme" />
        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :mini="miniState"
    >
      <q-list v-if="$store.state.main.loggedIn">
        <q-item-label
          header
        >
          {{ $t('links') }}
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>
      </q-list>
      <q-list v-if="$store.state.main.selectedApplication">
        <q-item-label
          header
        >
          {{ $store.state.main.selectedApplication }}
        </q-item-label>
        <EssentialLink
          v-for="link in appLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Home',
    caption: 'homecaption',
    icon: 'home',
    link: 'home'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
      this.saveNewLanguage(lang)
    }
  },
  mounted() {
    this.restoreLanguage()
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: true,
      essentialLinks: linksData,
      appLinks: [
        {
          title: 'Devices',
          caption: 'devicescaption',
          icon: 'apps',
          link: 'application',
          param: () => {
            return { id: this.$store.state.main.selectedApplication }
          }
        },
        {
          title: 'Env',
          caption: 'envcaption',
          icon: 'settings',
          link: 'applicationEnvs',
          param: () => {
            return { id: this.$store.state.main.selectedApplication }
          }
        }
      ],
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'English' },
        { value: 'ru-RU', label: 'Русский' }
      ]
    }
  },
  methods: {
    switchTheme() {
      this.$q.dark.toggle()
    },
    restoreLanguage() {
      if (window.localStorage) {
        if (window.localStorage.openBalenaLanguage) {
          const newLang = window.localStorage.openBalenaLanguage
          this.lang = newLang
          this.$i18n.locale = newLang
        }
      }
    },
    saveNewLanguage(newSlug) {
      if (window.localStorage) {
        window.localStorage.openBalenaLanguage = newSlug
      }
    },
    logout() {
      delete window.localStorage.sessionToken
      location.reload()
    }
  }
}
</script>
