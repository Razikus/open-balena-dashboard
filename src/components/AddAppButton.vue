<template>
  <div style ="align-self: center">
    <q-item clickable @click="newApp.showPopup = true">
      <q-item-section>
        <q-card class="big" bordered>
          <q-card-section>
            <span class="material-icons" style="font-size: 48px">
              add_circle_outline
            </span>
          </q-card-section>
        </q-card>
      </q-item-section>
    </q-item>

    <q-dialog v-model="newApp.showPopup" @hide="clearPopupText()">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Creation of new application</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newApp.name" :label="$t('App Name')" dense autofocus />
        </q-card-section>

        <q-card-section>
            <q-select
              filled
              v-model="newApp.model"
              use-input
              input-debounce="0"
              label="Device Type"
              :options="options"
              @filter="filterFn"
              behavior="menu"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn flat label="Create" color="primary" v-close-popup @click="createApp()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

// device types handcoded because the sdk call is not working
// this.$store.state.main.sdk.models.deviceType.getAllSupported()
const SLUG = ["aio-3288c", "astro-tx2", "asus-tinker-board", "asus-tinker-board-s", "bananapi-m1-plus",
"beagleboard-xm", "beaglebone-black", "beaglebone-green", "beaglebone-green-gateway", "beaglebone-green-wifi",
"beaglebone-pocket", "blackboard-tx2", "ccimx8x-sbc-pro", "cl-som-imx8", "coral-dev", "etcher-pro", "fincm3",
"firefly-rk3288", "floyd-nano", "generic", "generic-aarch64", "genericx86-64-ext", "imx6ul-var-dart",
"imx7-var-som", "imx8m-var-dart", "imx8mm-var-dart", "intel-edison", "intel-nuc", "iot-gate-imx8", "jetson-nano",
"jetson-nano-2gb-devkit", "jetson-nano-emmc", "jetson-tx1", "jetson-tx2", "jetson-xavier", "jetson-xavier-nx-devkit",
"jetson-xavier-nx-devkit-emmc", "jn30b-nano", "n510-tx2", "nanopc-t4", "nanopi-neo-air", "nitrogen8mm", "npe-x500-m3",
"odroid-c1", "odroid-xu4", "orange-pi-one", "orange-pi-zero", "orangepi-plus2", "orbitty-tx2", "photon-nano",
"photon-xavier-nx", "qemux86", "qemux86-64", "raspberry-pi", "raspberry-pi2", "raspberrypi3", "raspberrypi3-64",
"raspberrypi4-64", "raspberrypi400-64", "raspberrypicm4-ioboard", "revpi-connect", "revpi-core-3", "spacely-tx2",
"surface-go", "surface-pro-6", "ts4900", "up-board", "var-som-mx6"
]
const NAME = ["AIO 3288C   armv7hf", "CTI Astro TX2 G+ (NEW)   aarch64", "Asus Tinker Board (NEW)   armv7hf",
"Asus Tinker Board S (NEW)   armv7hf", "BananaPi-M1+ (NEW)   armv7hf", "BeagleBoard-XM (NEW)   armv7hf",
"BeagleBone Black   armv7hf", "BeagleBone Green   armv7hf", "BeagleBone Green Gateway   armv7hf",
"BeagleBone Green Wireless   armv7hf", "PocketBeagle (NEW)   armv7hf", "Nvidia blackboard TX2   aarch64",
"ConnectCore 8X SBC Pro (NEW)   aarch64", "Compulab MX8M   aarch64", "Coral Dev Board (NEW)   aarch64",
 "Etcher Pro (NEW)   aarch64", "Balena Fin (CM3)   armv7hf", "FireFly rk3288   armv7hf",
 "Floyd Nano BB02A eMMC (NEW)   aarch64", "Generic   amd64", "Generic AARCH64 (ARMv8) (NEW)   aarch64",
 "Generic x86_64 (NEW)   amd64", "Variscite DART-6UL (NEW)   armv7hf", "Variscite VAR-SOM-MX7   armv7hf",
 "Variscite DART-MX8M   aarch64", "Variscite DART-MX8M Mini (NEW)   aarch64", "Intel Edison   i386", "Intel NUC   amd64",
 "Compulab IOT-GATE-iMX8   aarch64", "Nvidia Jetson Nano SD-CARD (NEW)   aarch64",
 "Nvidia Jetson Nano 2GB Devkit SD (NEW)   aarch64", "Nvidia Jetson Nano eMMC (NEW)   aarch64",
 "Nvidia Jetson TX1 (NEW)   aarch64", "Nvidia Jetson TX2   aarch64", "Nvidia Jetson Xavier AGX (NEW)   aarch64",
 "Nvidia Jetson Xavier NX Devkit SD-CARD (NEW)   aarch64", "Nvidia Jetson Xavier NX Devkit eMMC (NEW)   aarch64",
 "Auvidea JN30B Nano   aarch64", "Aetina N510 TX2   aarch64", "NanoPC-T4 (NEW)   aarch64", "Nanopi Neo Air   armv7hf",
 "Nitrogen8M Mini SBC (NEW)   aarch64", "NPE X500 M3   armv7hf", "ODROID-C1+   armv7hf", "ODROID-XU4   armv7hf",
 "Orange Pi One (NEW)   armv7hf", "Orange Pi Zero (NEW)   armv7hf", "Orange Pi Plus2 (NEW)   armv7hf",
 "CTI Orbitty TX2   aarch64", "CTI Photon Nano   aarch64", "CTI Photon Xavier NX (NEW)   aarch64",
 "QEMU X86 32bit (NEW)   i386", "QEMU X86 64bit (NEW)   amd64", "Raspberry Pi (v1 / Zero / Zero W)   rpi",
  "Raspberry Pi 2   armv7hf", "Raspberry Pi 3   armv7hf", "Raspberry Pi 3 (using 64bit OS)   aarch64",
  "Raspberry Pi 4   aarch64", "Raspberry Pi 400 (NEW)   aarch64", "Raspberry Pi CM4 IO Board (NEW)   aarch64",
  "Revolution Pi Connect (NEW)   armv7hf", "Revolution Pi Core 3   armv7hf", "CTI Spacely TX2   aarch64",
  "Microsoft Surface Go (NEW)   amd64", "Microsoft Surface 6 (NEW)   amd64", "Technologic TS-4900   armv7hf",
  "UP Board   amd64", "Variscite VAR-SOM-MX6 (NEW)   armv7hf"
]

  export default {
    name: 'AddAppButton',
    data() {
      return {
        newApp: {
          name: "",
          showPopup: false,
          model: null // selected device type
        },
        SLUG, // import constant
        NAME,
        options: NAME // filtered options of the select menu
      }
    },
    methods: {
      clearPopupText: function() { // @cancel -> function(value, initialValue)
        this.newApp.name = ""
        this.newApp.model = ""
      },
      async createApp() {
        console.log(this.newApp.model)
        const index = NAME.findIndex((elem) => elem === this.newApp.model)
        console.log(index)

        // await
        this.$store.state.main.sdk.models.application.create(
          { name: this.newApp.name, applicationType: 'essentials', deviceType: SLUG[index], organization: null }).then(
          function(error, application) {
              if (error) throw error
              console.log(application)
          })

        this.clearPopupText()
      },

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            this.options = NAME
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          this.options = NAME.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }

    } // end methods
  }
</script>
