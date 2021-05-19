<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar v-if="$store.state.main.loggedIn">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Open Balena
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list v-if="$store.state.main.loggedIn">
        <q-item-label
          header
          class="text-grey-8"
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
          class="text-grey-8"
        >
          {{ $t('selected application: ') }}
          <span class= "text-bold">{{ $store.state.main.selectedApplication }}</span>
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
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      appLinks: [
        {
          title: 'Devices',
          caption: 'devicescaption',
          icon: 'cloud',
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
      ]
    }
  }
}
</script>
